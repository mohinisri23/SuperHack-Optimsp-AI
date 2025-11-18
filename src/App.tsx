import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/Layout/DashboardLayout";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Overview from "./pages/Overview";
import Metrics from "./pages/Metrics";
import SpendAnalysis from "./pages/SpendAnalysis";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <div>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<DashboardLayout><Overview /></DashboardLayout>} />
            <Route path="/metrics" element={<DashboardLayout><Metrics /></DashboardLayout>} />
            <Route path="/spend-analysis" element={<DashboardLayout><SpendAnalysis /></DashboardLayout>} />
            <Route path="/team" element={<DashboardLayout><Team /></DashboardLayout>} />
            <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
