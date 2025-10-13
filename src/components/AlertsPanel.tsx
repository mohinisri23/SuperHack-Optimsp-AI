import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Clock, TrendingDown, Zap } from "lucide-react";

// real-time alerts component

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  timestamp: Date;
  resolved: boolean;
}

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      title: 'Client Engagement Drop',
      description: 'TechCorp Inc. ticket volume decreased 60% this week',
      severity: 'critical',
      category: 'Client Risk',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      resolved: false
    },
    {
      id: '2', 
      title: 'Infrastructure Overprovisioning',
      description: 'AWS costs 40% above optimal for current usage',
      severity: 'high',
      category: 'Cost Optimization',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      resolved: false
    },
    {
      id: '3',
      title: 'SLA Breach Risk',
      description: 'Support queue at 85% capacity, response time increasing',
      severity: 'medium',
      category: 'Performance',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      resolved: false
    }
  ]);

  // simulate new alerts coming in
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance - might be too frequent?
        const newAlert: Alert = {
          id: Date.now().toString(),
          title: 'New Optimization Opportunity',
          description: `Detected potential savings in ${['Marketing', 'Operations', 'IT'][Math.floor(Math.random() * 3)]} department`,
          severity: 'medium',
          category: 'AI Insight',
          timestamp: new Date(),
          resolved: false
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      }
    }, 10000); // 10 sec interval

    return () => clearInterval(interval);
  }, []);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'high': return <TrendingDown className="h-4 w-4 text-orange-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <Zap className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive/20 text-destructive';
      case 'high': return 'bg-orange-500/20 text-orange-700';
      case 'medium': return 'bg-yellow-500/20 text-yellow-700';
      default: return 'bg-blue-500/20 text-blue-700';
    }
  };

  const resolveAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, resolved: true } : alert
    ));
  };

  const activeAlerts = alerts.filter(alert => !alert.resolved);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Real-time Alerts
          </span>
          <Badge variant="secondary">{activeAlerts.length} active</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-2 text-success" />
            <p>All alerts resolved!</p>
          </div>
        ) : (
          activeAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                {getSeverityIcon(alert.severity)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">{alert.title}</h4>
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {alert.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {alert.category} • {alert.timestamp.toLocaleTimeString()}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => resolveAlert(alert.id)}
                  >
                    Resolve
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}