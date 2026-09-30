import { useState } from "react";
import { RoomContext } from "../context/RoomContext";
import type { Room } from "../context/RoomContext";

function RoomProvider({ children }: { children?: React.ReactNode }) {

    const [room, setRoom] = useState<Room>({} as Room);
    const [roomList, setRoomList] = useState<Room[]>([]);
    const url = 'http://localhost:3000/rooms';

    async function getRoom(id: number) {
        const res = await fetch(url + "/" + id);
        const data = await res.json();
        setRoom(data);
    }

    async function postRoom(room: Room) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(room)
        });
        const data = await res.json();
    }

    async function putRoom(id: number, room: Room) {
        const res = await fetch((url + "/" + id), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(room)
        });
        const data = await res.json();
    }

    async function deleteRoom(id: number) {
        const res = await fetch((url + "/" + id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        setRoomList((prevRoomList) => prevRoomList.filter((room: Room) => room.id !== id));
    }

    async function getRoomList() {
        const res = await fetch(url);
        const data = await res.json();
        setRoomList(data);
    }

    return (
        <RoomContext.Provider value={{ getRoom, postRoom, putRoom, deleteRoom, getRoomList, roomList, ...room }}>
            {children}
        </RoomContext.Provider>
    );
}
export default RoomProvider;