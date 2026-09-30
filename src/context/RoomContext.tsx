import { createContext } from "react";

export type Room = {
    id: number,
    name: string,
    capacity: number,
}

export interface RoomContextType extends Room {
    getRoom: (id: number) => void;
    postRoom: (room: Room) => void;
    putRoom: (id: number, room: Room) => void;
    deleteRoom: (id: number) => void;
    getRoomList: () => void;
    roomList: Room[];
}

export const RoomContext = createContext<RoomContextType>(
    {} as RoomContextType
);