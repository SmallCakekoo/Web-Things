// tengo k importar react por tipado
import React, { createContext, useState, type PropsWithChildren } from "react";
import { initialRooms } from "../data/data";

export interface Room {
  id: number;
  name: string;
  type: "meeting room" | "private office" | "shared desk" | "creative room";
  capacity: number;
  location: string;
  pricePerHour: number;
  available: boolean;
  isReserved?: boolean; // el ? es tipado opcional
}

export interface Filters {
  type: string;
  available: string;
}

export interface RoomsContextType {
  roomsList: Room[];
  roomsReserved: Room[];
  filters: Filters;
  setRoomsList: any;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  handleRoomsReserved: (room: Room) => void;
  updateRoomAvailable: (id: number, available: boolean) => void;
}

export const RoomsContext = createContext<RoomsContextType | null>(null);

export function RoomsProvider({ children }: PropsWithChildren) {
  const [roomsList, setRoomsList] = useState<Room[]>(() =>
    (initialRooms as Room[]).map((ro) => ({ ...ro, isReserved: false })),
  );
  // estado derivado
  const roomsReserved: Room[] = roomsList.filter((ro) => ro.isReserved);

  const [filters, setFilters] = useState<Filters>({ type: "", available: "" });

  // Funciones
  const updateRoomAvailable = (id: number, available: boolean): void => {
    setRoomsList((prev) =>
      prev.map((ro) => (ro.id === id ? { ...ro, available } : ro)),
    );
  };

  const handleRoomsReserved = (room: Room): void => {
    setRoomsList((prev) =>
      prev.map((ro) => {
        if (ro.id === room.id) {
          const newIsReserved = !ro.isReserved;
          return { ...ro, isReserved: newIsReserved, available: !newIsReserved };
        }
        return ro;
      }),
    );
  };

  return (
    <RoomsContext.Provider
      value={{
        roomsList,
        roomsReserved,
        setRoomsList,
        filters,
        setFilters,
        handleRoomsReserved,
        updateRoomAvailable,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
}
