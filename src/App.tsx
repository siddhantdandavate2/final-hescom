
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import LoginForm from "./components/LoginForm";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import PayBill from "./pages/PayBill";
import ComplaintTracker from "./pages/ComplaintTracker";
import NearestOffice from "./pages/NearestOffice";
import DocumentVault from "./pages/DocumentVault";
import SolarPumpStatus from "./pages/SolarPumpStatus";
import UsefulLinks from "./pages/UsefulLinks";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import FraudDetection from "./pages/FraudDetection";
import EnergyTheft from "./pages/EnergyTheft";
import Feedback from "./pages/Feedback";
import FeedbackInbox from "./pages/FeedbackInbox";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <p className="text-gray-600">Loading HESCOM...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/pay-bill" element={<PayBill />} />
        <Route path="/nearest-office" element={<NearestOffice />} />
        <Route path="/complaints" element={<ComplaintTracker />} />
        <Route path="/documents" element={<DocumentVault />} />
        <Route path="/solar-pump" element={<SolarPumpStatus />} />
        <Route path="/useful-links" element={<UsefulLinks />} />
        <Route path="/fraud-detection" element={<FraudDetection />} />
        <Route path="/energy-theft" element={<EnergyTheft />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/feedback-inbox" element={<FeedbackInbox />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
