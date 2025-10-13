import { ReactNode, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  Users,
  Settings,
  Menu,
  X,
  Sparkles,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLiveData } from "@/hooks/useLiveData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Metrics", href: "/metrics", icon: BarChart3 },
  { name: "Spend Analysis", href: "/spend-analysis", icon: TrendingUp },
  { name: "Team", href: "/team", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { isLive, setIsLive } = useLiveData();

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full border-r border-border bg-card transition-all duration-300",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                OptiMSP AI
              </span>
              <span className="rounded-full bg-warning/20 px-2 py-0.5 text-xs font-medium text-warning">
                BETA
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 p-3">
          <div className="mb-4 space-y-1">
            <p className={cn(
              "px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
              !sidebarOpen && "sr-only"
            )}>
              Dashboard
            </p>
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {sidebarOpen && <span>{item.name}</span>}
                </NavLink>
              );
            })}
          </div>

          {/* AI Assistant */}
          {sidebarOpen && (
            <div className="mt-6 rounded-lg bg-gradient-to-br from-primary to-secondary p-4 text-primary-foreground">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <p className="text-xs opacity-90 mb-3">
                Get instant insights about your MSP operations
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="w-full bg-white/20 hover:bg-white/30 text-white border-0"
              >
                Ask AI
              </Button>
            </div>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="flex h-16 items-center gap-4 px-6">
            <h1 className="text-xl font-semibold">Executive Snapshot</h1>
            <div className="ml-auto flex items-center gap-4">
              <Button
                variant={isLive ? "default" : "outline"}
                size="sm"
                onClick={() => setIsLive(!isLive)}
                className="flex items-center gap-2"
              >
                <Zap className={`h-4 w-4 ${isLive ? 'animate-pulse' : ''}`} />
                Live Data
              </Button>
              {isLive && <Badge variant="secondary" className="animate-pulse">LIVE</Badge>}
              <div className="relative w-96">
                <Sparkles className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Ask AI anything..."
                  className="pl-10 bg-muted/50 border-0"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-primary-foreground">
                  JD
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
