import { useContext, useState } from "react";
import { RoomContext } from "../context/RoomContext";
import { useNavigate } from "react-router";


export interface Room {
    id: number;
    name: string;
    capacity: number;
}

interface RoomCardProps {
    room: Room;
}

function RoomCard({ room }: RoomCardProps) {
    const roomContext = useContext(RoomContext);
    const navigate = useNavigate();
    const id = room.id;


    async function deleteRoom(id: number) {
        if (!id) return;

        const confirmed = window.confirm("Voulez-vous vraiment supprimer cette salle ?");
        if (!confirmed) return;

        try {
            await roomContext.deleteRoom(id);
            window.alert("Suppression effectuée avec succès.");
        } catch (error) {
            console.error(error);
            window.alert("Erreur lors de la suppression de la salle.");
        }
    }

    // async function updateRoom(id: number, room: Salle) {
    //     await roomContext.putRoom(id, room);
    // }

    function navigateToRoom() {
        navigate(`/rooms/${id}`);
    }

    return (
        <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Salle : <span className="font-medium text-gray-900">{room.name}</span></p>
            <p className="text-sm text-gray-500">Capacité : <span className="font-medium text-gray-900">{room.capacity}</span></p>
            <button onClick={() => deleteRoom(room.id)}>Supprimer</button>
            <button onClick={navigateToRoom}>Modifier</button>
        </div>
    );
}

export default RoomCard;
