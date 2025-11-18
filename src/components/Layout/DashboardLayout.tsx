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
  MessageCircle,
  Mail,
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState({ name: '', email: '', initials: '' });
  const [showGoogleLogin, setShowGoogleLogin] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleStep, setGoogleStep] = useState('email'); // 'email' or 'password'
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

  const handleLogin = () => {
    if (userEmail && userPassword) {
      const emailParts = userEmail.split('@')[0];
      const nameParts = emailParts.split('.');
      const firstName = nameParts[0] || emailParts;
      const lastName = nameParts[1] || '';
      const fullName = lastName ? `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}` : firstName.charAt(0).toUpperCase() + firstName.slice(1);
      const initials = lastName ? `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}` : firstName.charAt(0).toUpperCase() + (firstName.charAt(1) || '').toUpperCase();
      
      setLoggedInUser({
        name: fullName,
        email: userEmail,
        initials: initials
      });
      setIsLoggedIn(true);
      setShowUserMenu(false);
      setUserEmail('');
      setUserPassword('');
    }
  };

  const handleSocialLogin = (provider: string) => {
    if (provider === 'google') {
      setShowGoogleLogin(true);
      setGoogleStep('email');
    } else {
      const sampleUsers = {
        microsoft: { name: 'Microsoft User', email: 'user@outlook.com', initials: 'MU' }
      };
      setLoggedInUser(sampleUsers[provider]);
      setIsLoggedIn(true);
      setShowUserMenu(false);
    }
  };

  const handleGoogleEmailNext = () => {
    if (googleEmail) {
      setGoogleStep('password');
    }
  };

  const handleGoogleLogin = () => {
    if (googleEmail) {
      const emailParts = googleEmail.split('@')[0];
      const nameParts = emailParts.split('.');
      const firstName = nameParts[0] || emailParts;
      const lastName = nameParts[1] || '';
      const fullName = lastName ? `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}` : firstName.charAt(0).toUpperCase() + firstName.slice(1);
      const initials = lastName ? `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}` : firstName.charAt(0).toUpperCase() + (firstName.charAt(1) || '').toUpperCase();
      
      setLoggedInUser({
        name: fullName,
        email: googleEmail,
        initials: initials
      });
      setIsLoggedIn(true);
      setShowGoogleLogin(false);
      setShowUserMenu(false);
      setGoogleEmail('');
      setGoogleStep('email');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser({ name: '', email: '', initials: '' });
  };



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
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="OptiMSP" className="h-10 w-10 object-contain" />
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  OptiMSP AI
                </span>
                <span className="rounded-full bg-warning/20 px-2 py-0.5 text-xs font-medium text-warning">
                  BETA
                </span>
              </div>
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
            <div className="mt-6 rounded-lg bg-gradient-to-br from-primary to-secondary p-4 text-primary-foreground relative">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <p className="text-xs opacity-90 mb-3">
                Get instant insights about your MSP operations
              </p>
              <Button
                onClick={() => {
                  const aiSection = document.querySelector('[data-ai-assistant]');
                  if (aiSection) {
                    aiSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Trigger the AI chat to open
                    const aiButton = aiSection.querySelector('button');
                    if (aiButton && !aiSection.querySelector('[data-ai-chat]')) {
                      aiButton.click();
                    }
                  }
                }}
                className="w-full bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white border border-white/30 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                size="sm"
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="p-1 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                    <Sparkles className="h-3 w-3 animate-pulse" />
                  </div>
                  <span className="font-semibold tracking-wide">ASK AI</span>
                  <div className="ml-1 px-1.5 py-0.5 bg-white/20 rounded text-xs font-bold">
                    β
                  </div>
                </div>
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

            <div className="ml-auto flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-border/30">
                <Button
                  variant={isLive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setIsLive(!isLive)}
                  className={`h-8 px-3 ${isLive ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md' : 'hover:bg-muted'}`}
                >
                  <Zap className={`h-4 w-4 mr-2 ${isLive ? 'animate-pulse' : ''}`} />
                  <span className="text-sm font-medium">Live Data</span>
                </Button>
                {isLive && (
                  <div className="flex items-center gap-1.5 ml-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-green-600">LIVE</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <NotificationCenter />
                <ThemeCustomizer />
              </div>

              <div className="relative" ref={userMenuRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-primary-foreground">
                    {isLoggedIn ? loggedInUser.initials : '?'}
                  </div>
                  {isLoggedIn && <span className="text-sm hidden sm:block">{loggedInUser.name}</span>}
                </Button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-1rem)] bg-card border border-border rounded-lg shadow-lg z-50">
                    {!isLoggedIn ? (
                      <>
                        <div className="p-4 border-b border-border">
                          <h3 className="font-semibold mb-3 text-base">Account Login</h3>
                          <div className="space-y-3">
                            <Input 
                              placeholder="john.doe@company.com" 
                              className="h-10" 
                              value={userEmail}
                              onChange={(e) => setUserEmail(e.target.value)}
                            />
                            <Input 
                              type="password" 
                              placeholder="Password" 
                              className="h-10" 
                              value={userPassword}
                              onChange={(e) => setUserPassword(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                            />
                            <Button 
                              onClick={handleLogin}
                              className="w-full h-10 bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-200"
                            >
                              Sign In
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="space-y-3">
                            <button 
                              onClick={() => handleSocialLogin('google')}
                              className="flex items-center justify-center w-full p-3 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
                            >
                              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                              </svg>
                              <span className="text-sm font-medium text-gray-700">Continue with Google</span>
                            </button>
                            <button 
                              onClick={() => handleSocialLogin('microsoft')}
                              className="flex items-center justify-center w-full p-3 bg-[#0078d4] text-white rounded-md hover:bg-[#106ebe] transition-colors shadow-sm"
                            >
                              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
                              </svg>
                              <span className="text-sm font-medium">Continue with Microsoft</span>
                            </button>
                            <div className="relative my-4">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border"></div>
                              </div>
                              <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">or</span>
                              </div>
                            </div>
                            <button className="block w-full text-center text-sm text-primary hover:underline py-2">
                              Forgot Password?
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-4 p-3 bg-muted/30 rounded-lg">
                          <div className="relative">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-primary-foreground ring-2 ring-background">
                              {loggedInUser.initials}
                            </div>
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background"></div>
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-base">{loggedInUser.name}</p>
                            <p className="text-sm text-muted-foreground">{loggedInUser.email}</p>
                            <p className="text-xs text-green-600 font-medium">● Online</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <button className="block w-full text-left p-2 hover:bg-muted rounded-md transition-colors">
                            Profile Settings
                          </button>
                          <button className="block w-full text-left p-2 hover:bg-muted rounded-md transition-colors">
                            Account Preferences
                          </button>
                          <hr className="my-2" />
                          <button 
                            onClick={handleLogout}
                            className="block w-full text-left p-2 hover:bg-muted rounded-md transition-colors text-destructive"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
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

      {/* Google Login Modal */}
      {showGoogleLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-96 max-w-[90vw]">
            <div className="p-8">
              <div className="text-center mb-6">
                <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <h2 className="text-2xl font-normal text-gray-800 mb-2">Sign in</h2>
                <p className="text-sm text-gray-600">to continue to OptiMSP AI</p>
              </div>
              
              {googleStep === 'email' ? (
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Email or phone"
                      value={googleEmail}
                      onChange={(e) => setGoogleEmail(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleGoogleEmailNext()}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                    Forgot email?
                  </div>
                  <div className="text-sm text-gray-600">
                    Not your computer? Use Guest mode to sign in privately.
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <button 
                      onClick={() => setShowGoogleLogin(false)}
                      className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleGoogleEmailNext}
                      disabled={!googleEmail}
                      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {googleEmail.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{googleEmail}</p>
                    </div>
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      onKeyPress={(e) => e.key === 'Enter' && handleGoogleLogin()}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                    Forgot password?
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <button 
                      onClick={() => setGoogleStep('email')}
                      className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleGoogleLogin}
                      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
