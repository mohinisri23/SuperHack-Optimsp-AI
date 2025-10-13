import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your MSP AI assistant. Ask me about cost optimization, client retention, or performance insights.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  const getDemoResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('revenue') || input.includes('growth')) {
      return "Based on your current metrics, your revenue growth of 12.5% is excellent! The Engineering department expansion is driving 67% of new contracts. I recommend focusing on scaling this successful model to other departments.";
    }
    
    if (input.includes('cost') || input.includes('optimization') || input.includes('infrastructure')) {
      return "I've identified a significant opportunity: Your IT infrastructure is running at only 45% capacity. By consolidating 3 redundant tools and rightsizing cloud resources, you could save approximately $72K annually.";
    }
    
    if (input.includes('client') || input.includes('retention')) {
      return "Your client retention rate of 94.5% is outstanding! To maintain this excellence, I recommend implementing proactive health checks for your top 10 clients and setting up automated alerts for engagement drops.";
    }
    
    if (input.includes('team') || input.includes('productivity')) {
      return "Your support team's resolution time improved by 18% this quarter. This workflow optimization could be applied to Operations and Sales departments for additional efficiency gains of 15-20%.";
    }
    
    if (input.includes('profit') || input.includes('margin')) {
      return "Your profit margin of 23% is healthy for an MSP. Focus on the Operations department optimization to potentially increase this to 26-28%. The key is automating routine tasks and improving resource allocation.";
    }
    
    return "Based on your MSP metrics (Revenue: $2.3M, 157 clients, 23% margin, 94.5% retention), I recommend focusing on infrastructure optimization for immediate cost savings and scaling your successful Engineering department model.";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
      console.log('API Key exists:', !!API_KEY);
      console.log('API Key starts with sk-:', API_KEY?.startsWith('sk-'));
      
      if (!API_KEY || !API_KEY.startsWith('sk-') || demoMode) {
        // Use demo mode
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        const demoResponse = getDemoResponse(userInput);
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: demoResponse + (demoMode ? '' : '\n\n(Demo mode - API key not configured)'),
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        return;
      }
      
      console.log('Sending request to OpenAI...');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an expert MSP (Managed Service Provider) business analyst assistant. Provide specific, actionable insights about MSP operations, cost optimization, client retention, and performance metrics. Keep responses concise and professional. Current MSP metrics: Revenue $2.3M, 157 clients, 23% profit margin, 94.5% client retention rate.'
            },
            {
              role: 'user',
              content: userInput
            }
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
        console.error('API Error Response:', errorData);
        
        if (response.status === 429 && errorData.error?.code === 'insufficient_quota') {
          throw new Error('OpenAI quota exceeded. Please check your billing or use the demo mode.');
        }
        
        throw new Error(`API request failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const result = await response.json();
      console.log('OpenAI Response:', result);
      
      const aiResponse = result.choices?.[0]?.message?.content || 'No response received';

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      
      let errorText = 'I apologize, but I\'m having trouble connecting right now.';
      
      if (error instanceof Error) {
        if (error.message.includes('quota exceeded')) {
          setDemoMode(true);
          errorText = 'OpenAI quota exceeded. Switching to demo mode. You can still ask questions about your MSP metrics!';
        } else if (error.message.includes('Invalid or missing')) {
          setDemoMode(true);
          errorText = 'API key not configured. Using demo mode. Ask me about revenue, costs, or client retention!';
        } else {
          errorText = `Error: ${error.message}`;
        }
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.text}
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-secondary" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your MSP metrics..."
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}