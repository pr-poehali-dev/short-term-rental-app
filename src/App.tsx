
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Search from "./pages/Search";
import MapView from "./pages/MapView";
import PropertyDetail from "./pages/PropertyDetail";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import Reviews from "./pages/Reviews";
import Dashboard from "./pages/owner/Dashboard";
import PropertyEdit from "./pages/owner/PropertyEdit";
import PropertyCalendar from "./pages/owner/PropertyCalendar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reviews/:id" element={<Reviews />} />
          <Route path="/owner/dashboard" element={<Dashboard />} />
          <Route path="/owner/property/:id/edit" element={<PropertyEdit />} />
          <Route path="/owner/property/:id/calendar" element={<PropertyCalendar />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;