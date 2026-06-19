import { CaseStudy } from '@/app/components/article/types';

const caseStudy: CaseStudy = {
  slug: 'crypto-exchange-backend',
  title: 'Crypto Exchange Backend',
  excerpt:
    'Re-architecting a cryptocurrency exchange from a single API into a set of focused NestJS services and dedicated matching cores — with real-time order books, on-chain deposits, and zero downtime during the production cutover.',
  client: 'Cryptocurrency exchange',
  role: 'Backend architecture & lead development',
  stack: ['NestJS', 'TypeScript', 'RabbitMQ', 'Sequelize', 'MariaDB', 'Redis', 'Socket.IO', 'Ethereum'],
  heroDiagram: 'microservices',
  date: '2026-05-20',
  readingMinutes: 7,
  tags: ['NestJS', 'Microservices', 'Crypto', 'WebSocket'],
  body: [
    {
      type: 'paragraph',
      text: 'The platform began life as a single API doing everything — auth, the order book, balances, deposits, withdrawals. It worked at launch, but a spot exchange has very different parts pulling in very different directions: order matching needs to be fast and strictly ordered, while blockchain deposits and withdrawals are slow and asynchronous. Bundling all of that into one deployable made every release risky. The goal was to pull the system apart along those natural seams without ever taking trading offline.',
    },
    {
      type: 'heading',
      text: 'The architecture',
    },
    {
      type: 'paragraph',
      text: 'I split the system into focused NestJS services — a public API, an admin backend, and a WebSocket gateway — sitting in front of dedicated matching cores and a set of asynchronous workers for settlement, deposits, and withdrawals. A RabbitMQ message bus ties everything together: anything that does not need an immediate answer happens as an event, so slow on-chain work never blocks the trading path.',
    },
    {
      type: 'diagram',
      id: 'microservices',
      caption: 'NestJS services in front, dedicated matching cores, async settlement and on-chain workers over RabbitMQ.',
    },
    {
      type: 'callout',
      variant: 'challenge',
      title: 'An order book that has to be fast and exact',
      text: 'Matching cannot afford a database round-trip per order, and two orders must never match against stale state. Each trading pair runs its own matching core with the order book held in memory, processing orders deterministically and emitting fills as events. Reads stay sub-millisecond while persistence and settlement happen off the critical path.',
    },
    {
      type: 'heading',
      text: 'A process per trading pair',
    },
    {
      type: 'paragraph',
      text: 'Rather than one giant matching engine, each market gets an isolated core process. That keeps every order book single-threaded and easy to reason about, contains the blast radius of a problem to one pair, and lets busy markets scale independently of quiet ones. The cores talk to the rest of the system exclusively over the message bus.',
    },
    {
      type: 'heading',
      text: 'Live order books over WebSocket',
    },
    {
      type: 'paragraph',
      text: 'Traders expect the book, the ticker, and the price chart to move in real time. A dedicated Socket.IO gateway fans out updates from the matching cores’ fill events to thousands of connected clients — subscribing each client only to the pairs it is watching, instead of polling the database.',
    },
    {
      type: 'code',
      lang: 'typescript',
      code: `@WebSocketGateway({ namespace: 'market' })
export class MarketGateway {
  @SubscribeMessage('subscribe')
  onSubscribe(@MessageBody() { pair }: SubscribeDto, @ConnectedSocket() client: Socket) {
    client.join(pair); // one room per trading pair
  }

  // fan-out: a single fill event -> only the clients watching that pair
  onFill(fill: Fill) {
    this.server.to(fill.pair).emit('book', toBookDelta(fill));
  }
}`,
    },
    {
      type: 'heading',
      text: 'On-chain deposits and withdrawals',
    },
    {
      type: 'paragraph',
      text: 'Money moving in and out is the part users trust you with most, and it is inherently async. Deposit watchers detect incoming on-chain transactions and credit balances once confirmed; withdrawals are queued, validated, and processed by separate workers. Keeping this entirely off the trading path means a slow blockchain never freezes the order book — and a spike in withdrawals can be scaled or throttled on its own.',
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'External liquidity',
      text: 'To keep spreads tight on thinner markets, the system integrates an external liquidity provider over its API. That feed is isolated behind its own worker, so an outage or rate-limit upstream degrades gracefully instead of taking matching down with it.',
    },
    {
      type: 'heading',
      text: 'Zero-downtime migration',
    },
    {
      type: 'paragraph',
      text: 'The hardest part was not the new shape — it was getting there without a maintenance window on a live exchange holding real funds. I extracted one capability at a time behind the API, ran the new and old paths in parallel, and shifted traffic gradually, with every service independently deployable and instantly reversible.',
    },
    {
      type: 'list',
      items: [
        'Strangler-fig approach: stand up each new service alongside the old code, route a slice of traffic, verify, then ramp up.',
        'Dual-write during the transition so balances stayed consistent across old and new stores.',
        'Per-service health checks and one-click rollback, so the cutover was a series of small reversible steps.',
      ],
    },
    {
      type: 'callout',
      variant: 'result',
      title: 'Shipped without halting trading',
      text: 'Every service moved to production with no downtime window and no frozen order books. Deploys went from a risky all-or-nothing event to routine, isolated releases that no longer threaten unrelated parts of the exchange.',
    },
    {
      type: 'metrics',
      items: [
        { label: 'Trading downtime', value: '0' },
        { label: 'Order book reads', value: '<1ms' },
        { label: 'Matching isolation', value: '1 / pair' },
        { label: 'Deploy blast radius', value: '1 svc' },
      ],
    },
  ],
};

export default caseStudy;
