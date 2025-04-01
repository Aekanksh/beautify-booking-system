
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import Stylists from "./pages/Stylists";
import Booking from "./pages/Booking";
import AdminDashboard from "./pages/AdminDashboard";
import StylistDashboard from "./pages/StylistDashboard";
import ClientPortal from "./pages/ClientPortal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/stylists" element={<Stylists />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/stylist" element={<StylistDashboard />} />
          <Route path="/client" element={<ClientPortal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
