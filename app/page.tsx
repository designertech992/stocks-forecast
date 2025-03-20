import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/header';
import { StockChart } from '@/components/StockChart';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8 sm:gap-12">
            <div className="w-full md:w-1/2 max-w-xl sm:max-w-2xl md:max-w-none space-y-4 sm:space-y-6 md:space-y-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900">
                Predict stock movements with <span className="text-zinc-900">AI precision</span>
              </h1>
              <p className="text-zinc-500 text-lg sm:text-xl md:text-xl mx-auto md:mx-0">
                Our AI-powered platform helps you forecast asset price movements with detailed analysis and explanations.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
                <Button asChild className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-md font-medium">
                  <Link href="/auth/signup">Start Free Trial</Link>
                </Button>
                <Button asChild variant="outline" className="border-zinc-300 hover:bg-zinc-100 text-zinc-800 px-5 sm:px-6 py-2.5 sm:py-3 rounded-md font-medium">
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="w-full md:w-2/5 max-w-sm sm:max-w-md md:max-w-lg mx-auto md:mx-0">
              <Card className="overflow-hidden border border-zinc-200 rounded-xl shadow-sm">
                <CardHeader className="bg-zinc-50 border-b border-zinc-100 p-3 sm:p-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xs sm:text-sm font-medium text-zinc-800">Tesla Inc. (TSLA) Forecast</CardTitle>
                    <Badge className="bg-zinc-900 hover:bg-zinc-900 text-white text-xs px-2 py-0.5 sm:py-1 rounded-full">AI Generated</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="rounded-lg mb-4 sm:mb-6 bg-zinc-50">
                    <StockChart height={180} />
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <p className="text-xs sm:text-sm text-zinc-500 mb-1">Current Price</p>
                        <p className="text-base sm:text-lg font-medium text-zinc-900">$172.63</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-zinc-500 mb-1">Forecast (7 days)</p>
                        <p className="text-base sm:text-lg font-medium text-green-600">$184.22 (+6.71%)</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-zinc-500 mb-1 sm:mb-2">Confidence</p>
                      <div className="flex items-center">
                        <div className="flex-grow h-1.5 sm:h-2 bg-zinc-200 rounded-full overflow-hidden">
                          <div className="h-full bg-zinc-900 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                        <span className="ml-2 text-xs sm:text-sm font-medium text-zinc-800">78%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 md:mb-16">
            <Badge className="mb-2 bg-zinc-900 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-md font-medium">Features</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">Powerful AI Tools for Stock Analysis</h2>
            <p className="mx-auto max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl text-zinc-500 text-base sm:text-lg mt-2 sm:mt-4">
              Our platform combines advanced AI technologies with financial data 
              to provide you with accurate and explainable forecasts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto">
            <div className="bg-white p-4 sm:p-6 rounded-lg border border-zinc-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-3 sm:mb-4 text-zinc-800">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-medium mb-1 sm:mb-2 text-zinc-900">AI-Powered Forecasting</h3>
              <p className="text-sm sm:text-base text-zinc-500">
                Leverage the power of advanced AI models to predict stock price movements with high accuracy.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg border border-zinc-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-3 sm:mb-4 text-zinc-800">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-medium mb-1 sm:mb-2 text-zinc-900">Custom Time Frames</h3>
              <p className="text-sm sm:text-base text-zinc-500">
                Choose your preferred time horizon for predictions, from short-term daily forecasts to long-term projections.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg border border-zinc-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-3 sm:mb-4 text-zinc-800">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-medium mb-1 sm:mb-2 text-zinc-900">Detailed Explanations</h3>
              <p className="text-sm sm:text-base text-zinc-500">
                Understand the reasoning behind each forecast with detailed explanations and factors considered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 sm:py-14 md:py-16 lg:py-20 bg-zinc-900 text-white">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center space-y-4 sm:space-y-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Ready to predict stock movements?</h2>
          <p className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl text-zinc-300 text-base sm:text-lg md:text-xl">
            Join thousands of investors who use StocksForecast AI to make more informed investment decisions.
          </p>
          <Button asChild className="bg-white hover:bg-zinc-100 text-zinc-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-medium mt-2 sm:mt-4">
            <Link href="/auth/signup">Start Free Trial</Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 