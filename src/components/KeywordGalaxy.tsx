import React, { useState } from 'react';
import { Card } from "@/components/ui/card";

interface Keyword {
  text: string;
  frequency: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  x: number;
  y: number;
}

interface KeywordGalaxyProps {
  keywords: Keyword[];
  onKeywordClick: (keyword: string) => void;
}

export const KeywordGalaxy: React.FC<KeywordGalaxyProps> = ({ keywords, onKeywordClick }) => {
  const [hoveredKeyword, setHoveredKeyword] = useState<string | null>(null);
  
  const maxFrequency = Math.max(...keywords.map(k => k.frequency));
  
  const getStarSize = (frequency: number) => {
    const baseSize = 8;
    const scaleFactor = (frequency / maxFrequency) * 20;
    return baseSize + scaleFactor;
  };
  
  const getStarColor = (sentiment: string, isHovered: boolean) => {
    const opacity = isHovered ? 1 : 0.8;
    switch (sentiment) {
      case 'positive':
        return `hsl(var(--sentiment-positive) / ${opacity})`;
      case 'negative':
        return `hsl(var(--sentiment-negative) / ${opacity})`;
      default:
        return `hsl(var(--sentiment-neutral) / ${opacity})`;
    }
  };
  
  return (
    <Card className="glass-card p-6 hover-glow">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Keyword Galaxy 🌌
          </h3>
          <p className="text-sm text-muted-foreground">
            Click stars to explore related feedback
          </p>
        </div>
        
        <div className="relative w-full h-80 bg-gradient-to-br from-background/50 to-secondary/20 rounded-lg border border-border overflow-hidden">
          {/* Background stars */}
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={`bg-star-${i}`}
                className="absolute w-1 h-1 bg-star-dim rounded-full star-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          {/* Keyword stars */}
          <div className="relative w-full h-full">
            {keywords.map((keyword, index) => (
              <div
                key={keyword.text}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${keyword.x}%`,
                  top: `${keyword.y}%`,
                }}
                onClick={() => onKeywordClick(keyword.text)}
                onMouseEnter={() => setHoveredKeyword(keyword.text)}
                onMouseLeave={() => setHoveredKeyword(null)}
              >
                {/* Star glow effect */}
                <div
                  className="absolute inset-0 rounded-full blur-sm transition-all duration-300"
                  style={{
                    width: `${getStarSize(keyword.frequency) + 10}px`,
                    height: `${getStarSize(keyword.frequency) + 10}px`,
                    backgroundColor: getStarColor(keyword.sentiment, false),
                    transform: 'translate(-50%, -50%)',
                    opacity: hoveredKeyword === keyword.text ? 0.6 : 0.3,
                  }}
                />
                
                {/* Star */}
                <div
                  className="relative rounded-full transition-all duration-300 hover:scale-125"
                  style={{
                    width: `${getStarSize(keyword.frequency)}px`,
                    height: `${getStarSize(keyword.frequency)}px`,
                    backgroundColor: getStarColor(keyword.sentiment, hoveredKeyword === keyword.text),
                    boxShadow: hoveredKeyword === keyword.text 
                      ? `0 0 15px ${getStarColor(keyword.sentiment, true)}`
                      : 'none'
                  }}
                />
                
                {/* Keyword label */}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                  hoveredKeyword === keyword.text ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{
                  backgroundColor: 'hsl(var(--background) / 0.9)',
                  border: `1px solid ${getStarColor(keyword.sentiment, true)}`,
                  color: getStarColor(keyword.sentiment, true)
                }}>
                  {keyword.text}
                  <div className="text-xs text-muted-foreground">{keyword.frequency} mentions</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Constellation lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {keywords.slice(0, 5).map((keyword, i) => {
              const nextKeyword = keywords[i + 1];
              if (!nextKeyword) return null;
              
              return (
                <line
                  key={`line-${i}`}
                  x1={`${keyword.x}%`}
                  y1={`${keyword.y}%`}
                  x2={`${nextKeyword.x}%`}
                  y2={`${nextKeyword.y}%`}
                  stroke="hsl(var(--primary) / 0.2)"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                  className="animate-pulse"
                />
              );
            })}
          </svg>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-sentiment-positive"></div>
            <span className="text-sentiment-positive">Positive themes</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-sentiment-neutral"></div>
            <span className="text-sentiment-neutral">Neutral topics</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-sentiment-negative"></div>
            <span className="text-sentiment-negative">Critical areas</span>
          </div>
        </div>
      </div>
    </Card>
  );
};