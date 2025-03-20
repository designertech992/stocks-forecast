import OpenAI from 'openai';

// Импортируем мок-функцию для тестирования
import { generateForecast as mockGenerateForecast } from './openai.mock';

// Определяем, нужно ли использовать мок-данные
const useMockData = process.env.USE_MOCK_DATA === 'true';

// Функция для ленивой инициализации клиента OpenAI
const getOpenAIClient = () => {
  if (useMockData) {
    return null;
  }
  
  try {
    return new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-initialization',
    });
  } catch (error) {
    console.error('Error initializing OpenAI client:', error);
    return null;
  }
};

export interface AssetData {
  symbol: string;
  name: string;
  currentPrice: number;
  historicalPrices?: { date: string; price: number }[];
}

export interface ForecastResult {
  predictedPrices: { date: string; price: number }[];
  explanation: string;
  confidence: number;
  factorsConsidered: string[];
}

export async function generateForecast(asset: AssetData, timeframe: string): Promise<ForecastResult> {
  // Если активирован режим тестирования, используем мок-функцию
  if (useMockData) {
    console.log('[MOCK MODE] Using mock forecast generator');
    return mockGenerateForecast(asset, timeframe);
  }
  
  // Получаем клиент OpenAI только при необходимости
  const openai = getOpenAIClient();
  
  // Проверяем наличие клиента OpenAI
  if (!openai) {
    throw new Error('OpenAI client is not initialized. Make sure OPENAI_API_KEY is set when USE_MOCK_DATA is false.');
  }
  
  try {
    const prompt = `
      You are a financial analysis AI specializing in stock market forecasting.
      
      Asset: ${asset.name} (${asset.symbol})
      Current Price: $${asset.currentPrice}
      Timeframe for forecast: ${timeframe}
      
      Historical price data: ${JSON.stringify(asset.historicalPrices || [])}
      
      Please provide:
      1. A realistic forecast of future prices based on available data
      2. A detailed explanation of the factors that influenced your forecast
      3. A confidence level in your prediction (between 0-100%)
      4. The key factors considered in your analysis
      
      Format the response as a valid JSON object with the following properties:
      - predictedPrices: array of { date: string, price: number }
      - explanation: string
      - confidence: number
      - factorsConsidered: array of strings
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a financial analysis AI specializing in stock market forecasting.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.5,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response content from OpenAI');
    }

    // Extract the JSON object from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON response from OpenAI');
    }

    return JSON.parse(jsonMatch[0]) as ForecastResult;
  } catch (error) {
    console.error('Error generating forecast:', error);
    throw error;
  }
} 