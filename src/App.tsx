import { Routes, Route } from "react-router-dom";
import { AllIncidentsPage } from "./pages/AllIncidentsPage.tsx";
import { SummaryPage } from "./pages/SummaryPage.tsx";
import { Navbar } from "./components/Navbar.tsx";
import { IncidentsProvider } from "./context/IncidentsContext.tsx";
import "./App.css";

const App = () => {
  return (
    <IncidentsProvider>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<AllIncidentsPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </div>
    </IncidentsProvider>
  );
};

export default App;
