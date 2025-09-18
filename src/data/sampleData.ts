// Sample data for the MVP demonstration

export const sampleComments = [
  {
    id: '1',
    summary: 'Love the digital transformation focus',
    fullText: 'This legislation represents a fantastic step forward in digital transformation. The provisions for electronic signatures and online documentation will significantly streamline processes for businesses and citizens alike.',
    sentiment: 'positive' as const,
    author: 'Sarah Chen',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    summary: 'Privacy concerns need addressing',
    fullText: 'While I support the general direction, I have serious concerns about data privacy protections. The current draft lacks sufficient safeguards for personal information, especially regarding third-party data sharing.',
    sentiment: 'negative' as const,
    author: 'Michael Rodriguez',
    timestamp: '4 hours ago'
  },
  {
    id: '3',
    summary: 'Implementation timeline seems realistic',
    fullText: 'The proposed 18-month implementation timeline appears reasonable and achievable. It provides adequate time for organizations to adapt while ensuring progress isn\'t unnecessarily delayed.',
    sentiment: 'neutral' as const,
    author: 'Dr. Emma Thompson',
    timestamp: '6 hours ago'
  },
  {
    id: '4',
    summary: 'Small business support is excellent',
    fullText: 'As a small business owner, I\'m thrilled to see the dedicated support provisions for smaller organizations. The tax incentives and compliance assistance will make adoption much more feasible.',
    sentiment: 'positive' as const,
    author: 'James Wilson',
    timestamp: '8 hours ago'
  },
  {
    id: '5',
    summary: 'Enforcement mechanisms too weak',
    fullText: 'The enforcement section is disappointingly weak. Without stronger penalties and clearer enforcement procedures, I fear this legislation will be ignored by bad actors.',
    sentiment: 'negative' as const,
    author: 'Lisa Park',
    timestamp: '1 day ago'
  },
  {
    id: '6',
    summary: 'Environmental impact considerations',
    fullText: 'It\'s great to see environmental sustainability factored into the digital transition requirements. The carbon footprint reduction targets are ambitious but necessary.',
    sentiment: 'positive' as const,
    author: 'David Green',
    timestamp: '1 day ago'
  },
  {
    id: '7',
    summary: 'Need clearer accessibility requirements',
    fullText: 'The accessibility provisions should be more specific. We need explicit requirements for screen reader compatibility and alternative format availability to ensure inclusive digital services.',
    sentiment: 'negative' as const,
    author: 'Maria Gonzalez',
    timestamp: '2 days ago'
  },
  {
    id: '8',
    summary: 'Training programs look comprehensive',
    fullText: 'The proposed training and education programs appear well-thought-out. Providing both online and in-person options will help ensure broad participation across different demographics.',
    sentiment: 'positive' as const,
    author: 'Robert Kim',
    timestamp: '2 days ago'
  }
];

export const sampleKeywords = [
  { text: 'digital transformation', frequency: 24, sentiment: 'positive' as const, x: 20, y: 30 },
  { text: 'privacy concerns', frequency: 18, sentiment: 'negative' as const, x: 70, y: 20 },
  { text: 'implementation', frequency: 15, sentiment: 'neutral' as const, x: 40, y: 60 },
  { text: 'small business', frequency: 12, sentiment: 'positive' as const, x: 80, y: 70 },
  { text: 'enforcement', frequency: 10, sentiment: 'negative' as const, x: 15, y: 80 },
  { text: 'accessibility', frequency: 9, sentiment: 'negative' as const, x: 60, y: 40 },
  { text: 'training programs', frequency: 8, sentiment: 'positive' as const, x: 85, y: 25 },
  { text: 'environmental', frequency: 7, sentiment: 'positive' as const, x: 30, y: 15 },
  { text: 'timeline', frequency: 6, sentiment: 'neutral' as const, x: 50, y: 85 },
  { text: 'tax incentives', frequency: 5, sentiment: 'positive' as const, x: 25, y: 55 }
];

export const sampleInsights = [
  {
    type: 'praised' as const,
    title: 'Digital Transformation Initiative',
    description: 'Strong support for modernizing government services and business processes',
    count: 24,
    examples: [
      'This represents a fantastic step forward in digital transformation',
      'The digital transition will streamline processes significantly'
    ]
  },
  {
    type: 'criticized' as const,
    title: 'Privacy Protection Gaps',
    description: 'Multiple concerns raised about data privacy and security safeguards',
    count: 18,
    examples: [
      'Lacks sufficient safeguards for personal information',
      'Third-party data sharing provisions need strengthening'
    ]
  },
  {
    type: 'suggested' as const,
    title: 'Enhanced Accessibility Standards',
    description: 'Community suggests more specific accessibility requirements',
    count: 15,
    examples: [
      'Need explicit requirements for screen reader compatibility',
      'Alternative format availability should be mandatory'
    ]
  }
];

export const sentimentData = [
  { sentiment: 'positive', count: 34, percentage: 45, color: 'hsl(var(--sentiment-positive))' },
  { sentiment: 'neutral', count: 26, percentage: 34, color: 'hsl(var(--sentiment-neutral))' },
  { sentiment: 'negative', count: 16, percentage: 21, color: 'hsl(var(--sentiment-negative))' }
];

export const timeSeriesData = [
  { date: 'Mon', positive: 8, neutral: 6, negative: 3 },
  { date: 'Tue', positive: 12, neutral: 8, negative: 4 },
  { date: 'Wed', positive: 6, neutral: 5, negative: 7 },
  { date: 'Thu', positive: 4, neutral: 3, negative: 1 },
  { date: 'Fri', positive: 4, neutral: 4, negative: 1 }
];