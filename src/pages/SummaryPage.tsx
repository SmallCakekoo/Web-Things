import { useContext } from "react";
import { RoomsContext } from "../context/RoomsContext";
import type { RoomsContextType } from "../context/RoomsContext";
import { StatBox } from "../components/Stats";
import { RoomCard } from "../components/RoomCard";

export const SummaryPage = () => {
  const context = useContext(RoomsContext);
  if (!context) return null; // para no tipar lo de arriba

  const { roomsList, roomsReserved } = context as RoomsContextType;

  const total = roomsList.length;
  const reservedRooms = roomsReserved.length;
  const availableRooms = roomsList.filter(ro => ro.available).length;
  const totalIncome = roomsReserved.reduce((sum, room) => sum + room.pricePerHour, 0);

  return (
    <div>
      <StatBox label="Total" value={total} />
      <StatBox label="Disponibles" value={availableRooms} />
      <StatBox label="Reservadas" value={reservedRooms} />
      <StatBox label="Ingreso Total (por 1h)" value={totalIncome} />

      <h3>Reservadas ({roomsReserved.length})</h3>
      {roomsReserved.length === 0 ? (
           <p>No hay salas</p>
      ) : (
        <div>
             {roomsReserved.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
        </div>
      )}
    </div>
  );
};
