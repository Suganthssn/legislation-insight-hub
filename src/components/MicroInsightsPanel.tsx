import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap, FileText, AlertTriangle, HelpCircle, MessageSquare } from 'lucide-react';

interface MicroInsight {
  label: string;
  value: number;
  maxValue: number;
  icon: React.ReactNode;
  color: string;
  description: string;
}

interface MicroInsightsPanelProps {
  totalComments: number;
  averageLength: number;
  passionateCount: number;
  questionCount: number;
  urgentCount: number;
}

export const MicroInsightsPanel: React.FC<MicroInsightsPanelProps> = ({
  totalComments,
  averageLength,
  passionateCount,
  questionCount,
  urgentCount
}) => {
  const insights: MicroInsight[] = [
    {
      label: 'Emotional Intensity',
      value: passionateCount,
      maxValue: totalComments,
      icon: <Zap className="w-4 h-4" />,
      color: 'text-amber-400',
      description: 'Comments with strong emotional language'
    },
    {
      label: 'Detail Depth',
      value: Math.round((averageLength / 500) * 100), // Assume 500 chars = 100%
      maxValue: 100,
      icon: <FileText className="w-4 h-4" />,
      color: 'text-blue-400',
      description: 'Average comment thoroughness'
    },
    {
      label: 'Urgency Signals',
      value: urgentCount,
      maxValue: totalComments,
      icon: <AlertTriangle className="w-4 h-4" />,
      color: 'text-red-400',
      description: 'Comments expressing urgency'
    },
    {
      label: 'Questions Asked',
      value: questionCount,
      maxValue: totalComments,
      icon: <HelpCircle className="w-4 h-4" />,
      color: 'text-green-400',
      description: 'Comments seeking clarification'
    }
  ];

  const getPercentage = (value: number, max: number) => Math.round((value / max) * 100);

  return (
    <Card className="glass-card p-6 hover-glow">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Micro-Insights ✨
            </h3>
            <p className="text-sm text-muted-foreground">
              Hidden patterns in community feedback
            </p>
          </div>
          <div className="flex items-center space-x-2 text-primary">
            <MessageSquare className="w-5 h-5" />
            <span className="text-lg font-bold">{totalComments}</span>
          </div>
        </div>

        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={insight.label}
              className="space-y-2 group cursor-help"
              title={insight.description}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={insight.color}>{insight.icon}</span>
                  <span className="text-sm font-medium">{insight.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {insight.value}{insight.maxValue === 100 ? '%' : `/${insight.maxValue}`}
                  </span>
                  <span className={`text-sm font-semibold ${insight.color}`}>
                    {getPercentage(insight.value, insight.maxValue)}%
                  </span>
                </div>
              </div>
              
              <Progress 
                value={getPercentage(insight.value, insight.maxValue)} 
                className="h-2 group-hover:h-3 transition-all duration-300"
                style={{
                  '--progress-foreground': `hsl(var(--${insight.color.replace('text-', '').replace('-400', '')}-400))`,
                } as React.CSSProperties}
              />
              
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-muted-foreground italic">
                  {insight.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick stats summary */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">
                {Math.round(averageLength)}
              </div>
              <div className="text-xs text-muted-foreground">Avg. characters</div>
            </div>
            <div>
              <div className="text-lg font-bold text-accent">
                {Math.round((passionateCount / totalComments) * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">High engagement</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};