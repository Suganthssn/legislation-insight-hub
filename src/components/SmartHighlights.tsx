import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Award, Eye, TrendingUp, ChevronRight } from 'lucide-react';

interface HighlightedComment {
  id: string;
  type: 'passionate' | 'constructive' | 'hidden-gem' | 'trending';
  title: string;
  summary: string;
  fullText: string;
  author: string;
  timestamp: string;
  score: number;
  reason: string;
}

interface SmartHighlightsProps {
  highlights: HighlightedComment[];
  onViewComment: (commentId: string) => void;
}

export const SmartHighlights: React.FC<SmartHighlightsProps> = ({
  highlights,
  onViewComment
}) => {
  const [selectedHighlight, setSelectedHighlight] = useState<string | null>(null);

  const getHighlightConfig = (type: string) => {
    switch (type) {
      case 'passionate':
        return {
          icon: <Star className="w-4 h-4" />,
          color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          label: '🔥 Most Passionate',
          gradient: 'from-amber-500/10 to-orange-500/10'
        };
      case 'constructive':
        return {
          icon: <Award className="w-4 h-4" />,
          color: 'bg-green-500/20 text-green-400 border-green-500/30',
          label: '🎯 Most Constructive',
          gradient: 'from-green-500/10 to-emerald-500/10'
        };
      case 'hidden-gem':
        return {
          icon: <Eye className="w-4 h-4" />,
          color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
          label: '💎 Hidden Gem',
          gradient: 'from-purple-500/10 to-pink-500/10'
        };
      case 'trending':
        return {
          icon: <TrendingUp className="w-4 h-4" />,
          color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          label: '📈 Trending Topic',
          gradient: 'from-blue-500/10 to-cyan-500/10'
        };
      default:
        return {
          icon: <Star className="w-4 h-4" />,
          color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
          label: '✨ Notable',
          gradient: 'from-gray-500/10 to-gray-600/10'
        };
    }
  };

  return (
    <Card className="glass-card p-6 hover-glow">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Smart Highlights 🎯
          </h3>
          <p className="text-sm text-muted-foreground">
            AI-curated standout feedback worth your attention
          </p>
        </div>

        <div className="space-y-3">
          {highlights.map((highlight) => {
            const config = getHighlightConfig(highlight.type);
            const isExpanded = selectedHighlight === highlight.id;
            
            return (
              <div
                key={highlight.id}
                className={`relative overflow-hidden rounded-lg border transition-all duration-300 cursor-pointer ${
                  isExpanded ? 'ring-2 ring-primary/50' : ''
                }`}
                onClick={() => setSelectedHighlight(isExpanded ? null : highlight.id)}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-50`} />
                
                <div className="relative p-4 space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <Badge className={`${config.color} font-medium`}>
                      {config.icon}
                      <span className="ml-1">{config.label}</span>
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        Score: {highlight.score}/100
                      </span>
                      <ChevronRight 
                        className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                          isExpanded ? 'rotate-90' : ''
                        }`} 
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {highlight.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {highlight.summary}
                    </p>
                  </div>

                  {/* Reason */}
                  <div className="text-xs text-muted-foreground italic">
                    💡 {highlight.reason}
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border/50 animate-fade-in">
                      <div className="space-y-3">
                        <div className="text-sm leading-relaxed">
                          {highlight.fullText}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            — {highlight.author} • {highlight.timestamp}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewComment(highlight.id);
                            }}
                            className="text-xs"
                          >
                            View in Context
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation hint */}
        <div className="text-center pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Click any highlight to expand • AI refreshes hourly
          </p>
        </div>
      </div>
    </Card>
  );
};