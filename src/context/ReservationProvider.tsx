import { useState } from "react";
import { ReservationContext } from "./ReservationContext";
import type { newReservation, Reservation } from "./ReservationContext";

function ReservationProvider({ children }: { children?: React.ReactNode }) {

    const [reservation, setReservation] = useState<Reservation>({} as Reservation);
    const [reservationList, setReservationList] = useState<Reservation[]>([]);
    const url = 'http://localhost:3000/reservations';

    async function getReservation(id: number) {
        try {
            const res = await fetch(url + "/" + id);
            const data = await res.json();
            if (!res.ok) {
                throw new Error("Erreur lors de la récupération");
            }
            setReservation(data);
        } catch (error: any) {
            error && console.log("Une erreur est survenue" + error.message);
        }
    }

    async function postReservation(reservation: newReservation) {
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservation)
            });
            if (!res.ok) {
                throw new Error("Erreur lors de la récupération");
            }
            const data = await res.json()
        } catch (error: any) {
            error && console.log("Une erreur est survenue" + error.message);
        }
    }

    async function patchReservation(id: number, reservation: Reservation) {
        try {
            const res = await fetch((url + "/" + id), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservation)
            });
            if (!res.ok) {
                throw new Error("Erreur lors de la récupération");
            }
            const data = await res.json()
        } catch (error: any) {
            error && console.log("Une erreur est survenue" + error.message);
        }
    }

    async function deleteReservation(id: number) {
        try {
            const res = await fetch((url + "/" + id), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!res.ok) {
                throw new Error("Erreur lors de la récupération");
            }
            const data = await res.json()
        } catch (error: any) {
            error && console.log("Une erreur est survenue" + error.message);
        }
    }

    async function getReservationList() {
        try {
            console.log("URL de la requête :", url);
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Erreur lors de la récupération");
            }
            const data = await res.json();
            setReservationList(data);
        } catch (error: any) {
            error && console.log("Une erreur est survenue" + error.message);
        }
    }



    return (
        <ReservationContext.Provider value={{ getReservation, postReservation, patchReservation, deleteReservation, getReservationList, reservationList, ...reservation }}>
            {children}
        </ReservationContext.Provider>
    );
}
export default ReservationProvider;