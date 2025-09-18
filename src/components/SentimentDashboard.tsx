import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SentimentData {
  sentiment: string;
  count: number;
  percentage: number;
  color: string;
}

interface TimeSeriesData {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
}

interface SentimentDashboardProps {
  sentimentData: SentimentData[];
  timeSeriesData: TimeSeriesData[];
  onFilterChange: (sentiment: string | null) => void;
}

export const SentimentDashboard: React.FC<SentimentDashboardProps> = ({
  sentimentData,
  timeSeriesData,
  onFilterChange
}) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const handleFilterClick = (sentiment: string) => {
    const newFilter = activeFilter === sentiment ? null : sentiment;
    setActiveFilter(newFilter);
    onFilterChange(newFilter);
  };
  
  const COLORS = {
    positive: 'hsl(var(--sentiment-positive))',
    negative: 'hsl(var(--sentiment-negative))',
    neutral: 'hsl(var(--sentiment-neutral))'
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value} comments
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="glass-card p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Sentiment Analysis Dashboard 🧭
          </h3>
          <p className="text-sm text-muted-foreground">
            Deep dive into community sentiment patterns
          </p>
        </div>
        
        {/* Filter buttons */}
        <div className="flex justify-center space-x-2">
          {sentimentData.map((data) => (
            <Button
              key={data.sentiment}
              variant={activeFilter === data.sentiment ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterClick(data.sentiment)}
              className={`transition-all duration-300 ${
                activeFilter === data.sentiment 
                  ? 'ring-2 ring-primary/50' 
                  : 'hover:scale-105'
              }`}
              style={{
                backgroundColor: activeFilter === data.sentiment 
                  ? data.color 
                  : 'transparent',
                borderColor: data.color,
                color: activeFilter === data.sentiment 
                  ? 'white' 
                  : data.color
              }}
            >
              {data.sentiment} ({data.count})
            </Button>
          ))}
          {activeFilter && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFilterClick('')}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear filter
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-center">Sentiment Distribution</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke={entry.color}
                        strokeWidth={activeFilter === entry.sentiment ? 3 : 1}
                        opacity={activeFilter && activeFilter !== entry.sentiment ? 0.3 : 1}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="glass-card p-3 border">
                            <p className="text-sm font-medium capitalize">{data.sentiment}</p>
                            <p className="text-sm text-muted-foreground">
                              {data.count} comments ({data.percentage}%)
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Time Series Bar Chart */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-center">Sentiment Over Time</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="positive" 
                    stackId="a" 
                    fill={COLORS.positive}
                    opacity={activeFilter && activeFilter !== 'positive' ? 0.3 : 1}
                  />
                  <Bar 
                    dataKey="neutral" 
                    stackId="a" 
                    fill={COLORS.neutral}
                    opacity={activeFilter && activeFilter !== 'neutral' ? 0.3 : 1}
                  />
                  <Bar 
                    dataKey="negative" 
                    stackId="a" 
                    fill={COLORS.negative}
                    opacity={activeFilter && activeFilter !== 'negative' ? 0.3 : 1}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {sentimentData.reduce((sum, item) => sum + item.count, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Comments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-sentiment-positive">
              {sentimentData.find(d => d.sentiment === 'positive')?.percentage}%
            </div>
            <div className="text-sm text-muted-foreground">Positive Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-sentiment-negative">
              {sentimentData.find(d => d.sentiment === 'negative')?.percentage}%
            </div>
            <div className="text-sm text-muted-foreground">Critical Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {Math.round(
                (sentimentData.find(d => d.sentiment === 'positive')?.count || 0) / 
                (sentimentData.find(d => d.sentiment === 'negative')?.count || 1) * 100
              ) / 100}:1
            </div>
            <div className="text-sm text-muted-foreground">Pos:Neg Ratio</div>
          </div>
        </div>
      </div>
    </Card>
  );
};