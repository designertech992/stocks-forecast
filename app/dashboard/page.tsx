'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-2 md:p-0">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your StocksForecast AI dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Predictions</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M7 12l3-3 3 3 4-4" />
              <path d="M8 21l4-4 4 4" />
              <path d="M4 4h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Predictions</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              +1 from last week
            </p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Confidence</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <polyline points="16 11 18 13 22 9" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72.5%</div>
            <p className="text-xs text-muted-foreground">
              +4.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">63%</div>
            <p className="text-xs text-muted-foreground">
              +7% from last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle>Recent Predictions</CardTitle>
            <CardDescription>
              Your most recent stock price forecasts.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0 divide-y divide-border">
              {[
                { symbol: "AAPL", name: "Apple Inc.", change: "+3.5%", confidence: 78, date: "2023-11-10" },
                { symbol: "MSFT", name: "Microsoft Corp.", change: "+2.1%", confidence: 71, date: "2023-11-09" },
                { symbol: "AMZN", name: "Amazon.com Inc.", change: "-1.2%", confidence: 65, date: "2023-11-08" },
              ].map((item) => (
                <div className="flex items-center p-4" key={item.symbol}>
                  <div className="mr-4 rounded-full bg-primary/10 p-2 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M7 12l3-3 3 3 4-4" />
                      <path d="M8 21l4-4 4 4" />
                      <path d="M4 4h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4z" />
                    </svg>
                  </div>
                  <div className="w-full space-y-1">
                    <div className="flex items-center">
                      <p className="text-sm font-medium leading-none flex-1">
                        {item.symbol} - {item.name}
                      </p>
                      <div className={`text-sm ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'} font-medium`}>
                        {item.change}
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground justify-between">
                      <span>Date: {item.date}</span>
                      <div className="flex items-center">
                        <span className="mr-1">Confidence: {item.confidence}%</span>
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              item.confidence >= 75 ? 'bg-green-500' : 
                              item.confidence >= 60 ? 'bg-primary' : 'bg-amber-500'
                            }`} 
                            style={{ width: `${item.confidence}%` }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 flex justify-end">
              <Button variant="outline" asChild size="sm">
                <Link href="/dashboard/predictions">
                  View All Predictions
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle>Favorite Assets</CardTitle>
            <CardDescription>
              Your tracked assets performance
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0 divide-y divide-border">
              {[
                { symbol: "AAPL", name: "Apple Inc.", price: "$175.04", change: "+1.25%", trending: "up" },
                { symbol: "TSLA", name: "Tesla Inc.", price: "$215.35", change: "+3.47%", trending: "up" },
                { symbol: "NVDA", name: "NVIDIA Corp.", price: "$418.76", change: "-0.86%", trending: "down" },
              ].map((asset) => (
                <div className="flex items-center justify-between p-4" key={asset.symbol}>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="font-medium">{asset.symbol}</Badge>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{asset.name}</p>
                      <p className="text-sm text-muted-foreground">{asset.price}</p>
                    </div>
                  </div>
                  <div className={`flex items-center ${asset.trending === "up" ? "text-green-600" : "text-red-600"}`}>
                    {asset.trending === "up" ? (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="mr-1 h-4 w-4"
                      >
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    ) : (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="mr-1 h-4 w-4"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    )}
                    <span>{asset.change}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 flex justify-end">
              <Button variant="outline" asChild size="sm">
                <Link href="/dashboard/assets">
                  View All Assets
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center my-10">
        <Button asChild className="px-8">
          <Link href="/dashboard/predictions/new">
            Create New Prediction
          </Link>
        </Button>
      </div>
    </div>
  );
} 