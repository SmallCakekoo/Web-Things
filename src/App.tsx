import Saved from "./pages/Saved/Saved";
import Catalogue from "./pages/Catalogue/Catalogue";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";

function App() {
  return (
    <>
      <MovieProvider>
        <Routes>
          <Route path="/saved" element={<Saved />} />
          <Route path="/catalogue" element={<Catalogue />} />
        </Routes>
      </MovieProvider>
    </>
  );
}

export default App;
