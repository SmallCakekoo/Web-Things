import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContex";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
