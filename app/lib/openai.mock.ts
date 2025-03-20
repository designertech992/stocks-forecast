import { AssetData, ForecastResult } from './openai';

// Мок-функция для генерации прогнозов без использования OpenAI API
export async function generateForecast(asset: AssetData, timeframe: string): Promise<ForecastResult> {
  console.log(`[MOCK] Generating forecast for ${asset.symbol} with timeframe ${timeframe}`);
  
  // Имитация задержки для реалистичности
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Текущая цена актива
  const currentPrice = asset.currentPrice;
  
  // Генерация прогнозируемых цен в зависимости от временного периода
  const days = timeframeToDays(timeframe);
  const predictedPrices = generatePredictedPrices(currentPrice, days);
  
  // Расчет процентного изменения
  const lastPrice = predictedPrices[predictedPrices.length - 1].price;
  const changePercent = ((lastPrice / currentPrice) - 1) * 100;
  
  // Формирование результата прогноза
  return {
    predictedPrices,
    explanation: generateExplanation(asset.symbol, changePercent > 0),
    confidence: Math.floor(65 + Math.random() * 20), // Случайный уровень уверенности от 65% до 85%
    factorsConsidered: generateFactors(asset.symbol, changePercent > 0)
  };
}

// Преобразование строки timeframe в количество дней
function timeframeToDays(timeframe: string): number {
  switch (timeframe) {
    case '1d': return 1;
    case '7d': return 7;
    case '14d': return 14;
    case '30d': return 30;
    case '90d': return 90;
    default: return 7;
  }
}

// Генерация массива прогнозируемых цен
function generatePredictedPrices(currentPrice: number, days: number): { date: string; price: number }[] {
  const result = [];
  const today = new Date();
  
  // Определяем общий тренд (рост или падение)
  const trend = Math.random() > 0.3 ? 1 : -1; // 70% шанс роста, 30% шанс падения
  const volatility = 0.01 + Math.random() * 0.02; // Случайная волатильность от 1% до 3%
  
  let price = currentPrice;
  
  for (let i = 0; i <= days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Добавляем небольшое случайное изменение к цене с учетом общего тренда
    const change = (Math.random() - 0.4) * volatility * price; // Случайное изменение с небольшим смещением в сторону тренда
    price = price + (change * trend);
    price = Math.max(price, 0.01); // Предотвращаем отрицательные или нулевые цены
    
    result.push({
      date: date.toISOString().split('T')[0],
      price: Number(price.toFixed(2))
    });
  }
  
  return result;
}

// Генерация объяснения прогноза
function generateExplanation(symbol: string, isPositive: boolean): string {
  if (isPositive) {
    return `На основе анализа исторических данных и текущих рыночных трендов, прогнозируется рост стоимости акций ${symbol}. Компания демонстрирует стабильные финансовые показатели, а недавние новости о разработке новых продуктов и расширении рынка положительно влияют на настроения инвесторов. Также наблюдается общий бычий тренд в соответствующем секторе рынка.`;
  } else {
    return `Анализ исторических данных показывает, что акции ${symbol} могут испытать некоторое снижение в указанный период. Это может быть связано с общей коррекцией рынка и недавними новостями о возможном снижении квартальной прибыли. Также наблюдается повышенная волатильность в секторе, что может привести к краткосрочным колебаниям цены.`;
  }
}

// Генерация факторов, влияющих на прогноз
function generateFactors(symbol: string, isPositive: boolean): string[] {
  const commonFactors = [
    "Исторические данные о движении цены акций",
    "Анализ рыночных трендов и сезонность",
    "Индикаторы технического анализа (RSI, MACD, EMA)"
  ];
  
  const positiveFactors = [
    `Недавние позитивные финансовые отчеты ${symbol}`,
    "Общий рост соответствующего сектора рынка",
    "Благоприятные макроэкономические показатели",
    "Увеличение институциональных инвестиций"
  ];
  
  const negativeFactors = [
    "Краткосрочная коррекция рынка",
    `Слухи о возможном снижении доходов ${symbol}`,
    "Повышенная волатильность в секторе",
    "Неблагоприятные изменения в регуляторной среде"
  ];
  
  const selectedFactors = [...commonFactors];
  
  // Добавляем 2-3 специфических фактора в зависимости от прогноза
  const specificFactors = isPositive ? positiveFactors : negativeFactors;
  const numToAdd = 2 + Math.floor(Math.random() * 2); // 2 или 3
  
  for (let i = 0; i < numToAdd; i++) {
    if (specificFactors.length > 0) {
      const index = Math.floor(Math.random() * specificFactors.length);
      selectedFactors.push(specificFactors[index]);
      specificFactors.splice(index, 1); // Удаляем добавленный фактор из списка
    }
  }
  
  return selectedFactors;
} 