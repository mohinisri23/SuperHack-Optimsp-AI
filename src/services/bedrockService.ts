import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const createClient = () => {
  const credentials: any = {
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
    const prompt = `You are an AI assistant for MSP business analytics. Answer this question about business metrics: ${message}`;
    
    const command = new InvokeModelCommand({
      modelId: "anthropic.claude-3-haiku-20240307-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 300,
        messages: [{
          role: "user",
          content: prompt
        }]
      }),
    });

    const response = await client.send(command);
    console.log('✅ AWS Bedrock response received');
    const result = JSON.parse(new TextDecoder().decode(response.body));
    return result.content[0].text;
  } catch (error) {
    console.error('❌ Bedrock error:', error);
    if (error.name === 'ExpiredTokenException') {
      return "⚠️ AWS credentials expired. Please refresh your session tokens from the SuperOps parent account.";
    }
    throw error;
  }
};