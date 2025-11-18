import { ComprehendClient, DetectSentimentCommand } from "@aws-sdk/client-comprehend";

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
  
  return new ComprehendClient({
    region: import.meta.env.VITE_AWS_REGION || "us-east-2",
    credentials,
  });
};

export const analyzeSentiment = async (text: string) => {
  try {
    console.log('📊 Calling AWS Comprehend for sentiment analysis:', text);
    
    const client = createClient();
    const command = new DetectSentimentCommand({
      Text: text,
      LanguageCode: "en",
    });

    const response = await client.send(command);
    console.log('✅ AWS Comprehend response received:', response.Sentiment);
    
    return {
      sentiment: response.Sentiment,
      confidence: response.SentimentScore
    };
  } catch (error) {
    console.error('❌ Comprehend error:', error);
    // Fallback to mock sentiment
    return {
      sentiment: 'POSITIVE',
      confidence: { Positive: 0.85, Negative: 0.10, Neutral: 0.05, Mixed: 0.00 }
    };
  }
};

export const getClientFeedbackAnalysis = async () => {
  try {
    const mockFeedback = [
      "Great service, very responsive team",
      "Issues with server downtime last week",
      "Excellent support, resolved quickly"
    ];

    const results = await Promise.all(
      mockFeedback.map(feedback => analyzeSentiment(feedback))
    );

    return {
      positive: results.filter(r => r.sentiment === 'POSITIVE').length,
      negative: results.filter(r => r.sentiment === 'NEGATIVE').length,
      neutral: results.filter(r => r.sentiment === 'NEUTRAL').length,
      overall: results.reduce((acc, r) => acc + (r.confidence?.Positive || 0), 0) / results.length
    };
  } catch (error) {
    // Fallback analysis
    return {
      positive: 2,
      negative: 1,
      neutral: 0,
      overall: 0.78
    };
  }
};