import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: "us-east-2",
  credentials: {
    accessKeyId: "ASIAYD5QVP553FOFWSCP",
    secretAccessKey: "e4BKNtBXcMlk5IzisuUG18CTtO3cosTBQbvjR1LO",
    sessionToken: "IQoJb3JpZ2luX2VjEJ7//////////wEaCXVzLWVhc3QtMiJIMEYCIQDazk7Xu73ud5Hugsf1VSVsggGmRWMX8wvXEnwvUhklSQIhAIkmW2z5F77/DD/sY8pabOYTev+4/nJL7lr6JxyLUItoKqEDCFcQABoMNTU4MTc5Mzg1MjExIgysKuHj/Pmv7TaKWtoq/gLPu14ioBVhUuFHNZUQylkyJjgEMx3gceCkdgn9oUkDAlV5sQjUiITB6yn2+x2EPysyy9/cB8iJrH13MtbHbfC7IUsTj2B2DeCdj4OLsgeufTJ0ITkLqsW7B3sJiA/5J1IQTg1A6gKOJwa0Pq5ZYI+6fLk2QrcQ9E/j+zTkNvbNdFiOPV6FAsglHzhro/0SxJzXFK5I++BDS3JNda1YoY3K11ivjlL3M4OmrW0RwH0prUazc+49gynJ+heMglnQ1xNC7cNHPG7mX+GVQdw59vfWzZelyF3NThqeSwwpe4eFqLiW/zBUOByV4pHfOe1EdvKugrLDBqPoF25v69XYJnI4ali2wPqR3ffWiknw7LdcSIZt90uairfuMbv2fkVMLPBcIGh8Nj9/hzLetLaKp/RIVsITCxgSYDy3SLpjcRmSakuGpwN+7PNHQVnW5DcjH/EE3bEqBQDaSgzMW2uzrG0+r7NUu65W3zdVWaWsNtTN+Kx4RGkw/W7ym1AGtPOwMKem7McGOqUB1HTVmqrE9v/AhzxJ+w11I2xhEtgGEppSkZ6pPOk7CZwt3/5TovZS7hPxLEQ3EQuYQ2RF34L49T0pmzxF5pQjZg3mmK6cZx6qGVC75zy6lhwWcpdHrzjTJ6pYsAdAFsq+0L42oBKZl36kj3VlfruB2LFT/F0b7pS5kQKJ8N4V80im5r2uf+mqMIqMAATLg5HZbX8BMlj/dPuJfOni0Qi33Fd2Dl9z",
  },
});

export const generateAIResponse = async (message: string): Promise<string> => {
  try {
    console.log('🚀 Calling AWS Bedrock with message:', message);
    
    const prompt = `You are an AI assistant for MSP business analytics. Answer this question about business metrics: ${message}`;
    
    const command = new InvokeModelCommand({
      modelId: "amazon.titan-text-express-v1",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        inputText: prompt,
        textGenerationConfig: {
          maxTokenCount: 300,
          temperature: 0.7
        }
      }),
    });

    const response = await client.send(command);
    console.log('✅ AWS Bedrock response received');
    const result = JSON.parse(new TextDecoder().decode(response.body));
    return result.results[0].outputText;
  } catch (error) {
    console.error('❌ Bedrock error:', error);
    throw error;
  }
};