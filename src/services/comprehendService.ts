import { ComprehendClient, DetectSentimentCommand } from "@aws-sdk/client-comprehend";

const client = new ComprehendClient({
  region: "us-east-2",
  credentials: {
    accessKeyId: "ASIAYD5QVP553FOFWSCP",
    secretAccessKey: "e4BKNtBXcMlk5IzisuUG18CTtO3cosTBQbvjR1LO",
    sessionToken: "IQoJb3JpZ2luX2VjEJ7//////////wEaCXVzLWVhc3QtMiJIMEYCIQDazk7Xu73ud5Hugsf1VSVsggGmRWMX8wvXEnwvUhklSQIhAIkmW2z5F77/DD/sY8pabOYTev+4/nJL7lr6JxyLUItoKqEDCFcQABoMNTU4MTc5Mzg1MjExIgysKuHj/Pmv7TaKWtoq/gLPu14ioBVhUuFHNZUQylkyJjgEMx3gceCkdgn9oUkDAlV5sQjUiITB6yn2+x2EPysyy9/cB8iJrH13MtbHbfC7IUsTj2B2DeCdj4OLsgeufTJ0ITkLqsW7B3sJiA/5J1IQTg1A6gKOJwa0Pq5ZYI+6fLk2QrcQ9E/j+zTkNvbNdFiOPV6FAsglHzhro/0SxJzXFK5I++BDS3JNda1YoY3K11ivjlL3M4OmrW0RwH0prUazc+49gynJ+heMglnQ1xNC7cNHPG7mX+GVQdw59vfWzZelyF3NThqeSwwpe4eFqLiW/zBUOByV4pHfOe1EdvKugrLDBqPoF25v69XYJnI4ali2wPqR3ffWiknw7LdcSIZt90uairfuMbv2fkVMLPBcIGh8Nj9/hzLetLaKp/RIVsITCxgSYDy3SLpjcRmSakuGpwN+7PNHQVnW5DcjH/EE3bEqBQDaSgzMW2uzrG0+r7NUu65W3zdVWaWsNtTN+Kx4RGkw/W7ym1AGtPOwMKem7McGOqUB1HTVmqrE9v/AhzxJ+w11I2xhEtgGEppSkZ6pPOk7CZwt3/5TovZS7hPxLEQ3EQuYQ2RF34L49T0pmzxF5pQjZg3mmK6cZx6qGVC75zy6lhwWcpdHrzjTJ6pYsAdAFsq+0L42oBKZl36kj3VlfruB2LFT/F0b7pS5kQKJ8N4V80im5r2uf+mqMIqMAATLg5HZbX8BMlj/dPuJfOni0Qi33Fd2Dl9z",
  },
});

export const analyzeSentiment = async (text: string) => {
  console.log('📊 Calling AWS Comprehend for sentiment analysis:', text);
  
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
};

export const getClientFeedbackAnalysis = async () => {
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
};