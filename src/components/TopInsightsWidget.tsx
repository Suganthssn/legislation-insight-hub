import React from 'react';
import { Card } from "@/components/ui/card";
import { Trophy, ThumbsUp, ThumbsDown, Lightbulb } from 'lucide-react';

interface Insight {
  type: 'praised' | 'criticized' | 'suggested';
  title: string;
  description: string;
  count: number;
  examples: string[];
}

interface TopInsightsWidgetProps {
  insights: Insight[];
}

export const TopInsightsWidget: React.FC<TopInsightsWidgetProps> = ({ insights }) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'praised':
        return <ThumbsUp className="w-5 h-5 text-sentiment-positive" />;
      case 'criticized':
        return <ThumbsDown className="w-5 h-5 text-sentiment-negative" />;
      case 'suggested':
        return <Lightbulb className="w-5 h-5 text-amber-400" />;
      default:
        return <Trophy className="w-5 h-5" />;
    }
  };
  
  const getInsightColor = (type: string) => {
    switch (type) {
      case 'praised':
        return 'sentiment-positive';
      case 'criticized':
        return 'sentiment-negative';
      case 'suggested':
        return 'amber-400';
      default:
        return 'primary';
    }
  };
  
  const getInsightLabel = (type: string) => {
    switch (type) {
      case 'praised':
        return 'Most Praised';
      case 'criticized':
        return 'Most Criticized';
      case 'suggested':
        return 'Top Suggestion';
      default:
        return 'Insight';
    }
  };
  
  return (
    <Card className="glass-card p-6 hover-glow">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center justify-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Top 3 Insights</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            Key findings from community feedback
          </p>
        </div>
        
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={insight.type}
              className="relative group"
            >
              {/* Ranking badge */}
              <div className={`absolute -left-2 -top-2 w-6 h-6 rounded-full bg-${getInsightColor(insight.type)} text-black text-xs font-bold flex items-center justify-center z-10`}>
                {index + 1}
              </div>
              
              <div className="glass-card p-4 hover:scale-105 transition-all duration-300 border-l-4"
                   style={{
                     borderLeftColor: `hsl(var(--${getInsightColor(insight.type)}))`
                   }}>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getInsightIcon(insight.type)}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">
                        {getInsightLabel(insight.type)}
                      </h4>
                      <span className={`text-${getInsightColor(insight.type)} text-sm font-medium`}>
                        {insight.count} mentions
                      </span>
                    </div>
                    
                    <div className="text-sm font-medium">
                      {insight.title}
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      {insight.description}
                    </div>
                    
                    {/* Example quotes */}
                    <div className="mt-3 space-y-1">
                      {insight.examples.slice(0, 2).map((example, i) => (
                        <div key={i} className="text-xs text-muted-foreground italic border-l-2 border-border pl-2">
                          "{example}"
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary stats */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-sentiment-positive">
                {insights.find(i => i.type === 'praised')?.count || 0}
              </div>
              <div className="text-xs text-muted-foreground">Positive mentions</div>
            </div>
            <div>
              <div className="text-lg font-bold text-sentiment-negative">
                {insights.find(i => i.type === 'criticized')?.count || 0}
              </div>
              <div className="text-xs text-muted-foreground">Critical points</div>
            </div>
            <div>
              <div className="text-lg font-bold text-amber-400">
                {insights.find(i => i.type === 'suggested')?.count || 0}
              </div>
              <div className="text-xs text-muted-foreground">Suggestions</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};