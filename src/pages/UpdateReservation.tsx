import { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import type { ChangeEvent } from "react";
import { UserContext } from "../context/UserContext";
import { ReservationContext } from "../context/ReservationContext";
import { RoomContext } from "../context/RoomContext";

function UpdateReservation() {

    const userContext = useContext(UserContext);
    const user = userContext?.user;
    const navigate = useNavigate();
    const reservationContext = useContext(ReservationContext);
    const roomContext = useContext(RoomContext);
    useEffect(() => { roomContext.getRoomList() }, []);
    useEffect(() => { reservationContext.getReservationList() }, []);

    interface Reservation {
        "id"?: number,
        "roomId": number,
        "date_debut": string,
        "date_fin": string,
        "userId": number
    }

    const { id } = useParams();

    const [reservation, setReservation] = useState<Reservation | null>(null);

    useEffect(() => {
        const fetchReservation = async () => {
            const response = await fetch(`http://localhost:3000/reservations/${id}`)
            const data = await response.json();
            setReservation(data)
        };

        fetchReservation();
    }, [id]);

    const [form, setForm] = useState({
        roomId: 0,
        date_debut: "",
        date_fin: "",
    })

    useEffect(() => {
        if (reservation) {
            setForm({
                roomId: reservation.roomId,
                date_debut: reservation.date_debut,
                date_fin: reservation.date_fin,
            });
        }
    }, [reservation]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    async function patchReservation(id: number, donnees: Reservation) {
        const response = await fetch(`http://localhost:3000/reservations/${id}`, {
            method: "PATCH",
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

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {

        event.preventDefault();

        if (reservation === null) {
            return;
        }

        if (reservation.userId !== Number(user?.id) && user?.roleId !== "1") {
            navigate(`/dashboard/${user?.roleLabel}`);
            return;
        }

        const confirmed = window.confirm("Voulez-vous vraiment modifier cette réservation ?");
        if (!confirmed) {
            return;
        }

        const newReservation = {
            "roomId": form.roomId,
            "date_debut": form.date_debut,
            "date_fin": form.date_fin,
            "userId": reservation.userId
        };

        if (typeof id === "number") {
            await patchReservation(Number(id), newReservation);
            window.alert("Modifications effectuées avec succès.");
        }
    }



    return <div>
        <form onSubmit={handleSubmit}>

            <div>
                <label>Salle</label>
                <select name="roomId" value={form.roomId} onChange={e => { setForm({ ...form, roomId: Number(e.target.value) }) }} required>
                    {roomContext.roomList.map((room) => (
                        <option key={room.id} value={room.id}>{room.name} / capacité : {room.capacity}</option>
                    ))}
                </select>

            </div>

            <div>
                <label>Date de début</label>
                <input type="datetime-local" step="3600" name="date_debut" value={form.date_debut} onChange={handleChange} required />
            </div>

            <div>
                <label>Date de fin</label>
                <input type="datetime-local" step="3600" name="date_fin" value={form.date_fin} onChange={handleChange} required />
            </div>

            <button type="submit">Modifier</button>
            <button>Annuler</button>

        </form>

    </div>

};

export default UpdateReservation;