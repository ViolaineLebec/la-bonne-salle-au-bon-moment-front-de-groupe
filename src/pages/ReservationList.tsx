import { useContext, useEffect } from "react";
import { ReservationContext } from "../context/ReservationContext";
import ReservationCard from "../composants/ReservationCard";

function ReservationList() {
    const { reservationList, getReservationList } = useContext(ReservationContext);
    useEffect(() => {
        getReservationList();
    }, []);


    return (
        <>
            <div>
                <h1>Liste des réservations</h1>
                <button className="flex-1 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700">
                    <a href="/createreservation">Ajouter une réservation</a>
                </button>
                <ul>
                    {reservationList.map((reservation) => (
                        <ReservationCard key={reservation.id} reservation={reservation} />
                    ))}
                </ul>{" "}
            </div>
        </>
    );
}

export default ReservationList;
