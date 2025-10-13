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

export const generateInsights = async (data?: any): Promise<AIInsight[]> => {
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (!API_KEY || API_KEY.includes('your_openai_api_key')) {
    return mockInsights;
  }

  try {
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
            content: 'You are an expert MSP business analyst. Provide specific, actionable insights with financial impact estimates. Format as JSON array with title, description, impact, confidence (0-100), and type (optimization/alert/improvement).'
          },
          {
            role: 'user',
            content: `Analyze MSP metrics: Revenue $2.3M, 157 clients, 23% margin, 94.5% retention. Provide 3 insights.`
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const result = await response.json();
    return parseAIResponse(result.choices[0].message.content);
  } catch (error) {
    console.error('AI Insights Error:', error);
    return mockInsights;
  }
};

export const sendChatMessage = async (message: string): Promise<string> => {
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!API_KEY || API_KEY.includes('your_openai_api_key')) {
    throw new Error('OpenAI API key not configured');
  }

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
          content: message
        }
      ],
      max_tokens: 300,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error('Failed to get AI response');
  }

  const result = await response.json();
  return result.choices[0].message.content;
};

const parseAIResponse = (content: string): AIInsight[] => {
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return parsed.map(item => ({
        title: item.title || 'AI Insight',
        description: item.description || '',
        impact: item.impact || 'TBD',
        confidence: item.confidence || 75,
        type: item.type || 'optimization'
      }));
    }
  } catch (error) {
    console.error('Failed to parse AI response:', error);
  }
  return mockInsights;
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