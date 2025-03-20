import { ForecastResult } from './openai';
import { StockData } from './stockApi';
import { v4 as uuidv4 } from 'uuid';

export interface SavedPrediction {
  id: string;
  symbol: string;
  name: string;
  createdAt: string;
  timeframe: string;
  startPrice: number;
  currentPrice: number;
  predictedPrice: number;
  change: number;
  status: 'active' | 'completed' | 'failed';
  confidence: number;
  explanation?: string;
  factorsConsidered?: string[];
}

// Функция получения прогнозов из localStorage
export function getPredictions(): SavedPrediction[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const savedPredictions = localStorage.getItem('predictions');
  if (!savedPredictions) {
    return [];
  }
  
  try {
    return JSON.parse(savedPredictions);
  } catch (error) {
    console.error('Error parsing predictions from localStorage:', error);
    return [];
  }
}

// Функция сохранения прогноза в localStorage
export function savePrediction(
  stockData: StockData, 
  forecastResult: ForecastResult, 
  timeframe: string
): SavedPrediction {
  const predictions = getPredictions();
  
  const lastPrice = forecastResult.predictedPrices[forecastResult.predictedPrices.length - 1].price;
  const currentPrice = stockData.currentPrice ?? 0;
  const change = ((lastPrice / currentPrice) - 1) * 100;
  
  const newPrediction: SavedPrediction = {
    id: uuidv4(),
    symbol: stockData.symbol,
    name: stockData.name,
    createdAt: new Date().toISOString(),
    timeframe,
    startPrice: currentPrice,
    currentPrice: currentPrice,
    predictedPrice: lastPrice,
    change,
    status: 'active',
    confidence: forecastResult.confidence,
    explanation: forecastResult.explanation,
    factorsConsidered: forecastResult.factorsConsidered
  };
  
  const updatedPredictions = [newPrediction, ...predictions];
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('predictions', JSON.stringify(updatedPredictions));
  }
  
  return newPrediction;
}

// Функция для обновления статуса прогноза
export function updatePredictionStatus(id: string, status: 'active' | 'completed' | 'failed'): SavedPrediction | null {
  const predictions = getPredictions();
  const predictionIndex = predictions.findIndex(p => p.id === id);
  
  if (predictionIndex === -1) {
    return null;
  }
  
  const updatedPrediction = {
    ...predictions[predictionIndex],
    status
  };
  
  predictions[predictionIndex] = updatedPrediction;
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('predictions', JSON.stringify(predictions));
  }
  
  return updatedPrediction;
}

// Функция для удаления прогноза
export function deletePrediction(id: string): boolean {
  const predictions = getPredictions();
  const updatedPredictions = predictions.filter(p => p.id !== id);
  
  if (updatedPredictions.length === predictions.length) {
    return false;
  }
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('predictions', JSON.stringify(updatedPredictions));
  }
  
  return true;
}

// Функция для получения прогноза по ID
export function getPredictionById(id: string): SavedPrediction | null {
  const predictions = getPredictions();
  return predictions.find(p => p.id === id) || null;
}

// Функция для инициализации демо-данных, если прогнозов нет
export function initDemoPredictions(): void {
  const predictions = getPredictions();
  
  if (predictions.length === 0) {
    const demoPredictions: SavedPrediction[] = [
      {
        id: 'demo-1',
        symbol: 'AAPL',
        name: 'Apple Inc.',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        timeframe: '7d',
        startPrice: 175.34,
        currentPrice: 182.56,
        predictedPrice: 184.12,
        change: 5.01,
        status: 'active',
        confidence: 85,
        explanation: 'На основе анализа исторических данных и текущих рыночных трендов, прогнозируется рост стоимости акций AAPL. Компания демонстрирует стабильные финансовые показатели.',
        factorsConsidered: [
          'Исторические данные о движении цены акций',
          'Анализ рыночных трендов и сезонность',
          'Недавние позитивные финансовые отчеты AAPL'
        ]
      },
      {
        id: 'demo-2',
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        timeframe: '14d',
        startPrice: 326.78,
        currentPrice: 342.78,
        predictedPrice: 355.45,
        change: 8.77,
        status: 'active',
        confidence: 82,
        explanation: 'Анализ показывает потенциал роста акций MSFT на основании сильных фундаментальных показателей и предстоящих релизов продуктов.',
        factorsConsidered: [
          'Исторические данные о движении цены акций',
          'Анализ рыночных трендов и сезонность',
          'Недавние позитивные финансовые отчеты MSFT'
        ]
      },
      {
        id: 'demo-3',
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        timeframe: '30d',
        startPrice: 125.23,
        currentPrice: 131.98,
        predictedPrice: 128.45,
        change: -2.67,
        status: 'active',
        confidence: 75,
        explanation: 'Анализ исторических данных показывает, что акции GOOGL могут испытать некоторое снижение в указанный период.',
        factorsConsidered: [
          'Исторические данные о движении цены акций',
          'Анализ рыночных трендов и сезонность',
          'Слухи о возможном снижении доходов GOOGL'
        ]
      },
      {
        id: 'demo-4',
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        timeframe: '30d',
        startPrice: 178.35,
        currentPrice: 184.56,
        predictedPrice: 195.23,
        change: 9.46,
        status: 'completed',
        confidence: 88,
        explanation: 'Прогноз основан на сильных показателях компании и росте сектора электронной коммерции.',
        factorsConsidered: [
          'Исторические данные о движении цены акций',
          'Анализ рыночных трендов и сезонность',
          'Общий рост соответствующего сектора рынка'
        ]
      }
    ];
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('predictions', JSON.stringify(demoPredictions));
    }
  }
} 