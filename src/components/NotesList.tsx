import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../redux/slices/notesSlice.ts";
import type { AppDispatch, RootState } from "../redux/store.ts";

export const NotesList = () => {
    // El tipado de useDispatch es para q ts sepa q tipo de acciones se van a despachar
  const dispatch = useDispatch<AppDispatch>();
  // El tipado de useSelector es para q ts sepa q tipo de estado se va a seleccionar
  const notes = useSelector((state: RootState) => state.notes.list);

  return (
    <section aria-labelledby="notes-list-title">
      <h2 id="notes-list-title">Notas guardadas</h2>
      {notes.length === 0 ? (
        <p>No hay notas todavía.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <strong>{note.title}</strong>
              <p>{note.description}</p>
              <button
                type="button"
                onClick={() => dispatch(deleteNote(note.id))}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
