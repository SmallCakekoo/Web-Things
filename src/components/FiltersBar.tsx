import React, { useContext } from "react";
import { RoomsContext } from "../context/RoomsContext";
import type { RoomsContextType } from "../context/RoomsContext";

export const FiltersBar = () => {
  const context = useContext(RoomsContext);
  const { filters, setFilters } = context as RoomsContextType;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearFilter = (): void =>
    setFilters({
      type: "",
      available: "",
    });

  return (
    <div>
      <select name="type" value={filters.type} onChange={handleChange}>
        <option value="">Todos los tipos</option>
        <option value="meeting room">Meeting Room</option>
        <option value="private office">Private Office</option>
        <option value="shared desk">Shared Desk</option>
        <option value="creative room">Creative Room</option>
      </select>
      <select name="available" value={filters.available} onChange={handleChange}>
        <option value="">Todas las disponibilidades</option>
        <option value="true">Disponibles</option>
        <option value="false">No disponibles</option>
      </select>
      <button type="button" onClick={clearFilter}>
        Clear filters
      </button>
    </div>
  );
};
