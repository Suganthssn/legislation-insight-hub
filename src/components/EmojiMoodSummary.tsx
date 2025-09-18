import React, { useState } from 'react';
import { Card } from "@/components/ui/card";

interface MoodData {
  emoji: string;
  label: string;
  count: number;
  percentage: number;
  color: string;
  examples: string[];
}

interface EmojiMoodSummaryProps {
  moods: MoodData[];
  totalComments: number;
}

export const EmojiMoodSummary: React.FC<EmojiMoodSummaryProps> = ({
  moods,
  totalComments
}) => {
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);

  return (
    <Card className="glass-card p-6 hover-glow">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Emotional Pulse 💭
          </h3>
          <p className="text-sm text-muted-foreground">
            Community mood at a glance
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {moods.map((mood) => (
            <div
              key={mood.label}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredMood(mood.label)}
              onMouseLeave={() => setHoveredMood(null)}
            >
              <div className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${
                hoveredMood === mood.label ? 'ring-2 ring-primary/50' : ''
              }`}
              style={{
                backgroundColor: `${mood.color}20`,
                borderColor: `${mood.color}40`
              }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl animate-bounce" style={{ animationDelay: `${Math.random() * 2}s` }}>
                    {mood.emoji}
                  </span>
                  <span className="text-lg font-bold" style={{ color: mood.color }}>
                    {mood.percentage}%
                  </span>
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm">{mood.label}</h4>
                  <div className="text-xs text-muted-foreground">
                    {mood.count} comments
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2 w-full bg-background/50 rounded-full h-1">
                  <div
                    className="h-1 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${mood.percentage}%`,
                      backgroundColor: mood.color
                    }}
                  />
                </div>

                {/* Hover tooltip with examples */}
                {hoveredMood === mood.label && (
                  <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-background/95 backdrop-blur-md border rounded-lg shadow-lg z-10 animate-fade-in">
                    <div className="text-xs font-medium mb-1">Example phrases:</div>
                    <div className="space-y-1">
                      {mood.examples.slice(0, 2).map((example, i) => (
                        <div key={i} className="text-xs text-muted-foreground italic">
                          "{example}"
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Overall mood indicator */}
        <div className="text-center pt-4 border-t border-border">
          <div className="flex justify-center items-center space-x-2">
            <span className="text-sm text-muted-foreground">Community vibe:</span>
            <div className="flex space-x-1">
              {moods.slice(0, 3).map((mood) => (
                <span key={mood.label} className="text-lg">
                  {mood.emoji}
                </span>
              ))}
            </div>
            <span className="text-sm font-medium text-primary">
              {moods[0]?.label} energy
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};