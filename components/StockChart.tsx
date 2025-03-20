'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Регистрируем компоненты Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export interface StockChartProps {
  historicalData?: { date: string; price: number }[];
  predictedData?: { date: string; price: number }[];
  height?: number;
}

export function StockChart({ 
  historicalData = [], 
  predictedData = [], 
  height = 250 
}: StockChartProps) {
  // Готовим данные для графика
  const labels = [
    ...historicalData.map(item => item.date),
    ...predictedData.map(item => item.date)
  ];

  const historicalValues = historicalData.map(item => item.price);
  const predictedValues = Array(historicalData.length).fill(null).concat(
    predictedData.map(item => item.price)
  );

  // Если нет данных, показываем демо данные
  const useDemoData = historicalData.length === 0 && predictedData.length === 0;
  
  const demoLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const demoHistorical = [165, 170, 168, 172, 177, 175, 172];
  const demoPredicted = [null, null, null, null, null, 175, 184];

  const data = {
    labels: useDemoData ? demoLabels : labels,
    datasets: [
      {
        label: 'Historical',
        data: useDemoData ? demoHistorical : historicalValues,
        borderColor: 'hsl(var(--chart-2))',
        backgroundColor: 'transparent',
        pointBackgroundColor: 'hsl(var(--chart-2))',
        tension: 0.2,
      },
      {
        label: 'Predicted',
        data: useDemoData ? demoPredicted : predictedValues,
        borderColor: 'hsl(var(--chart-1))',
        backgroundColor: 'rgba(var(--chart-1), 0.1)',
        pointBackgroundColor: 'hsl(var(--chart-1))',
        borderDash: [5, 5],
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value: any) {
            return '$' + value;
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      point: {
        radius: 2,
        hoverRadius: 4,
      },
    },
  };

  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <Line data={data} options={options as any} />
    </div>
  );
} 