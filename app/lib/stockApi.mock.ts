// Моковые данные для тестирования API акций
import { StockData } from './stockApi';

// Базовые моковые данные для популярных акций
export const mockStocksData: Record<string, StockData> = {
  'AAPL': {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 175.34,
    change: 1.25,
    changePercent: 0.72,
    previousClose: 174.09,
    open: 174.28,
    dayHigh: 176.10,
    dayLow: 173.95,
    volume: 58427000,
    marketCap: 2750000000000
  },
  'MSFT': {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 384.21,
    change: 3.45,
    changePercent: 0.91,
    previousClose: 380.76,
    open: 381.20,
    dayHigh: 385.50,
    dayLow: 380.18,
    volume: 22635000,
    marketCap: 2850000000000
  },
  'GOOGL': {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 141.50,
    change: -0.78,
    changePercent: -0.55,
    previousClose: 142.28,
    open: 142.30,
    dayHigh: 142.95,
    dayLow: 140.85,
    volume: 25789000,
    marketCap: 1780000000000
  },
  'AMZN': {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 178.25,
    change: 2.15,
    changePercent: 1.22,
    previousClose: 176.10,
    open: 176.80,
    dayHigh: 179.30,
    dayLow: 176.05,
    volume: 35428000,
    marketCap: 1850000000000
  },
  'TSLA': {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 172.63,
    change: -4.27,
    changePercent: -2.41,
    previousClose: 176.90,
    open: 176.05,
    dayHigh: 177.38,
    dayLow: 171.20,
    volume: 98752000,
    marketCap: 550000000000
  }
};

// Функция для получения моковых данных по символу
export function mockStockData(symbol: string): StockData {
  const stock = mockStocksData[symbol.toUpperCase()];
  
  // Если акция найдена в моковых данных, возвращаем ее
  if (stock) {
    return {
      ...stock,
      // Ensure currentPrice matches price for consistency
      currentPrice: stock.price,
      // Генерируем случайные исторические данные
      historicalPrices: generateMockHistoricalPrices(stock.price)
    };
  }
  
  // Если акция не найдена, создаем случайные данные
  const price = 100 + Math.random() * 200;
  const change = (Math.random() - 0.4) * 5;
  const changePercent = (change / price) * 100;
  
  return {
    symbol: symbol.toUpperCase(),
    name: `${symbol.toUpperCase()} Corporation`,
    price: parseFloat(price.toFixed(2)),
    currentPrice: parseFloat(price.toFixed(2)), // Ensure currentPrice matches price
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat(changePercent.toFixed(2)),
    previousClose: parseFloat((price - change).toFixed(2)),
    open: parseFloat((price - change/2).toFixed(2)),
    dayHigh: parseFloat((price + price * 0.01).toFixed(2)),
    dayLow: parseFloat((price - price * 0.01).toFixed(2)),
    volume: Math.floor(Math.random() * 10000000) + 1000000,
    marketCap: Math.floor(Math.random() * 500000000000) + 10000000000,
    historicalPrices: generateMockHistoricalPrices(price)
  };
}

// Генерация моковых исторических данных
function generateMockHistoricalPrices(currentPrice: number, days: number = 30): { date: string; price: number }[] {
  const mockPrices = [];
  const today = new Date();
  let price = currentPrice;
  
  // Генерируем данные для каждого дня, начиная с самого раннего
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Добавляем случайные изменения цены
    const randomChange = (Math.random() - 0.48) * (currentPrice * 0.02);
    
    // Обновляем цену, но не отклоняемся слишком сильно от текущей
    if (i > 0) {
      price = price + randomChange;
      // Не позволяем цене упасть ниже 0
      price = Math.max(price, 0.01);
    } else {
      // В последний день (сегодня) устанавливаем текущую цену
      price = currentPrice;
    }
    
    mockPrices.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(2))
    });
  }
  
  return mockPrices;
} 