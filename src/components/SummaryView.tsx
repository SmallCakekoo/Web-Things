import { useContext } from "react";
import { IncidentsContext } from "../context/IncidentsContext";

export const SummaryView = () => {
  const context = useContext(IncidentsContext);
  if (!context) return null;
  const { incidentList, incidentsFeature } = context;

  const total = incidentList.length;
  const pending = incidentList.filter((i) => i.status === "pending").length;
  const inProgress = incidentList.filter((i) => i.status === "in-progress").length;
  const resolved = incidentList.filter((i) => i.status === "resolved").length;
  const featured = incidentsFeature.length;
  const highPriority = incidentList.filter((i) => i.priority === "high").length;



  const StatBox = ({
    label,
    value,
    color,
  }: {
    label: string;
    value: number;
    color?: string;
  }) => (
    <div
      style={{
        padding: "16px",
        borderRadius: "8px",
        background: color || "#f0f2f5",
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</div>
      <div
        style={{ fontSize: "12px", color: "#666", textTransform: "uppercase" }}
      >
        {label}
      </div>
    </div>
  );

  return (
    <div className="panel">
      <h2 style={{ marginBottom: "16px" }}>Resumen del Sistema</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "12px",
        }}
      >
        <StatBox label="Total" value={total} />
        <StatBox label="Pendientes" value={pending} color="#451e1e" />
        <StatBox label="En Proceso" value={inProgress} color="#45321e" />
        <StatBox label="Resueltas" value={resolved} color="#1e451e" />
        <StatBox label="Destacadas" value={featured} color="#45451e" />
        <StatBox label="Prioridad Alta" value={highPriority} color="#451e1e" />

      </div>
    </div>
  );
};
