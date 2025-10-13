import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  Percent,
  Users as UsersIcon,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AIChat } from "@/components/AIChat";
import { AlertsPanel } from "@/components/AlertsPanel";
import { useState, useEffect } from "react";
import { generateInsights, type AIInsight } from "@/services/aiService";

// Main overview dashboard page
export default function Overview() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const data = await generateInsights();
        setInsights(data);
      } catch (error) {
        console.error('Failed to load insights:', error); // TODO: better error handling
      } finally {
        setIsLoadingInsights(false);
      }
    };
    loadInsights(); // load on mount
  }, []);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-foreground font-medium">Overview</span>
      </div>

      {/* Time Period Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Business Overview</h2>
        <select className="rounded-lg border border-border bg-card px-4 py-2 text-sm">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Last 12 months</option>
        </select>
      </div>

      {/* Main business health metric - shows overall performance */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Business Health Score
            </CardTitle>
            <Badge className="bg-success/20 text-success hover:bg-success/30">
              Excellent
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            {/* Circular progress indicator - the SVG circle stuff is a bit messy but works */}
            <div className="relative">
              <svg className="h-32 w-32 -rotate-90 transform">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(87 / 100) * 351.86} 351.86`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(142 76% 36%)" />
                    <stop offset="100%" stopColor="hsl(142 76% 46%)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-success">87</span>
                <span className="text-xs text-muted-foreground">/100</span>
              </div>
            </div>

            {/* Quick alert summaries */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 rounded-lg bg-destructive/10 p-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span className="text-sm font-medium text-destructive">
                  3 Critical Alerts
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-success/10 p-3">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="text-sm font-medium text-success">
                  +5 points this month
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">$2.3M</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-success font-medium">+12.5%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Profit Margin */}
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                <Percent className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Profit Margin</p>
                <p className="text-2xl font-bold">23%</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-success font-medium">+2.1%</span>
              <span className="text-muted-foreground">improvement</span>
            </div>
          </CardContent>
        </Card>

        {/* Active Clients */}
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <UsersIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Active Clients</p>
                <p className="text-2xl font-bold">157</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm">
              <span className="text-muted-foreground">No change</span>
            </div>
          </CardContent>
        </Card>

        {/* AI Optimization Savings */}
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-primary to-secondary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm opacity-90">AI Optimization Savings</p>
                <p className="text-2xl font-bold">$240K</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4" />
              <span className="font-medium">Accelerated</span>
              <span className="opacity-90">this quarter</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights & Interactive Features */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI-Powered Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoadingInsights ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => ( // loading skeleton
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              insights.map((insight, index) => {
                const getInsightIcon = (type: string) => {
                  switch (type) {
                    case 'improvement': return <TrendingUp className="h-4 w-4 text-success" />;
                    case 'alert': return <AlertTriangle className="h-4 w-4 text-warning" />;
                    default: return <Sparkles className="h-4 w-4 text-primary" />;
                  }
                };
                
                const getInsightBg = (type: string) => {
                  switch (type) {
                    case 'improvement': return 'bg-success/20';
                    case 'alert': return 'bg-warning/20';
                    default: return 'bg-primary/20';
                  }
                };

                return (
                  <div key={index} className="rounded-lg border border-border bg-muted/30 p-4">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${getInsightBg(insight.type)}`}>
                        {getInsightIcon(insight.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{insight.title}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {insight.confidence}% confidence
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {insight.description}
                        </p>
                        <div className="text-sm font-medium text-success">
                          Impact: {insight.impact}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        <AlertsPanel />
      </div>

      {/* AI Chat Assistant */}
      <AIChat />
    </div>
  );
}
