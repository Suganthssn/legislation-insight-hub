import React from 'react';
import { Card } from "@/components/ui/card";

interface SentimentThermometerProps {
  positivePercent: number;
  negativePercent: number;
  neutralPercent: number;
}

export const SentimentThermometer: React.FC<SentimentThermometerProps> = ({
  positivePercent,
  negativePercent,
  neutralPercent
}) => {
  // Calculate overall sentiment score (positive bias)
  const sentimentScore = (positivePercent - negativePercent + 100) / 2;
  
  return (
    <Card className="glass-card p-6 hover-glow">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Overall Sentiment 🌡️
          </h3>
          <p className="text-sm text-muted-foreground">
            Community temperature reading
          </p>
        </div>
        
        <div className="relative w-16 h-64 mx-auto">
          {/* Thermometer body */}
          <div className="absolute inset-x-0 top-4 bottom-8 bg-secondary/30 rounded-full border border-border">
            {/* Temperature fill */}
            <div 
              className="absolute bottom-0 inset-x-0 rounded-full transition-all duration-1000 ease-out"
              style={{
                height: `${sentimentScore}%`,
                background: sentimentScore > 70 
                  ? 'linear-gradient(to top, hsl(var(--sentiment-positive)), hsl(var(--sentiment-positive-glow)))'
                  : sentimentScore > 40
                  ? 'linear-gradient(to top, hsl(var(--sentiment-neutral)), hsl(var(--sentiment-neutral-glow)))'
                  : 'linear-gradient(to top, hsl(var(--sentiment-negative)), hsl(var(--sentiment-negative-glow)))'
              }}
            />
          </div>
          
          {/* Thermometer bulb */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border border-border"
               style={{
                 background: sentimentScore > 70 
                   ? 'radial-gradient(circle, hsl(var(--sentiment-positive)), hsl(var(--sentiment-positive-glow)))'
                   : sentimentScore > 40
                   ? 'radial-gradient(circle, hsl(var(--sentiment-neutral)), hsl(var(--sentiment-neutral-glow)))'
                   : 'radial-gradient(circle, hsl(var(--sentiment-negative)), hsl(var(--sentiment-negative-glow)))'
               }}
          />
          
          {/* Temperature markings */}
          <div className="absolute right-6 top-4 text-xs text-muted-foreground space-y-12">
            <div>Hot 🔥</div>
            <div>Warm ☀️</div>
            <div>Cool ❄️</div>
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold" 
               style={{
                 color: sentimentScore > 70 
                   ? 'hsl(var(--sentiment-positive))'
                   : sentimentScore > 40
                   ? 'hsl(var(--sentiment-neutral))'
                   : 'hsl(var(--sentiment-negative))'
               }}>
            {Math.round(sentimentScore)}°
          </div>
          <div className="text-sm text-muted-foreground">
            {sentimentScore > 70 ? 'Positive Climate' : sentimentScore > 40 ? 'Balanced Views' : 'Critical Feedback'}
          </div>
        </div>
        
        {/* Breakdown */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="w-3 h-3 rounded-full bg-sentiment-positive mx-auto mb-1"></div>
            <div className="text-sentiment-positive font-semibold">{positivePercent}%</div>
            <div className="text-muted-foreground">Positive</div>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 rounded-full bg-sentiment-neutral mx-auto mb-1"></div>
            <div className="text-sentiment-neutral font-semibold">{neutralPercent}%</div>
            <div className="text-muted-foreground">Neutral</div>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 rounded-full bg-sentiment-negative mx-auto mb-1"></div>
            <div className="text-sentiment-negative font-semibold">{negativePercent}%</div>
            <div className="text-muted-foreground">Negative</div>
          </div>
        </div>
      </div>
    </Card>
  );
};