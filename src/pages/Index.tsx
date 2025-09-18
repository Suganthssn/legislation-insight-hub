import React, { useState } from 'react';
import { SentimentThermometer } from '@/components/SentimentThermometer';
import { KeywordGalaxy } from '@/components/KeywordGalaxy';
import { InteractiveSummaries } from '@/components/InteractiveSummaries';
import { TopInsightsWidget } from '@/components/TopInsightsWidget';
import { SentimentDashboard } from '@/components/SentimentDashboard';
import { Card } from '@/components/ui/card';
import { 
  sampleComments, 
  sampleKeywords, 
  sampleInsights, 
  sentimentData, 
  timeSeriesData 
} from '@/data/sampleData';

const Index = () => {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [sentimentFilter, setSentimentFilter] = useState<string | null>(null);

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeyword(selectedKeyword === keyword ? null : keyword);
  };

  const handleSentimentFilter = (sentiment: string | null) => {
    setSentimentFilter(sentiment);
  };

  // Filter comments based on selected filters
  const filteredComments = sampleComments.filter(comment => {
    if (sentimentFilter && comment.sentiment !== sentimentFilter) return false;
    if (selectedKeyword && !comment.fullText.toLowerCase().includes(selectedKeyword.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-nebula-primary bg-clip-text text-transparent">
            eConsultation Intelligence
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            AI-powered analysis of stakeholder feedback on draft legislation
          </p>
          
          {/* Legislation info card */}
          <Card className="glass-card p-6 max-w-2xl mx-auto">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">
                📋 Current Consultation: Digital Services Modernization Act
              </h2>
              <p className="text-sm text-muted-foreground">
                Public comment period: March 1-31, 2024 • 76 submissions received
              </p>
              <div className="flex justify-center space-x-6 text-sm">
                <span className="text-sentiment-positive">✅ 34 Supportive</span>
                <span className="text-sentiment-neutral">📊 26 Neutral</span>
                <span className="text-sentiment-negative">⚠️ 16 Critical</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Main dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Thermometer */}
          <div className="lg:col-span-1">
            <SentimentThermometer
              positivePercent={45}
              negativePercent={21}
              neutralPercent={34}
            />
          </div>

          {/* Middle column - Galaxy and Insights */}
          <div className="lg:col-span-1 space-y-6">
            <KeywordGalaxy
              keywords={sampleKeywords}
              onKeywordClick={handleKeywordClick}
            />
          </div>

          {/* Right column - Top Insights */}
          <div className="lg:col-span-1">
            <TopInsightsWidget insights={sampleInsights} />
          </div>
        </div>

        {/* Interactive Summaries */}
        <InteractiveSummaries 
          comments={filteredComments}
          filteredKeyword={selectedKeyword}
        />

        {/* Sentiment Dashboard */}
        <SentimentDashboard
          sentimentData={sentimentData}
          timeSeriesData={timeSeriesData}
          onFilterChange={handleSentimentFilter}
        />

        {/* Active filters display */}
        {(selectedKeyword || sentimentFilter) && (
          <Card className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Active Filters:</span>
                {selectedKeyword && (
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                    Keyword: {selectedKeyword}
                  </span>
                )}
                {sentimentFilter && (
                  <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm capitalize">
                    Sentiment: {sentimentFilter}
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  setSelectedKeyword(null);
                  setSentimentFilter(null);
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </Card>
        )}

        {/* Footer */}
        <Card className="glass-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            🤖 Powered by AI sentiment analysis • Last updated: {new Date().toLocaleString()}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Index;