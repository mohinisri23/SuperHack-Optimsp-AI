import { useState, useEffect } from 'react';

// metrics interface
interface LiveMetrics {
  revenue: number;
  clients: number;
  alerts: number;
  efficiency: number;
}

export function useLiveData() {
  const [metrics, setMetrics] = useState<LiveMetrics>({
    revenue: 2300000,
    clients: 157,
    alerts: 3,
    efficiency: 87
  });

  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!isLive) return; // don't update if not live

    const interval = setInterval(() => { // update every 3 seconds
      setMetrics(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 5000) - 2000, // random revenue changes
        clients: prev.clients + (Math.random() > 0.95 ? 1 : 0), // occasionally add client
        alerts: Math.max(0, prev.alerts + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0)), // alerts go up/down
        efficiency: Math.min(100, Math.max(70, prev.efficiency + (Math.random() - 0.5) * 2)) // efficiency fluctuates
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  return { metrics, isLive, setIsLive };
}