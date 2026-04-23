import { NoteForm } from "../components/NoteForm.tsx";
import { NotesList } from "../components/NotesList.tsx";
import { NotesSummary } from "../components/NotesSummary.tsx";

export const NotesPage = () => {
  return (
    <main className="page">
      <h1>Gestor de notas</h1>
      <p>Notas usando Redux.</p>

      <section className="panel">
        <NoteForm />
      </section>
      <NotesSummary />
      <section className="panel">
        <NotesList />
      </section>
    </main>
  );
};
