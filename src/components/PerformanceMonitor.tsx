import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Cpu, HardDrive, Wifi } from "lucide-react";

interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 45,
    memory: 62,
    disk: 78,
    network: 34
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 40) + 30,
        memory: Math.floor(Math.random() * 30) + 50,
        disk: Math.floor(Math.random() * 20) + 70,
        network: Math.floor(Math.random() * 50) + 20
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number) => {
    if (value > 80) return "text-red-500";
    if (value > 60) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          System Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              <span className="text-sm">CPU Usage</span>
            </div>
            <span className={`text-sm font-medium ${getStatusColor(metrics.cpu)}`}>
              {metrics.cpu}%
            </span>
          </div>
          <Progress value={metrics.cpu} className="h-2" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="text-sm">Memory</span>
            </div>
            <span className={`text-sm font-medium ${getStatusColor(metrics.memory)}`}>
              {metrics.memory}%
            </span>
          </div>
          <Progress value={metrics.memory} className="h-2" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4" />
              <span className="text-sm">Disk Usage</span>
            </div>
            <span className={`text-sm font-medium ${getStatusColor(metrics.disk)}`}>
              {metrics.disk}%
            </span>
          </div>
          <Progress value={metrics.disk} className="h-2" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              <span className="text-sm">Network</span>
            </div>
            <span className={`text-sm font-medium ${getStatusColor(metrics.network)}`}>
              {metrics.network}%
            </span>
          </div>
          <Progress value={metrics.network} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}