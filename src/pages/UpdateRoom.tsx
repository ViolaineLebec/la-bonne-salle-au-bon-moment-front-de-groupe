import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import type { ChangeEvent, FormEvent } from "react";
import { RoomContext } from "../context/RoomContext";

interface Room {
    name: string;
    capacity: number;
}

function UpdateRoom() {
    const navigate = useNavigate();
    const { id } = useParams();
    const roomContext = useContext(RoomContext);

    const [room, setRoom] = useState<Room | null>(null);
    const [form, setForm] = useState<Room>({
        name: "",
        capacity: 1
    });

    useEffect(() => {
        if (roomContext?.getRoomList) {
            roomContext.getRoomList();
        }
    }, []);

    useEffect(() => {
        const fetchRoom = async () => {
            const response = await fetch(`http://localhost:3000/rooms/${id}`);
            const data = await response.json();
            setRoom(data);
        };

        if (id) fetchRoom();
    }, [id]);

    useEffect(() => {
        if (room) {
            setForm({
                name: room.name,
                capacity: room.capacity
            });
        }
    }, [room]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value, type } = event.target;
        setForm({
            ...form,
            [name]: type === "number" ? Number(value) : value
        });
    }

    async function putRoom(idNumber: number, donnees: Room) {
        const response = await fetch(`http://localhost:3000/rooms/${idNumber}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(donnees),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        return response.json();
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (room === null) return;

        const confirmed = window.confirm("Voulez-vous vraiment modifier cette réservation ?");
        if (!confirmed) return;

        try {
            await putRoom(Number(id), form);
            window.alert("Modifications effectuées avec succès.");
            navigate("/roomlist");
        } catch (error) {
            console.error(error);
            window.alert("Erreur lors de la mise à jour de la salle.");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="m-2 p-2 border">
                    <label>Nom de la salle</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Capacité de la salle</label>
                    <input
                        type="number"
                        name="capacity"
                        value={form.capacity}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">
                    Enregistrer
                </button>
            </form>
        </div>
    );
}

export default UpdateRoom;