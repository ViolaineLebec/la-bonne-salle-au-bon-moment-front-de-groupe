import { useContext, useEffect, useState } from "react";
import { ReservationContext } from "../context/ReservationContext";
import { UserContext } from "../context/UserContext";
import type { Reservation } from "../context/ReservationContext";
import ReservationCard from "../composants/ReservationCard";
import { Link } from "react-router";


function ViewReservation() {
    const userContext = useContext(UserContext);
    useEffect(() => { userContext?.getUserList() }, []);
    const { getReservation, postReservation, patchReservation, deleteReservation, getReservationList, reservationList, ...reservation } = useContext(ReservationContext);
    useEffect(() => { getReservationList() }, [reservationList]);
    const [userReservationList, setUserReservationList] = useState<Reservation[]>([]);
    useEffect(() => {
        if (!userContext?.user) {
            return;
        }
        reservationList.forEach((res) => {
            if (res.userId == userContext.user?.id) {
                setUserReservationList([...userReservationList, res])
            }
        })
    }, [reservationList])

    return (
        <>
            <Link to="/createreservation"><button className="rounded-md bg-black px-3 py-2 text-sm border-[#FFFFFF] border-2 font-semibold text-white">Réserver une salle</button></Link>
            {reservationList.map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} onChange={getReservationList} />
            ))}
        </>
    );
}

export default ViewReservation
