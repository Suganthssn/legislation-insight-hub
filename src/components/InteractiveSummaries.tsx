import React, { useState } from 'react';
import { Card } from "@/components/ui/card";

interface Comment {
  id: string;
  summary: string;
  fullText: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  author: string;
  timestamp: string;
}

interface InteractiveSummariesProps {
  comments: Comment[];
  filteredKeyword?: string;
}

export const InteractiveSummaries: React.FC<InteractiveSummariesProps> = ({ 
  comments, 
  filteredKeyword 
}) => {
  const [expandedComment, setExpandedComment] = useState<string | null>(null);
  
  const getSentimentClass = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'sentiment-positive border';
      case 'negative':
        return 'sentiment-negative border';
      default:
        return 'sentiment-neutral border';
    }
  };
  
  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😟';
      default:
        return '😐';
    }
  };
  
  const filteredComments = filteredKeyword 
    ? comments.filter(comment => 
        comment.fullText.toLowerCase().includes(filteredKeyword.toLowerCase()) ||
        comment.summary.toLowerCase().includes(filteredKeyword.toLowerCase())
      )
    : comments;
  
  return (
    <Card className="glass-card p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Interactive Summaries 📖
            </h3>
            <p className="text-sm text-muted-foreground">
              AI-generated sticky notes • Click to expand
            </p>
          </div>
          {filteredKeyword && (
            <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
              Filtered: {filteredKeyword}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg relative ${getSentimentClass(comment.sentiment)}`}
              onClick={() => setExpandedComment(
                expandedComment === comment.id ? null : comment.id
              )}
              style={{
                transform: expandedComment === comment.id ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              {/* Sticky note effect */}
              <div className="absolute top-0 right-0 w-4 h-4 bg-amber-400/30 -mt-1 -mr-1 rotate-45 rounded-sm"></div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg">{getSentimentEmoji(comment.sentiment)}</span>
                  <span className="text-xs text-muted-foreground">
                    {comment.timestamp}
                  </span>
                </div>
                
                <div className="text-sm font-medium">
                  {comment.summary}
                </div>
                
                {expandedComment === comment.id && (
                  <div className="mt-3 pt-3 border-t border-border/50 animate-fade-in">
                    <div className="text-sm text-muted-foreground mb-2">
                      Full feedback from {comment.author}:
                    </div>
                    <div className="text-sm leading-relaxed">
                      {comment.fullText}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>By {comment.author}</span>
                  <span className={`px-2 py-1 rounded-full ${
                    comment.sentiment === 'positive' ? 'bg-sentiment-positive/20 text-sentiment-positive' :
                    comment.sentiment === 'negative' ? 'bg-sentiment-negative/20 text-sentiment-negative' :
                    'bg-sentiment-neutral/20 text-sentiment-neutral'
                  }`}>
                    {comment.sentiment}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredComments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No comments found for "{filteredKeyword}"
          </div>
        )}
      </div>
    </Card>
  );
};