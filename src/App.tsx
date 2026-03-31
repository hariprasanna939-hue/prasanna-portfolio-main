import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import SpiderWebTrail from "./components/SpiderWebTrail";
import SpidermanParticles from "./components/SpidermanParticles";
import { ThemeProvider } from "./hooks/use-theme-mode";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
          <div className="relative min-h-screen">
            <Navbar />
            <div className="page-frame">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
        <SpiderWebTrail />
        <SpidermanParticles />
        <CustomCursor />
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
