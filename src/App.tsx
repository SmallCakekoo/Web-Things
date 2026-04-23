import { Routes, Route } from "react-router-dom";
import { NotesPage } from "./pages/NotesPage.tsx";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NotesPage />} />
    </Routes>
  );
};

export default App;
