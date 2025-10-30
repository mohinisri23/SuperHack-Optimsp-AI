export interface AIInsight {
  title: string;
  description: string;
  impact: string;
  confidence: number;
  type: 'optimization' | 'alert' | 'improvement';
}

const mockInsights: AIInsight[] = [
  {
    title: "Revenue Acceleration Detected",
    description: "Q4 revenue growth of 12.5% indicates strong market positioning. Engineering dept expansion driving 67% of new contracts.",
    impact: "+$240K ARR",
    confidence: 94,
    type: 'improvement'
  },
  {
    title: "Infrastructure Cost Optimization",
    description: "IT infrastructure running at 45% capacity. AI recommends consolidating 3 redundant tools and rightsizing cloud resources.",
    impact: "$72K/year savings",
    confidence: 89,
    type: 'optimization'
  },
  {
    title: "Client Retention Risk Alert",
    description: "2 enterprise clients showing decreased engagement. Proactive outreach recommended within 48 hours.",
    impact: "$180K at risk",
    confidence: 76,
    type: 'alert'
  }
];

export const generateInsights = async (data?: unknown): Promise<AIInsight[]> => {
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Use mock insights for reliable demo experience
  return mockInsights;
};

const mockResponses: Record<string, string> = {
  'revenue': 'Based on your current $2.3M revenue with 157 clients, you\'re averaging $14.6K per client annually. Consider upselling managed security services to increase this to $18K per client, potentially adding $533K in revenue.',
  'cost': 'Your 23% profit margin is solid but can improve. Focus on automating routine tasks and consolidating vendor relationships. Target 28% margin by reducing operational overhead by $115K annually.',
  'retention': 'Your 94.5% retention rate is excellent! To maintain this, implement quarterly business reviews and proactive monitoring alerts. One lost enterprise client could impact $50K+ in ARR.',
  'default': 'Your MSP shows strong fundamentals with $2.3M revenue and 94.5% retention. Key opportunities: increase profit margins through automation, expand service offerings, and focus on client success programs to drive growth.'
};

import { generateAIResponse } from './bedrockService';

export const sendChatMessage = async (message: string): Promise<string> => {
  try {
    return await generateAIResponse(message);
  } catch (error) {
    // Fallback to mock responses
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('revenue')) return mockResponses.revenue;
    if (lowerMessage.includes('cost')) return mockResponses.cost;
    if (lowerMessage.includes('retention')) return mockResponses.retention;
    return mockResponses.default;
  }
};

export const getOptimizationSuggestions = () => [
  {
    title: "Consolidate SaaS Tools",
    impact: "$48K/year",
    confidence: 92
  },
  {
    title: "Rightsize Cloud Infrastructure", 
    impact: "$72K/year",
    confidence: 88
  },
  {
    title: "Automate Ticket Routing",
    impact: "$31K/year",
    confidence: 85
  }
];