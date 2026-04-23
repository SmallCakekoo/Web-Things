import { useState } from "react";
import type { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../redux/slices/notesSlice.ts";
import type { AppDispatch } from "../redux/store.ts";

export const NoteForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) {
      return;
    }

    dispatch(addNote({ title: trimmedTitle, description: trimmedDescription }));
    setTitle("");
    setDescription("");
  };

  return (
    <section aria-labelledby="create-note-title">
      <h2 id="create-note-title">Crear nota</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="note-title">Título</label>
          <input
            id="note-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ej: Comprar pan"
          />
        </div>
        <div>
          <label htmlFor="note-description">Descripción</label>
          <textarea
            id="note-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Agrega un detalle rápido"
          />
        </div>
        <button type="submit">Agregar nota</button>
      </form>
    </section>
  );
};
