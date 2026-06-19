import { BlogPost } from '@/app/components/article/types';

const post: BlogPost = {
  slug: 'nestjs-monolith-to-microservices',
  title: 'Migrating a NestJS Monolith to Microservices With Zero Downtime',
  excerpt:
    'A practical, battle-tested approach to splitting a NestJS monolith into independently deployable services — without a maintenance window, a big-bang release, or a 2 a.m. rollback.',
  heroDiagram: 'microservices',
  date: '2026-06-10',
  readingMinutes: 8,
  tags: ['NestJS', 'Microservices', 'Architecture', 'DevOps'],
  body: [
    {
      type: 'paragraph',
      text: 'Most “rewrite the monolith” stories end one of two ways: a heroic big-bang launch that breaks in production, or a migration that drags on for a year and never finishes. Neither is necessary. With the strangler-fig pattern and a bit of discipline, you can move a NestJS monolith to microservices one slice at a time, in production, with users online the whole way.',
    },
    {
      type: 'heading',
      text: 'Why split at all?',
    },
    {
      type: 'paragraph',
      text: 'A monolith is the right call early on — one repo, one deploy, fast iteration. The pain starts when unrelated parts of the system become coupled at deploy time: a change to billing forces a full redeploy, and a bug in one module can take everything down. If that is your reality, splitting along business boundaries buys you independent scaling and independent releases.',
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Split by domain, not by layer',
      text: 'Good service boundaries follow business capabilities (orders, wallet, notifications), not technical layers (controllers, services, repositories). If two services constantly need to call each other to do one job, the boundary is wrong.',
    },
    {
      type: 'heading',
      text: 'The target shape',
    },
    {
      type: 'diagram',
      id: 'microservices',
      caption: 'An API gateway in front, independent services with their own data, async events over a message bus.',
    },
    {
      type: 'heading',
      text: 'The strangler-fig migration',
    },
    {
      type: 'paragraph',
      text: 'Instead of rewriting everything and flipping a switch, you put a gateway in front of the monolith and peel off one capability at a time. Each extracted service runs alongside the monolith until you trust it, then takes over its slice of traffic.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Put an API gateway in front of the existing monolith — nothing else changes yet.',
        'Pick the most painful or most independent module and rebuild it as a service.',
        'Route a small percentage of its traffic to the new service; compare results.',
        'Ramp to 100%, then delete that code from the monolith.',
        'Repeat. The monolith shrinks until it is gone or reduced to a thin core.',
      ],
    },
    {
      type: 'callout',
      variant: 'challenge',
      title: 'Keeping data consistent mid-migration',
      text: 'While both the old and new code paths are live, writes can land in two places. Dual-write with an idempotency key, or have the monolith publish events the new service consumes — so state converges no matter which path handled the request.',
    },
    {
      type: 'heading',
      text: 'Wiring services with NestJS',
    },
    {
      type: 'paragraph',
      text: 'NestJS has first-class microservice transport built in. For synchronous calls you can keep HTTP through the gateway; for everything else, prefer asynchronous messaging so services stay decoupled and resilient to each other’s downtime.',
    },
    {
      type: 'code',
      lang: 'typescript',
      code: `// Emit an event instead of calling another service directly.
@Injectable()
export class OrdersService {
  constructor(@Inject('BUS') private readonly bus: ClientProxy) {}

  async place(order: CreateOrderDto) {
    const saved = await this.repo.save(order);
    // fire-and-forget: wallet + notifications react on their own schedule
    this.bus.emit('order.placed', { id: saved.id, userId: saved.userId });
    return saved;
  }
}`,
    },
    {
      type: 'heading',
      text: 'You need CI/CD before you need microservices',
    },
    {
      type: 'paragraph',
      text: 'The whole approach depends on being able to deploy any single service safely and roll it back instantly. If a release is still a manual, all-or-nothing event, fix that first — otherwise microservices just multiply your deployment pain by the number of services.',
    },
    {
      type: 'quote',
      text: 'Microservices are an organizational and operational choice before they are a technical one. If you can’t deploy and observe one service independently, you’re not ready to split.',
    },
    {
      type: 'heading',
      text: 'Takeaways',
    },
    {
      type: 'list',
      items: [
        'Split by domain boundaries, never by technical layer.',
        'Use the strangler-fig pattern: extract, route a slice, ramp, delete. Always reversible.',
        'Prefer async events over direct service-to-service calls.',
        'Invest in CI/CD and observability before the first service leaves the monolith.',
      ],
    },
    {
      type: 'callout',
      variant: 'result',
      title: 'The payoff',
      text: 'Done this way, the migration is a series of small, boring, reversible steps — not a dramatic launch. Users never notice, and you end up with services you can scale and ship on their own.',
    },
  ],
};

export default post;
