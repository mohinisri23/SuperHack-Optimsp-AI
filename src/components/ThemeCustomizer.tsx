import { useState, useEffect, useRef } from "react";
import { Palette, Check, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const themes = [
  { name: 'Default', primary: '262 83% 58%', secondary: '220 100% 64%', color: 'hsl(262 83% 58%)' },
  { name: 'Ocean', primary: '200 100% 40%', secondary: '200 100% 60%', color: 'hsl(200 100% 40%)' },
  { name: 'Forest', primary: '142 76% 36%', secondary: '142 76% 56%', color: 'hsl(142 76% 36%)' },
  { name: 'Sunset', primary: '24 95% 53%', secondary: '24 95% 73%', color: 'hsl(24 95% 53%)' },
  { name: 'Purple', primary: '280 100% 70%', secondary: '280 100% 85%', color: 'hsl(280 100% 70%)' }
];

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('Default');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Apply saved theme on mount
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const applyTheme = (theme: typeof themes[0]) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--ring', theme.primary);
    setSelectedTheme(theme.name);
  };

  const toggleDarkMode = () => {
    const html = document.documentElement;
    const newDarkMode = !isDarkMode;
    
    if (newDarkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    setIsDarkMode(newDarkMode);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Palette className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-50">
          <Card className="border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Theme Customizer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Dark/Light Mode Toggle */}
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer" onClick={toggleDarkMode}>
                <div className="flex items-center gap-3">
                  {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <span className="text-sm">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                </div>
                <div className={`w-10 h-5 rounded-full transition-all duration-200 ${
                  isDarkMode ? 'bg-primary' : 'bg-gray-300'
                } relative cursor-pointer`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 absolute top-0.5 shadow-sm ${
                    isDarkMode ? 'translate-x-5' : 'translate-x-0.5'
                  }`} />
                </div>
              </div>
              
              <Separator />
              
              {/* Color Themes */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Color Themes</span>
                {themes.map((theme) => (
                  <div
                    key={theme.name}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer"
                    onClick={() => applyTheme(theme)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: theme.color }}
                      />
                      <span className="text-sm">{theme.name}</span>
                    </div>
                    {selectedTheme === theme.name && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}