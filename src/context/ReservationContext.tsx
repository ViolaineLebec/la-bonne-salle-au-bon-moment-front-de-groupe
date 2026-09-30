import { createContext } from "react";

export type Reservation = {
    id: number,
    roomId: number,
    date_debut: string,
    date_fin: string,
    userId: number
}

export type newReservation = {
    roomId: number,
    date_debut: string,
    date_fin: string,
    userId: number
}

export interface ReservationContextType extends Reservation {
    getReservation: (id: number) => void;
    postReservation: (reservation: newReservation) => void;
    patchReservation: (id: number, reservation: Reservation) => void;
    deleteReservation: (id: number) => void;
    getReservationList: () => void;
    reservationList: Reservation[];
}

export const ReservationContext = createContext<ReservationContextType>(
    {} as ReservationContextType
);