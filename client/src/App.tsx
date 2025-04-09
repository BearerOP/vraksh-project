import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LinkProvider } from "@/context/LinkContext";
import Dashboard from "./pages/Dashboard";
import Preview from "./pages/Preview";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import CreateBranch from "./pages/CreateBranch";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <LinkProvider>
            <Routes>
              {/* <Route path="/" element={<Index />} /> */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/preview/:pageId" element={<Preview />} />
              <Route path="/new-branch" element={<CreateBranch />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Sonner
              closeButton
              position="bottom-center"
              richColors
              theme="light"
            />
          </LinkProvider>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
