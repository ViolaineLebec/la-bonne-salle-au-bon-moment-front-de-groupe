import { useContext, useEffect, useState } from "react";
import { ReservationContext } from "../context/ReservationContext";
import type { newReservation, Reservation } from "../context/ReservationContext";
import { UserContext } from "../context/UserContext";
import { useForm } from "react-hook-form";
import { RoomContext } from "../context/RoomContext";
import type { User } from "../context/UserContext";
import { useNavigate } from "react-router";

function CreateReservation() {
  const navigate = useNavigate();
  // const { getReservation, postReservation, patchReservation, deleteReservation, getReservationList, reservationList, ...reservation } = useContext(ReservationContext);
  // const { getRoom, postRoom, putRoom, deleteRoom, getRoomList, roomList, ...room } = useContext(RoomContext);
  const reservationContext = useContext(ReservationContext);
  const roomContext = useContext(RoomContext);
  useEffect(() => { roomContext.getRoomList() }, []);
  useEffect(() => { reservationContext.getReservationList() }, []);
  const userContext = useContext(UserContext);
  // const user = userContext?.user;
  const user = {
    id: 1,
    firstname: "bob",
    lastname: "dylan",
    email: "bob@dylan",
    roleId: 1,
    roleLabel: "admin",
  };
  const userList = userContext?.userList;
  useEffect(() => { userContext?.getUserList() }, []);
  const [success, setSuccess] = useState(false);
  const [errorForm, setErrorForm] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<newReservation>();

  // function onSubmit(data: newReservation) {
  //   let isOk = true;
  //   if (new Date(data.date_debut).getTime() > new Date(data.date_fin).getTime()) {
  //     setErrorForm("Date de fin inférieur à date de début")
  //     return
  //   }
  //   for (let resa of reservationList) {
  //     if (data.roomId == resa.roomId) {
  //       if (!((new Date(data.date_fin).getTime() <= new Date(resa.date_debut).getTime()) || (new Date(data.date_debut).getTime() >= new Date(resa.date_fin).getTime()))) {
  //         isOk = false;
  //       }
  //     }
  //   }
  //   isOk ? postReservation(data) : setErrorForm("Salle indisponible sur ce créneau");
  //   isOk && setSuccess(true);
  //   reservationContext.postReservation(data)
  //   navigate("/viewreservation");
  // }
  async function onSubmit(data: newReservation) {
    try {
      await reservationContext.postReservation(data);
      setSuccess(true);
      navigate("/viewreservation");
    } catch (error) {
      setErrorForm("Impossible de créer la réservation.");
      console.error(error);
    }
  }

  return (
    <>
      <main className="min-h-screen bg-[#BCCCDB] flex flex-col items-center">
        <h2 className="mt-14 text-center text-4xl font-extrabold uppercase text-white">Réserver un Créneau</h2>

        <form onSubmit={handleSubmit(onSubmit)} onClick={() => setErrorForm("")} className="mt-9 flex w-full max-w-[295px] flex-col">
          <div>
            <label>Salle</label>
            <select id="selectmethod" defaultValue="" {...register("roomId", { required: "Salle Obligatoire" })} className="h-[30px] w-full rounded-md border border-[#A0AAAB] mb-5 border-2 bg-white">
              {roomContext.roomList.map((room) => (
                <option key={room.id} value={room.id}>{room.name} / capacité : {room.capacity}</option>
              ))}
            </select>
            {errors.roomId && (<p className="text-black-500 font-bold text-sm">{errors.roomId.message}</p>)}
          </div>

          <div>
            <label>Utilisateur</label>
            {user != null && user.roleId == 1 && <select id="selectmethod" defaultValue="" {...register("userId", { required: "Utilisateur Obligatoire" })} className="h-[30px] w-full rounded-md border border-[#A0AAAB] mb-5 border-2 bg-white">
              {userList?.map((user: User) => (
                <option key={user.id} value={user.id}>{user.firstname} {user.lastname}</option>
              ))}
            </select>}
            {user != null && user.roleId == 2 && <select id="selectmethod" defaultValue="" {...register("userId", { required: "Utilisateur Obligatoire" })} className="h-[30px] w-full rounded-md border border-[#A0AAAB] mb-5 border-2 bg-white">
              <option value={user.id}>{user.firstname} {user.lastname}</option>
            </select>}
            {errors.userId && (<p className="text-black-500 font-bold text-sm">{errors.userId.message}</p>)}
          </div>

          <div>
            <label>Date début</label>
            <input type="datetime-local" step="3600" {...register("date_debut", { required: "Date début obligatoire" })} className="h-[30px] w-full rounded-md border border-[#A0AAAB] mb-5 border-2 bg-white" />
            {errors.date_debut && (<p className="text-black-500 font-bold text-sm">{errors.date_debut.message}</p>)}
          </div>

          <div>
            <label>Date fin</label>
            <input type="datetime-local" step="3600" {...register("date_fin", { required: "Date fin obligatoire" })} className="h-[30px] w-full rounded-md border border-[#A0AAAB] mb-5 border-2 bg-white" />
            {errors.date_fin && (<p className="text-black-500 font-bold text-sm">{errors.date_fin.message}</p>)}
          </div>

          <p className="text-black-500 font-bold text-sm">{errorForm}</p>

          <button type="submit" disabled={!isValid} className="rounded-md bg-black px-3 py-2 text-sm border-[#FFFFFF] border-2 font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed">
            Réserver un créneau
          </button>

          {success && (
            <div className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-white shadow-lg">
              <span>✓ Créneau réservé avec succès !</span>
            </div>
          )}

        </form>
      </main>
    </>
  );
}

export default CreateReservation;
