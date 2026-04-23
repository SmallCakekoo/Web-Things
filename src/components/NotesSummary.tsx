import { useSelector } from "react-redux";
import type { RootState } from "../redux/store.ts";

export const NotesSummary = () => {
  const notes = useSelector((state: RootState) => state.notes.list);
  const latestNote = notes[notes.length - 1];

  return (
    <section className="panel summary" aria-labelledby="summary-title">
      <h2 id="summary-title">Resumen</h2>
      <p>Cantidad total de notas: {notes.length}</p>
      <p>
        Última nota agregada:{" "}
        {latestNote ? latestNote.title : "Aún no hay notas"}
      </p>
    </section>
  );
};
