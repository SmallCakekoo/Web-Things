import { createContext, useState } from "react";
import { initialIncidents } from "../data/data";

export interface Incident {
  id: number;
  title: string;
  user: string;
  category: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "resolved";
  date: string;
  description: string;
  isFeatured?: boolean;
}

export interface Filters {
  category: string;
  priority: string;
  status: string;
}

type IncidentsContextType = {
  incidentList: Incident[];
  incidentsFeature: Incident[]; // Nueva lista para destacados
  filters: Filters;
  setFilters: (filters: Filters) => void;
  updateIncidentStatus: (id: number, status: Incident["status"]) => void;
  handleIncidentFeature: (incident: Incident) => void;
};

const IncidentsContext = createContext<IncidentsContextType | null>(null);

export const IncidentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [incidentList, setIncidentList] = useState<Incident[]>(() =>
    (initialIncidents as Incident[]).map((inc) => ({ ...inc, isFeatured: false }))
  );

  // Estado separado para las incidencias destacadas
  const [incidentsFeature, setIncidentsFeature] = useState<Incident[]>([]);

  const [filters, setFilters] = useState<Filters>({
    category: "",
    priority: "",
    status: "",
  });

  const updateIncidentStatus = (id: number, status: Incident["status"]) => {
    // Actualizar en la lista principal
    setIncidentList((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status } : inc))
    );
    // También actualizar en la lista de destacados si existe allí
    setIncidentsFeature((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status } : inc))
    );
  };

  const handleIncidentFeature = (incident: Incident) => {
    const isAlreadyFeatured = incidentsFeature.some((inc) => inc.id === incident.id);
    // const isAlreadyFeatured = incidentsFeature.includes(incident); // Versión con includes (busca por referencia exacta)
    // esto devuelve true si el objeto exacto ya está en la lista de destacados, pero no funcionará si el objeto ha sido modificado o recreado (por ejemplo, al actualizar su estado), por lo que es más seguro usar el método some con comparación por id.

    if (isAlreadyFeatured) {
      // Quitar de destacados
      setIncidentsFeature((prev) => prev.filter((inc) => inc.id !== incident.id));
      // Actualizar flag en la lista principal
      // se coloca setIncidentList dentro del if para que solo se ejecute cuando se quite de destacados, evitando así una actualización innecesaria al agregar a destacados, ya que en ese caso el flag isFeatured ya se establece en true al crear el nuevo objeto newFeatured.
      setIncidentList((prev) =>
        prev.map((inc) => (inc.id === incident.id ? { ...inc, isFeatured: false } : inc))
      );
    } else {
      // Agregar a destacados
      const newFeatured = { ...incident, isFeatured: true };
      setIncidentsFeature((prev) => [...prev, newFeatured]);
      // Actualizar flag en la lista principal
      setIncidentList((prev) =>
        prev.map((inc) => (inc.id === incident.id ? { ...inc, isFeatured: true } : inc))
      );
    }
  };


    // const handleIncidentFeature = (incident: Incident) => {
    //   const newList = incidentsFeature.includes(incident)
    //     ? incidentsFeature.filter((inc) => inc.id !== incident.id)
    //     : [...incidentsFeature, { ...incident, isFeatured: true }];

    //   setIncidentsFeature(newList);

  return (
    <IncidentsContext.Provider
      value={{
        incidentList,
        incidentsFeature,
        filters,
        setFilters,
        updateIncidentStatus,
        handleIncidentFeature,
      }}
    >
      {children}
    </IncidentsContext.Provider>
  );
};

export { IncidentsContext };
