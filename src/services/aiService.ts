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

// MSP Business Context
const mspContext = {
  revenue: 2300000,
  clients: 157,
  retention: 94.5,
  profitMargin: 23,
  avgClientValue: 14600,
  departments: ['Engineering', 'Sales', 'Support', 'Operations'],
  services: ['Managed IT', 'Cloud Services', 'Security', 'Backup & Recovery'],
  challenges: ['Cost optimization', 'Client retention', 'Service expansion', 'Team productivity']
};

const generateContextualResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Revenue-related queries
  if (lowerMessage.includes('revenue') || lowerMessage.includes('income') || lowerMessage.includes('money') || lowerMessage.includes('profit')) {
    return `📊 **Revenue Analysis**: Your $2.3M revenue with 157 clients averages $14.6K per client annually. **Growth opportunities**: 
• Upsell managed security services (+$533K potential)
• Expand cloud migration services (+$280K potential)
• Implement tiered service packages (+15% revenue increase)
• Target enterprise clients (avg $45K vs current $14.6K)

**Quick wins**: Focus on your top 20% clients for upselling - they represent 60% of your revenue potential.`;
  }
  
  // Cost and optimization queries
  if (lowerMessage.includes('cost') || lowerMessage.includes('expense') || lowerMessage.includes('save') || lowerMessage.includes('optimize')) {
    return `💰 **Cost Optimization Strategy**: Your 23% profit margin can reach 28% with these actions:
• Consolidate SaaS tools: Save $48K/year (currently using 23 tools)
• Rightsize cloud infrastructure: Save $72K/year (45% underutilized)
• Automate ticket routing: Save $31K/year in labor costs
• Vendor consolidation: Save $25K/year in licensing

**Total potential savings**: $176K annually. Start with tool consolidation for immediate impact.`;
  }
  
  // Client retention queries
  if (lowerMessage.includes('retention') || lowerMessage.includes('client') || lowerMessage.includes('customer') || lowerMessage.includes('churn')) {
    return `🎯 **Client Retention Insights**: Your 94.5% retention is excellent! **Maintain & improve**:
• Implement quarterly business reviews (QBRs)
• Proactive monitoring alerts for client health
• Client success manager for enterprise accounts
• Regular satisfaction surveys and feedback loops

**Risk alert**: 2 enterprise clients showing decreased engagement. Immediate outreach recommended to protect $180K ARR.`;
  }
  
  // Performance and productivity queries
  if (lowerMessage.includes('performance') || lowerMessage.includes('productivity') || lowerMessage.includes('efficiency') || lowerMessage.includes('team')) {
    return `⚡ **Performance Optimization**: Your team metrics show strong potential:
• Engineering dept: 67% of new contract wins (top performer)
• Support team: 4.2/5 client satisfaction (industry avg: 3.8)
• Sales team: 23% close rate (can improve to 30%)

**Recommendations**: Invest in sales training, implement automation tools, and expand your high-performing engineering team.`;
  }
  
  // Growth and expansion queries
  if (lowerMessage.includes('growth') || lowerMessage.includes('expand') || lowerMessage.includes('scale') || lowerMessage.includes('future')) {
    return `🚀 **Growth Strategy**: Based on your strong foundation ($2.3M revenue, 94.5% retention):
• **Market expansion**: Target mid-market clients (50-200 employees)
• **Service expansion**: Add cybersecurity and compliance services
• **Geographic expansion**: Consider adjacent markets within 100 miles
• **Partnership opportunities**: Align with software vendors for referrals

**12-month target**: $2.8M revenue with 180 clients through strategic expansion.`;
  }
  
  // Security-related queries
  if (lowerMessage.includes('security') || lowerMessage.includes('cyber') || lowerMessage.includes('threat') || lowerMessage.includes('compliance')) {
    return `🔒 **Security & Compliance Insights**: High-demand service opportunity:
• 78% of your clients need enhanced cybersecurity
• Average security service adds $8K per client annually
• Compliance services (SOC 2, HIPAA) command premium pricing
• Current security revenue: $340K (15% of total)

**Opportunity**: Expand security services to capture additional $625K in annual revenue.`;
  }
  
  // Technology and automation queries
  if (lowerMessage.includes('technology') || lowerMessage.includes('automation') || lowerMessage.includes('tool') || lowerMessage.includes('software')) {
    return `🤖 **Technology & Automation Strategy**: Streamline operations:
• **Current tools**: 23 different platforms (consolidation needed)
• **Automation potential**: 40% of routine tasks can be automated
• **ROI timeline**: 6 months for automation investments
• **Priority areas**: Ticket routing, client onboarding, reporting

**Next steps**: Implement PSA integration and automated monitoring for immediate efficiency gains.`;
  }
  
  // Market and competition queries
  if (lowerMessage.includes('market') || lowerMessage.includes('competition') || lowerMessage.includes('industry') || lowerMessage.includes('benchmark')) {
    return `📈 **Market Position Analysis**: You're performing above industry averages:
• **Your retention**: 94.5% vs industry avg 89%
• **Your profit margin**: 23% vs industry avg 18%
• **Your client value**: $14.6K vs industry avg $12.3K

**Competitive advantages**: Strong retention, solid margins, growing market ($354B MSP industry). Focus on service differentiation and premium positioning.`;
  }
  
  // General business health queries
  if (lowerMessage.includes('health') || lowerMessage.includes('status') || lowerMessage.includes('overview') || lowerMessage.includes('summary')) {
    return `📊 **Business Health Score: 87/100** - Strong performance across key metrics:
✅ **Revenue**: $2.3M (12.5% growth)
✅ **Clients**: 157 active (94.5% retention)
✅ **Profitability**: 23% margin (above industry avg)
✅ **Team**: High-performing engineering dept

**Areas for improvement**: Cost optimization (5 points), service expansion (8 points). Overall trajectory is excellent!`;
  }
  
  // Default comprehensive response
  return `🎯 **MSP Intelligence Summary**: Your business shows strong fundamentals with multiple growth opportunities:

**Current Performance**:
• $2.3M revenue with 157 clients
• 94.5% retention rate (industry-leading)
• 23% profit margin (above average)
• $14.6K average client value

**Top Opportunities**:
1. **Revenue Growth**: Upsell security services (+$533K potential)
2. **Cost Optimization**: Consolidate tools and automate processes (-$176K costs)
3. **Market Expansion**: Target mid-market clients (+$500K opportunity)
4. **Service Enhancement**: Add compliance and cloud services

**Immediate Actions**: Focus on your top 20% clients for upselling and implement cost optimization initiatives. Your strong retention rate provides a solid foundation for aggressive growth.`;
};

import { generateAIResponse } from './bedrockService';

export const sendChatMessage = async (message: string): Promise<string> => {
  try {
    // Try AWS Bedrock first
    return await generateAIResponse(message);
  } catch (error) {
    console.log('Bedrock unavailable, using enhanced contextual responses');
    // Fallback to intelligent contextual responses
    return generateContextualResponse(message);
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