import { useContext } from "react";
import { IncidentsContext } from "../context/IncidentsContext";
import { IncidentCard } from "../components/IncidentCard";
import { FiltersBar } from "../components/FiltersBar";

export const AllIncidentsPage = () => {
  const context = useContext(IncidentsContext);
  if (!context) return null;
  const { incidentList, filters } = context;

  const filteredIncidents = incidentList.filter((inc) => {
    return (
      (filters.category === "" || inc.category === filters.category) &&
      (filters.priority === "" || inc.priority === filters.priority) &&
      (filters.status === "" || inc.status === filters.status)
    );
  });


  return (
    <div className="page">
      <h1>Gestión de Incidencias</h1>
      <p>Panel central para el seguimiento de tickets de soporte técnico.</p>

      <section>
        <h2>Filtros</h2>
        <FiltersBar />
      </section>

      <section style={{ marginTop: "32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Listado de Tickets ({filteredIncidents.length})</h2>
        </div>

        {filteredIncidents.length === 0 ? (
          <div
            className="panel"
            style={{ textAlign: "center", padding: "40px" }}
          >
            <p style={{ color: "#999" }}>
              No se encontraron incidencias con los filtros aplicados.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "16px", marginTop: "16px" }}>
            {filteredIncidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
