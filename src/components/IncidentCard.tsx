import { useContext } from "react";
import { IncidentsContext } from "../context/IncidentsContext";
import type { Incident } from "../context/IncidentsContext";

interface Props {
  incident: Incident;
}

export const IncidentCard = ({ incident }: Props) => {
  const context = useContext(IncidentsContext);
  if (!context) return null;
  const { updateIncidentStatus, handleIncidentFeature } = context;


  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#ff4d4f";
      case "medium":
        return "#faad14";
      case "low":
        return "#52c41a";
      default:
        return "#bfbfbf";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "#d9f7be";
      case "in-progress":
        return "#fff7e6";
      case "pending":
        return "#fff1f0";
      default:
        return "#f5f5f5";
    }
  };

  return (
    <div
      className="panel"
      style={{
        borderLeft: `6px solid ${getPriorityColor(incident.priority)}`,
        backgroundColor: incident.isFeatured ? "#3a3a2e" : "#2f2f2f",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>{incident.title}</h2>
          <p style={{ fontSize: "14px", color: "#666" }}>
            ID: {incident.id} | {incident.date} | Reportado por:{" "}
            <strong>{incident.user}</strong>
          </p>
        </div>
        <button
          onClick={() => handleIncidentFeature(incident)}
          style={{
            background: incident.isFeatured ? "#faad14" : "transparent",
            color: incident.isFeatured ? "#111" : "#faad14",
            border: "1px solid #faad14",
            padding: "4px 8px",
            fontSize: "12px",
          }}
        >
          {incident.isFeatured ? "Destacada" : "Destacar"}
        </button>
      </div>

      <div style={{ marginTop: "12px" }}>
        <p>{incident.description}</p>
      </div>

      <div
        style={{
          marginTop: "16px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            padding: "2px 8px",
            borderRadius: "4px",
            background: "#e6f7ff",
            color: "#0050b3",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {incident.category.toUpperCase()}
        </span>

        <div style={{ display: "flex", gap: "4px" }}>
          <select
            value={incident.status}
            onChange={(e) =>
              updateIncidentStatus(incident.id, e.target.value as any)
            }
            style={{
              padding: "4px",
              borderRadius: "4px",
              background: getStatusColor(incident.status),
              border: "1px solid #d9d9d9",
            }}
          >
            <option value="pending">Pendiente</option>
            <option value="in-progress">En proceso</option>
            <option value="resolved">Resuelto</option>
          </select>
        </div>
      </div>
    </div>
  );
};
