import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

import Geoshop from "@/pages/Geoshop";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AdminDashboard from "@/pages/AdminDashboard";

import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/geoshop" element={<Geoshop />} />
          <Route path="/geoshop/login" element={<Login />} />
          <Route path="/geoshop/register" element={<Register />} />

          <Route
            path="/geoshop/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/geoshop/checkout"
            element={
              <ProtectedRoute>
                <div>Checkout Page</div>
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/geoshop" replace />} />
          <Route path="/login" element={<Navigate to="/geoshop/login" replace />} />
          <Route path="/register" element={<Navigate to="/geoshop/register" replace />} />
          <Route path="/checkout" element={<Navigate to="/geoshop/checkout" replace />} />
          <Route path="/admin" element={<Navigate to="/geoshop/admin" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
