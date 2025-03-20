// This is a placeholder for a real financial API integration
// You can replace this with a real API like Alpha Vantage, Yahoo Finance, etc.

import { useMockData } from './config';
import { mockStockData } from './stockApi.mock';

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || '';

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
  open: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
  marketCap?: number;
  historicalPrices?: { date: string; price: number }[];
  currentPrice?: number;
}

// Simulated stock data for demonstration purposes
const mockStocks: Record<string, StockData> = {
  'AAPL': {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 175.34,
    price: 175.34,
    change: 1.25,
    changePercent: 0.72,
    previousClose: 174.09,
    open: 174.28,
    dayHigh: 176.10,
    dayLow: 173.95,
    volume: 58427000,
    marketCap: 2750000000000,
    historicalPrices: generateMockHistoricalData(175.34, 60),
  },
  'MSFT': {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    currentPrice: 405.12,
    price: 405.12,
    change: 3.45,
    changePercent: 0.91,
    previousClose: 401.67,
    open: 402.28,
    dayHigh: 406.50,
    dayLow: 401.20,
    volume: 23635000,
    marketCap: 3015000000000,
    historicalPrices: generateMockHistoricalData(405.12, 60),
  },
  'GOOGL': {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    currentPrice: 137.86,
    price: 137.86,
    change: -0.78,
    changePercent: -0.55,
    previousClose: 138.64,
    open: 138.24,
    dayHigh: 138.95,
    dayLow: 136.85,
    volume: 25789000,
    marketCap: 1780000000000,
    historicalPrices: generateMockHistoricalData(137.86, 60),
  },
  'AMZN': {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    currentPrice: 178.75,
    price: 178.75,
    change: 2.15,
    changePercent: 1.22,
    previousClose: 176.60,
    open: 176.80,
    dayHigh: 179.30,
    dayLow: 176.05,
    volume: 35428000,
    marketCap: 1850000000000,
    historicalPrices: generateMockHistoricalData(178.75, 60),
  },
  'TSLA': {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    currentPrice: 172.63,
    price: 172.63,
    change: -4.27,
    changePercent: -2.41,
    previousClose: 176.90,
    open: 176.05,
    dayHigh: 177.38,
    dayLow: 171.20,
    volume: 98752000,
    marketCap: 550000000000,
    historicalPrices: generateMockHistoricalData(172.63, 60),
  },
};

// Helper function to generate mock historical data
function generateMockHistoricalData(currentPrice: number, days: number): { date: string; price: number }[] {
  const result: { date: string; price: number }[] = [];
  const today = new Date();
  let price = currentPrice;

  for (let i = days; i > 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Add some random variation to create realistic looking price movements
    const change = (Math.random() - 0.5) * (price * 0.03); // Up to ±1.5% daily change
    price = Number((price + change).toFixed(2));
    
    result.push({
      date: date.toISOString().split('T')[0],
      price,
    });
  }

  return result;
}

// Get stock data for a specific symbol
export async function getStockData(symbol: string): Promise<StockData> {
  console.log(`Getting stock data for symbol: ${symbol}, using mock data: ${useMockData}`);
  
  // Проверяем, нужно ли использовать моковые данные
  if (useMockData || process.env.NODE_ENV === 'development') {
    console.log(`[MOCK] Fetching stock data for ${symbol}`);
    return mockStockData(symbol);
  }

  try {
    // Получаем основные данные о компании
    const quoteResponse = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    if (!quoteResponse.ok) {
      throw new Error(`Error fetching stock data: ${quoteResponse.statusText}`);
    }
    
    const quoteData = await quoteResponse.json();
    
    // Проверяем наличие данных
    if (!quoteData['Global Quote'] || !quoteData['Global Quote']['05. price']) {
      console.error('Invalid Alpha Vantage response:', quoteData);
      throw new Error('Invalid data format from Alpha Vantage');
    }
    
    // Получаем информацию о компании
    const overviewResponse = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    if (!overviewResponse.ok) {
      throw new Error(`Error fetching company overview: ${overviewResponse.statusText}`);
    }
    
    const overviewData = await overviewResponse.json();
    
    const quote = quoteData['Global Quote'];
    const price = parseFloat(quote['05. price']);
    const change = parseFloat(quote['09. change']);
    const changePercent = parseFloat(quote['10. change percent'].replace('%', ''));
    
    return {
      symbol: symbol,
      name: overviewData.Name || symbol,
      price: price,
      currentPrice: price,
      change: change,
      changePercent: changePercent,
      previousClose: parseFloat(quote['08. previous close']),
      open: parseFloat(quote['02. open']),
      dayHigh: price + (price * 0.01), // Alpha Vantage не предоставляет эти данные в Global Quote
      dayLow: price - (price * 0.01),  // Поэтому мы оцениваем их примерно
      volume: parseInt(quote['06. volume']),
      marketCap: overviewData.MarketCapitalization ? parseInt(overviewData.MarketCapitalization) : undefined,
      historicalPrices: await getHistoricalPrices(symbol)
    };
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    
    // Если произошла ошибка при запросе к реальному API, используем моковые данные
    console.log(`[FALLBACK] Using mock data for ${symbol} due to API error`);
    return mockStockData(symbol);
  }
}

// Получение исторических цен акции
async function getHistoricalPrices(symbol: string, days: number = 30): Promise<{ date: string; price: number }[]> {
  if (useMockData || process.env.NODE_ENV === 'development') {
    // Генерируем моковые исторические данные
    const mockPrices = [];
    const basePrice = 100 + Math.random() * 100;
    const today = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      // Добавляем случайную волатильность
      const changePercent = (Math.random() - 0.48) * 2;
      const price = basePrice * (1 + (changePercent / 100) * i);
      
      mockPrices.push({
        date: date.toISOString().split('T')[0],
        price: parseFloat(price.toFixed(2))
      });
    }
    
    return mockPrices;
  }

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Error fetching historical data: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data['Time Series (Daily)']) {
      throw new Error('Invalid historical data format from Alpha Vantage');
    }
    
    const timeSeries = data['Time Series (Daily)'];
    const historicalPrices = Object.entries(timeSeries)
      .map(([date, values]: [string, any]) => ({
        date,
        price: parseFloat(values['4. close'])
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-days);
    
    return historicalPrices;
  } catch (error) {
    console.error(`Error fetching historical prices for ${symbol}:`, error);
    // В случае ошибки возвращаем пустой массив
    return [];
  }
}

// Search for stocks by name or symbol
export async function searchStocks(query: string): Promise<{ symbol: string; name: string }[]> {
  if (useMockData) {
    // Моковые результаты поиска
    return [
      { symbol: 'AAPL', name: 'Apple Inc.' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.' },
      { symbol: 'MSFT', name: 'Microsoft Corporation' },
      { symbol: 'TSLA', name: 'Tesla, Inc.' }
    ].filter(item => 
      item.symbol.toLowerCase().includes(query.toLowerCase()) || 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Error searching stocks: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.bestMatches) {
      return [];
    }
    
    return data.bestMatches.map((match: any) => ({
      symbol: match['1. symbol'],
      name: match['2. name']
    }));
  } catch (error) {
    console.error('Error searching stocks:', error);
    return [];
  }
}

// Get multiple stocks data
export async function getMultipleStockData(symbols: string[]): Promise<StockData[]> {
  // Simulate API call with a small delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return symbols
    .map(symbol => mockStocks[symbol.toUpperCase()])
    .filter((stock): stock is StockData => !!stock);
} 