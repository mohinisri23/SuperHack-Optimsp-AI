import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
}

const createClient = () => {
  const credentials: AWSCredentials = {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  };
  
  if (import.meta.env.VITE_AWS_SESSION_TOKEN) {
    credentials.sessionToken = import.meta.env.VITE_AWS_SESSION_TOKEN;
  }
  
  return new BedrockRuntimeClient({
    region: import.meta.env.VITE_AWS_REGION || "us-east-2",
    credentials,
  });
};

export const generateAIResponse = async (message: string): Promise<string> => {
  try {
    console.log('🚀 Calling AWS Bedrock with message:', message);
    
    const client = createClient();
    
    // Enhanced MSP-specific prompt with business context
    const prompt = `You are an expert AI consultant for Managed Service Providers (MSPs). 

Business Context:
- Current Revenue: $2.3M annually
- Active Clients: 157
- Client Retention Rate: 94.5%
- Profit Margin: 23%
- Average Client Value: $14.6K
- Services: Managed IT, Cloud Services, Security, Backup & Recovery
- Team Departments: Engineering, Sales, Support, Operations

User Question: ${message}

Provide actionable, data-driven insights specific to MSP business operations. Include specific numbers, recommendations, and next steps where relevant. Format your response with clear sections and bullet points for readability.`;
    
    const command = new InvokeModelCommand({
      modelId: "amazon.titan-text-lite-v1",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        inputText: prompt,
        textGenerationConfig: {
          maxTokenCount: 500,
          temperature: 0.3,
          topP: 0.9
        }
      }),
    });

    const response = await client.send(command);
    console.log('✅ AWS Bedrock response received');
    const result = JSON.parse(new TextDecoder().decode(response.body));
    return result.results[0].outputText.trim();
  } catch (error) {
    console.error('❌ Bedrock error:', error);
    if (error.name === 'ExpiredTokenException') {
      throw new Error("⚠️ AWS credentials expired. Please refresh your session tokens.");
    }
    if (error.name === 'ValidationException') {
      throw new Error("⚠️ Bedrock model not available. Using fallback responses.");
    }
    throw error;
  }
};