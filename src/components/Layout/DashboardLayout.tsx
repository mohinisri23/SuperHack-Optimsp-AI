import React, { ReactNode, useState, useEffect, useRef } from "react";
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
import { NotificationCenter } from "@/components/NotificationCenter";
import { ThemeCustomizer } from "@/components/ThemeCustomizer";

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

  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
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
            <div className="ml-auto flex items-center gap-2 sm:gap-4">
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
              <NotificationCenter />
              <ThemeCustomizer />

              <div className="relative" ref={userMenuRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-primary-foreground">
                    JD
                  </div>
                </Button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-64 sm:w-72 md:w-80 bg-card border border-border rounded-lg shadow-lg z-50 max-w-[calc(100vw-2rem)] sm:max-w-none">
                    <div className="p-3 sm:p-4 border-b border-border">
                      <h3 className="font-semibold mb-2 text-sm sm:text-base">Account</h3>
                      <div className="space-y-2">
                        <Input placeholder="Email or Username" className="text-xs sm:text-sm" />
                        <Input type="password" placeholder="Password" className="text-xs sm:text-sm" />
                        <Button className="w-full" size="sm">Sign In</Button>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <div className="space-y-2 text-xs sm:text-sm">
                        <button className="block w-full text-left hover:text-primary py-1">Login with Google</button>
                        <button className="block w-full text-left hover:text-primary py-1">Login with Microsoft</button>
                        <button className="block w-full text-left hover:text-primary py-1">Forgot Password?</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}

        </div>
      </main>
    </div>
  );
}
