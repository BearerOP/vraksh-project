import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LinkProvider } from "@/context/LinkContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Preview from "./pages/Preview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LinkProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<Index />} /> */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/preview/:pageId" element={<Preview />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LinkProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
