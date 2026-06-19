import { BlogPost } from '@/app/components/article/types';

const post: BlogPost = {
  slug: 'reliable-web3-event-indexing',
  title: 'Indexing On-Chain Events Without Losing Data',
  excerpt:
    'WebSocket subscriptions drop, nodes fall behind, and chains reorganize recent blocks. Here is how to build a Web3 backend that turns a messy live blockchain into a clean, never-miss-an-event API.',
  heroDiagram: 'web3-indexing',
  date: '2026-06-17',
  readingMinutes: 8,
  tags: ['Web3', 'Blockchain', 'Backend', 'Ethereum'],
  body: [
    {
      type: 'paragraph',
      text: 'A blockchain is a hostile data source. Nodes are slow and rate-limited, WebSocket subscriptions silently die, and the chain itself can reorganize the last few blocks out from under you. If your backend reads the chain naively — subscribe, take whatever arrives, write it down — you will eventually miss events, double-count others, and serve wrong data to your users. The fix is to treat the live feed as a hint and build a pipeline that can always recover the truth.',
    },
    {
      type: 'heading',
      text: 'The shape of a reliable indexer',
    },
    {
      type: 'paragraph',
      text: 'A robust indexer has three moving parts: a listener that consumes events from the node, a durable record of the last block it has fully processed, and a backfill routine that can replay any gap. The API layer only ever reads from the indexed database — never directly from a node — so reads stay fast and consistent no matter what the chain is doing.',
    },
    {
      type: 'diagram',
      id: 'web3-indexing',
      caption: 'Nodes stream events to a reorg-safe listener that indexes them; the API only ever reads the indexed database.',
    },
    {
      type: 'heading',
      text: 'Never trust the live subscription alone',
    },
    {
      type: 'paragraph',
      text: 'WebSocket subscriptions are great for low latency and terrible for reliability. They drop on network blips, miss events while reconnecting, and give you no guarantee of completeness. So use them as a fast-path trigger, but anchor correctness to a block cursor: persist the last fully-indexed block number, and on every reconnect, backfill everything between that cursor and the current head before trusting the live feed again.',
    },
    {
      type: 'code',
      lang: 'typescript',
      code: `// On (re)connect: close the gap before resuming the live feed.
async function resume() {
  const from = (await store.getLastIndexedBlock()) + 1;
  const head = await web3.eth.getBlockNumber();
  if (from <= head) {
    await backfill(from, head); // replay missed range in batches
  }
  subscribeLive(head + 1);
}`,
    },
    {
      type: 'callout',
      variant: 'challenge',
      title: 'Surviving chain reorganizations',
      text: 'The most recent blocks are not final — a reorg can replace them, changing or removing events you already indexed. The defense is confirmations: only treat an event as final once it is buried under N blocks. Index recent events optimistically if you must, but mark them pending and reconcile once they cross the confirmation threshold.',
    },
    {
      type: 'heading',
      text: 'Idempotency makes replays safe',
    },
    {
      type: 'paragraph',
      text: 'Because you will replay blocks — on reconnect, on reorg, after a crash — every write has to be idempotent. The natural idempotency key for an EVM log is the transaction hash plus the log index: together they uniquely identify a single event. Upsert on that key and a replayed block can never create duplicates.',
    },
    {
      type: 'code',
      lang: 'typescript',
      code: `// transactionHash + logIndex uniquely identifies one event.
await events.upsert(decoded, {
  conflictKey: \`\${log.transactionHash}:\${log.logIndex}\`,
});`,
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Decode to typed data, keep amounts exact',
      text: 'Raw logs are just topics and hex. Decode them against each contract’s ABI into typed records the rest of your system understands, and handle token amounts with big-number math — never floats — so nothing is ever lost to rounding.',
    },
    {
      type: 'heading',
      text: 'Operational details that matter',
    },
    {
      type: 'list',
      items: [
        'Run multiple node providers and fail over between them — a single RPC endpoint is a single point of failure.',
        'Backfill in bounded batches with a capped block range, so a long gap can’t overwhelm the node or your database.',
        'Expose the indexer’s lag (head block minus last-indexed block) as a metric — it’s your early warning that something is wrong.',
        'Separate the read API and the signing path: the part that holds private keys should never share a process with public read traffic.',
      ],
    },
    {
      type: 'callout',
      variant: 'result',
      title: 'The chain, as a clean API',
      text: 'Done right, your product teams stop thinking about nodes, reorgs, and missed blocks entirely. They consume a fast, ordinary REST + WebSocket API for on-chain state — while the indexer quietly absorbs all the messiness of talking to a live blockchain.',
    },
    {
      type: 'heading',
      text: 'Takeaways',
    },
    {
      type: 'list',
      items: [
        'Treat the live subscription as a hint; anchor correctness to a persisted block cursor + backfill.',
        'Wait for confirmations before treating recent events as final — reorgs are normal.',
        'Make every write idempotent on transactionHash + logIndex so replays are safe.',
        'Fail over between node providers and monitor indexer lag.',
      ],
    },
  ],
};

export default post;
