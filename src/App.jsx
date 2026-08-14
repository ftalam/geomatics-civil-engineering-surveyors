import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
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
import ServiceDetail from "./pages/ServiceDetail";
import Surveying from "./pages/Surveying";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
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
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/surveying" element={<Surveying />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            {/* GEOSHOP Application */}
            <Route path="/geoshop" element={<Geoshop />} />
            <Route path="/geoshop/about" element={<AboutUs />} />
            <Route path="/geoshop/login" element={<Login />} />
            <Route path="/geoshop/register" element={<Register />} />
            <Route
              path="/geoshop/orders"
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />

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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      const supportsSmooth =
        typeof window !== "undefined" &&
        typeof document !== "undefined" &&
        typeof CSS !== "undefined" &&
        (CSS.supports ? CSS.supports("scroll-behavior", "smooth") : "scrollBehavior" in document.documentElement.style);

      if (supportsSmooth) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        // fallback for older browsers
        window.scrollTo(0, 0);
      }
    } catch (e) {
      // ignore server/non-browser environments
    }
  }, [pathname]);

  return null;
}

export default App;
