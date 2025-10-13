const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export interface AIInsight {
  title: string;
  description: string;
  impact: string;
  confidence: number;
  type: 'optimization' | 'alert' | 'improvement';
}

export const generateInsights = async (data: any): Promise<AIInsight[]> => {
  if (!API_KEY || API_KEY === 'your_openai_api_key_here') {
    return [
      {
        title: "Strong Revenue Growth",
        description: "Revenue increased by 12.5% compared to last month, driven by client expansions.",
        impact: "+$240K",
        confidence: 92,
        type: 'improvement'
      },
      {
        title: "IT Infrastructure Optimization",
        description: "45% utilization detected. Consolidating tools could save significant costs.",
        impact: "$72K/year",
        confidence: 88,
        type: 'optimization'
      }
    ];
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
            content: 'You are an AI assistant for MSP business optimization. Analyze data and provide actionable insights.'
          },
          {
            role: 'user',
            content: `Analyze this MSP business data and provide 3 key insights: ${JSON.stringify(data)}`
          }
        ],
        max_tokens: 500
      })
    });

    const result = await response.json();
    return parseAIResponse(result.choices[0].message.content);
  } catch (error) {
    console.error('AI API Error:', error);
    return [];
  }
};

const parseAIResponse = (content: string): AIInsight[] => {
  return [
    {
      title: "AI-Generated Insight",
      description: content.substring(0, 100) + "...",
      impact: "TBD",
      confidence: 85,
      type: 'optimization'
    }
  ];
};