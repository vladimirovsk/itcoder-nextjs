import { CaseStudy } from '@/app/components/article/types';

const caseStudy: CaseStudy = {
  slug: 'ai-matching-engine',
  title: 'AI-Powered Matching Engine',
  excerpt:
    'A smart matching microservice for a large-scale marketplace: an event-driven pipeline and behavioral scoring algorithm that turns slow manual workflows into instant, automated recommendations.',
  client: 'Large-scale marketplace platform',
  role: 'Backend architecture & scoring design',
  stack: ['NestJS', 'Pub/Sub', 'MongoDB', 'Geospatial', 'LLM', 'EMA scoring'],
  heroDiagram: 'matching-pipeline',
  date: '2026-05-28',
  readingMinutes: 7,
  tags: ['AI', 'Microservices', 'Event-driven', 'Scoring'],
  body: [
    {
      type: 'paragraph',
      text: 'On a marketplace with a very large supply side, matching the right participant to the right opportunity by hand simply does not scale. The platform needed a service that watches behavior, learns preferences over time, and returns a short, ranked list of the best matches in real time — without a human in the loop.',
    },
    {
      type: 'heading',
      text: 'Learning from behavior, not forms',
    },
    {
      type: 'paragraph',
      text: 'Instead of asking users to fill out preference forms that go stale, the service builds a profile from what they actually do. Each relevant event nudges a set of affinity scores using an exponential moving average, so recent behavior counts more than old behavior and the profile adapts on its own.',
    },
    {
      type: 'code',
      lang: 'typescript',
      code: `// Exponential moving average — recent signals weigh more.
const ALPHA = 0.85;
function updateScore(oldScore: number, signal: number) {
  return oldScore * ALPHA + signal * (1 - ALPHA);
}`,
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Why math, not an LLM, for the core loop',
      text: 'The habit-tracking core is deterministic arithmetic: fast, cheap, and predictable across millions of updates. The LLM is reserved for the edges — parsing unstructured input and generating personalized copy — where natural language actually matters.',
    },
    {
      type: 'heading',
      text: 'The matching pipeline',
    },
    {
      type: 'paragraph',
      text: 'When a new opportunity appears, the engine narrows a huge candidate pool down to a handful in two stages: cheap hard filters first (availability, location, eligibility) using geospatial database queries, then a weighted soft score that ranks whoever survives.',
    },
    {
      type: 'diagram',
      id: 'matching-pipeline',
      caption: 'Events feed behavioral profiles; the scoring engine filters and ranks into a top-N result.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Hard filters trim the full pool to a regional candidate set with a single geospatial query.',
        'A weighted soft score blends affinity, recency, and fit into a single 0–1 ranking.',
        'The top matches are published as events for downstream notifications.',
      ],
    },
    {
      type: 'callout',
      variant: 'challenge',
      title: 'Cold start for brand-new users',
      text: 'A user with no history has no behavioral signal. The engine bootstraps them from lightweight onboarding text (parsed by an LLM into initial affinities) and mixes in high-signal opportunities, so recommendations are relevant from day one and sharpen as real behavior arrives.',
    },
    {
      type: 'heading',
      text: 'Event-driven by design',
    },
    {
      type: 'paragraph',
      text: 'Everything is wired through a Pub/Sub message bus. Ingestion, profile updates, scoring, and notifications are decoupled services — each can scale and fail independently, and the system stays responsive even under bursty load.',
    },
    {
      type: 'callout',
      variant: 'result',
      title: 'Hours of manual work → a sub-second match',
      text: 'What used to be a slow, manual scheduling task became an automated recommendation that returns in well under a second, while continuously improving as it learns from each interaction.',
    },
    {
      type: 'metrics',
      items: [
        { label: 'Match latency', value: 'sub-sec' },
        { label: 'Manual effort', value: '−' },
        { label: 'Profile signal', value: 'live' },
        { label: 'Scaling model', value: 'event' },
      ],
    },
  ],
};

export default caseStudy;
