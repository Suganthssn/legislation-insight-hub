// Enhanced sample data with new micro-insights and smart highlights

export const microInsightsData = {
  totalComments: 76,
  averageLength: 287,
  passionateCount: 23, // Comments with high emotional intensity
  questionCount: 12,   // Comments asking questions
  urgentCount: 8       // Comments with urgency indicators
};

export const smartHighlights = [
  {
    id: 'highlight-1',
    type: 'passionate' as const,
    title: 'Digital transformation breakthrough',
    summary: 'Overwhelmingly enthusiastic support for modernization',
    fullText: 'This legislation represents a FANTASTIC step forward in digital transformation! I cannot emphasize enough how important this is for our future. The provisions for electronic signatures and online documentation will revolutionize how we do business. This is exactly what we\'ve been waiting for!!!',
    author: 'Sarah Chen',
    timestamp: '2 hours ago',
    score: 94,
    reason: 'High emotional intensity with multiple exclamation marks and caps'
  },
  {
    id: 'highlight-2',
    type: 'constructive' as const,
    title: 'Balanced privacy framework proposal',
    summary: 'Detailed suggestions for improving data protection while maintaining functionality',
    fullText: 'While I strongly support the digital modernization goals, I believe we need more robust privacy protections. I propose adding: 1) Explicit consent requirements for data sharing, 2) Clear data retention limits, 3) User rights to data portability, and 4) Regular privacy audits. These additions would address current gaps while preserving the bill\'s innovative spirit.',
    author: 'Dr. Michael Rodriguez',
    timestamp: '4 hours ago',
    score: 89,
    reason: 'Provides specific, actionable suggestions with clear reasoning'
  },
  {
    id: 'highlight-3',
    type: 'hidden-gem' as const,
    title: 'Accessibility implementation roadmap',
    summary: 'Detailed technical insights often overlooked in discussions',
    fullText: 'As someone who has implemented WCAG 2.1 standards across multiple government systems, I want to share some practical insights that might help with implementation. The current accessibility requirements are good but could benefit from specific technical guidelines: mandatory automated testing integration, screen reader compatibility matrices, and alternative format specifications. I\'ve seen these gaps cause major delays in similar projects.',
    author: 'Maria Gonzalez',
    timestamp: '2 days ago',
    score: 85,
    reason: 'Long, detailed comment with technical expertise that received little attention'
  },
  {
    id: 'highlight-4',
    type: 'trending' as const,
    title: 'Small business implementation concerns',
    summary: 'Rising pattern of implementation timeline worries',
    fullText: 'I\'m concerned about the 18-month implementation timeline for small businesses. While larger organizations have dedicated IT teams, smaller companies like mine will need significant support. Could we consider a phased rollout or additional technical assistance programs?',
    author: 'James Wilson',
    timestamp: '8 hours ago',
    score: 78,
    reason: 'Part of emerging trend - 15 similar comments in past 24 hours'
  }
];

export const emojiMoodData = [
  {
    emoji: '😊',
    label: 'Optimistic',
    count: 34,
    percentage: 45,
    color: '#10B981',
    examples: ['excited about the future', 'this will revolutionize', 'fantastic progress']
  },
  {
    emoji: '🤔',
    label: 'Thoughtful',
    count: 26,
    percentage: 34,
    color: '#6366F1',
    examples: ['we should consider', 'important to balance', 'needs more analysis']
  },
  {
    emoji: '😟',
    label: 'Concerned',
    count: 12,
    percentage: 16,
    color: '#F59E0B',
    examples: ['worried about privacy', 'implementation challenges', 'potential risks']
  },
  {
    emoji: '😤',
    label: 'Frustrated',
    count: 4,
    percentage: 5,
    color: '#EF4444',
    examples: ['this is inadequate', 'completely unacceptable', 'major oversight']
  }
];