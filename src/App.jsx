import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";
import CookieConsent from "@/components/CookieConsent";

import Index from "./pages/Index";
import Industries from "./pages/Industries";
import Products from "./pages/Products";
import Geoshop from "./pages/Geoshop";
import Support from "./pages/Support";
import About from "./pages/About";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* GCES Platform */}
            <Route path="/" element={<Index />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/products" element={<Products />} />
            <Route path="/support" element={<Support />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            {/* GEOSHOP Application */}
            <Route path="/geoshop" element={<Geoshop />} />
            <Route path="/geoshop/about" element={<AboutUs />} />
            <Route path="/geoshop/login" element={<Login />} />
            <Route path="/geoshop/register" element={<Register />} />

            <Route
              path="/geoshop/checkout"
              element={
                <ProtectedRoute>
                  <Geoshop />
                </ProtectedRoute>
              }
            />
            <Route
              path="/geoshop/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            {/* Backward-compatible route redirects */}
            <Route path="/login" element={<Navigate to="/geoshop/login" replace />} />
            <Route path="/register" element={<Navigate to="/geoshop/register" replace />} />
            <Route path="/checkout" element={<Navigate to="/geoshop/checkout" replace />} />
            <Route path="/admin" element={<Navigate to="/geoshop/admin" replace />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
