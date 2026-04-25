import { useContext } from "react";
import { IncidentsContext } from "../context/IncidentsContext";
import { IncidentCard } from "../components/IncidentCard";
import { SummaryView } from "../components/SummaryView";

export const SummaryPage = () => {
  const context = useContext(IncidentsContext);
  if (!context) return null;
  const { incidentsFeature } = context;



  return (
    <div className="page">
      <h1>Resumen y Destacados</h1>
      <p>Estadísticas generales y acceso rápido a tickets prioritarios.</p>

      <section>
        <SummaryView />
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2>Incidencias Destacadas ({incidentsFeature.length})</h2>

        {incidentsFeature.length === 0 ? (
          <div
            className="panel"
            style={{ textAlign: "center", padding: "40px" }}
          >
            <p style={{ color: "#999" }}>
              No has marcado ninguna incidencia como destacada todavía.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "16px", marginTop: "16px" }}>
            {incidentsFeature.map((inc) => (
              <IncidentCard key={inc.id} incident={inc} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
