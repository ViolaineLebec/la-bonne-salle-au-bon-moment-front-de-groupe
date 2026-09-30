import { useContext, useEffect } from "react";
import { RoomContext } from "../context/RoomContext";
import RoomCard from "../composants/RoomCard";

function RoomList() {
  const { roomList, getRoomList } = useContext(RoomContext);
  useEffect(() => {
    getRoomList();
  }, []);


  return (
    <>
      <div>
        <h1>Liste des rooms</h1>
        <button className="flex-1 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700">
          <a href="/newroom">Ajouter une salle</a>
        </button>
        <ul>
          {roomList.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </ul>{" "}
      </div>
    </>
  );
}

export default RoomList;
