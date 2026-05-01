import { useContext } from "react";
import { RoomsContext } from "../context/RoomsContext";
import type { RoomsContextType } from "../context/RoomsContext";
import { FiltersBar } from "../components/FiltersBar";
import { RoomCard } from "../components/RoomCard";

export const AllRoomsPage = () => {
  const context = useContext(RoomsContext);
  if (!context) return null; // otra vez para no tipar lo de arriba

  const { roomsList, filters } = context as RoomsContextType;

  const filteredRooms = roomsList.filter((ro) => {
    const matchType = filters.type === "" || ro.type === filters.type;
    const matchAvailable = filters.available === "" || String(ro.available) === filters.available;

    return matchType && matchAvailable;
  });

  return (
    <div>
      <FiltersBar />
      <section>
        <h2>Todo las salas ({filteredRooms.length})</h2>
        {filteredRooms.length === 0 ? (
          <p>No hay salas</p>
        ) : (
          <div>
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
