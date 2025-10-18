import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity, Cpu, HardDrive, Wifi, Sparkles, Send, MessageCircle } from "lucide-react";
import { sendChatMessage } from "@/services/aiService";

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
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="space-y-4">
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

      {/* AI Assistant */}
      <Card className="border-0 shadow-md bg-gradient-to-br from-primary/5 to-secondary/5" data-ai-assistant>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Sparkles className="h-4 w-4 text-white animate-pulse" />
              </div>
              AI Assistant
            </CardTitle>
            <Button
              onClick={() => setShowAIChat(!showAIChat)}
              variant="outline"
              size="sm"
              className="border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              <MessageCircle className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">{showAIChat ? 'Hide' : 'Ask AI'}</span>
            </Button>
          </div>
        </CardHeader>
        {showAIChat && (
          <CardContent className="space-y-4" data-ai-chat>
            {aiResponse && (
              <div className="p-3 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg text-sm">
                <div className="flex items-start gap-2 mb-2">
                  <Sparkles className="h-3 w-3 text-primary mt-0.5" />
                  <span className="text-xs font-semibold text-primary">AI Insight</span>
                </div>
                {aiResponse}
              </div>
            )}
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask about MSP metrics..."
                  className="flex-1 border-primary/20 focus:border-primary/50 text-sm"
                  onKeyPress={async (e) => {
                    if (e.key === 'Enter' && chatMessage.trim() && !isLoading) {
                      setIsLoading(true);
                      try {
                        const response = await sendChatMessage(chatMessage);
                        setAiResponse(response);
                        setChatMessage("");
                      } catch (error) {
                        setAiResponse("AI service unavailable.");
                      }
                      setIsLoading(false);
                    }
                  }}
                  disabled={isLoading}
                />
                <Button
                  onClick={async () => {
                    if (chatMessage.trim() && !isLoading) {
                      setIsLoading(true);
                      try {
                        const response = await sendChatMessage(chatMessage);
                        setAiResponse(response);
                        setChatMessage("");
                      } catch (error) {
                        setAiResponse("AI service unavailable.");
                      }
                      setIsLoading(false);
                    }
                  }}
                  disabled={!chatMessage.trim() || isLoading}
                  size="sm"
                  className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 px-3"
                >
                  {isLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              <div className="flex gap-1 sm:gap-2 flex-wrap">
                {['Revenue insights', 'Cost optimization', 'Performance tips'].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => setChatMessage(suggestion)}
                    className="text-xs sm:text-sm border-primary/30 hover:bg-primary/10 transition-all duration-200 hover:scale-105 px-2 sm:px-3"
                  >
                    <span className="hidden sm:inline">{suggestion}</span>
                    <span className="sm:hidden">{suggestion.split(' ')[0]}</span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}