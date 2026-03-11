import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ClientExperience } from "./components/experiences/client/ClientExperience";
import { InternalExperience } from "./components/experiences/internal/InternalExperience";

const queryClient = new QueryClient();

// DOMAIN ROUTING LOGIC
const DomainWrapper = () => {
  const hostname = window.location.hostname;
  // Check for 'client' subdomain OR exact path '/client'
  // logic: if subdomain is 'client.domain.com' -> Show ClientExperience
  const isClientDomain = hostname.startsWith("client.");

  if (isClientDomain) {
    return <ClientExperience />;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/client" element={<ClientExperience />} />
      <Route path="/internalteam" element={<InternalExperience />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DomainWrapper />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
