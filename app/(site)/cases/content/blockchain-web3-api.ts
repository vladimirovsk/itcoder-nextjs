import { CaseStudy } from '@/app/components/article/types';

const caseStudy: CaseStudy = {
  slug: 'blockchain-web3-api',
  title: 'Blockchain & Web3 API',
  excerpt:
    'A backend that turns raw EVM chains into a clean API: reorg-safe contract-event indexing over WebSocket node feeds, secure transaction signing, wallet-based auth, and DeFi price data — across Ethereum and BSC.',
  client: 'Web3 / DeFi & NFT products',
  role: 'Backend & blockchain integration',
  stack: ['Node.js', 'NestJS', 'web3.js', 'Solidity', 'Ethereum', 'BSC', 'PostgreSQL', 'gRPC', 'WebSocket'],
  heroDiagram: 'web3-indexing',
  date: '2026-05-12',
  readingMinutes: 8,
  tags: ['Web3', 'Blockchain', 'Ethereum', 'API'],
  body: [
    {
      type: 'paragraph',
      text: 'A blockchain is a terrible database to query directly. Nodes are slow, rate-limited, occasionally reorganize history out from under you, and speak a low-level RPC that no frontend wants to touch. The job of a Web3 backend is to hide all of that: subscribe to what happens on-chain, store it reliably, and expose a fast, ordinary API — REST and WebSocket — that the rest of the product can build on. I built this layer for several products spanning NFTs, a DeFi platform, and on-chain vaults.',
    },
    {
      type: 'heading',
      text: 'The shape of the system',
    },
    {
      type: 'paragraph',
      text: 'At the core is an event-indexing pipeline. Listeners hold live WebSocket subscriptions to EVM nodes, decode smart-contract events as they arrive, and write them into an indexed database. A separate API service serves that data over REST (documented with Swagger) and pushes live updates over WebSocket. A second, carefully isolated path handles the opposite direction: building, signing, and broadcasting transactions back to the chain.',
    },
    {
      type: 'diagram',
      id: 'web3-indexing',
      caption: 'Nodes stream events to a reorg-safe listener that indexes them; a separate signing path sends transactions back on-chain.',
    },
    {
      type: 'callout',
      variant: 'challenge',
      title: 'Never lose an event — even through reorgs',
      text: 'WebSocket subscriptions drop, nodes fall behind, and chains occasionally reorganize recent blocks. The listener treats the live feed as a hint, not a source of truth: it tracks the last fully-confirmed block, backfills any gap on reconnect, waits for confirmations before treating an event as final, and processes everything idempotently so a replayed block can never double-count.',
    },
    {
      type: 'heading',
      text: 'Decoding contracts into clean data',
    },
    {
      type: 'paragraph',
      text: 'Raw logs are just topics and hex. Using each contract’s ABI, the listener decodes events — transfers, mints, deposits, swaps — into typed records the rest of the system understands, and normalizes token amounts with big-number math so nothing is ever lost to floating-point rounding.',
    },
    {
      type: 'code',
      lang: 'typescript',
      code: `// Subscribe to a contract's events and index each one, decoded via its ABI.
const contract = new web3.eth.Contract(abi, address);

contract.events.allEvents({ fromBlock: lastIndexedBlock + 1 })
  .on('data', async (log) => {
    // amounts as BigNumber — never floats — to stay exact.
    const event = decodeEvent(log);
    await events.upsert(event, { conflictKey: log.transactionHash + log.logIndex });
  })
  .on('error', () => scheduleReconnectAndBackfill());`,
    },
    {
      type: 'heading',
      text: 'Transaction signing, kept on a short leash',
    },
    {
      type: 'paragraph',
      text: 'Sending value on-chain — withdrawals, NFT mints, contract calls — means signing transactions with private keys, which is the most security-sensitive part of any Web3 backend. I keep this path isolated from the read side: a dedicated signer builds the transaction, manages nonces to avoid stuck or conflicting sends, signs it, and broadcasts it, while everything else in the system only ever touches already-indexed, read-only data.',
    },
    {
      type: 'list',
      items: [
        'Signing isolated in one service — the rest of the backend never handles keys.',
        'Strict per-account nonce management so transactions never collide or stall.',
        'Gas estimation with sane caps, plus retries for dropped or under-priced transactions.',
      ],
    },
    {
      type: 'heading',
      text: 'Sign-in with your wallet',
    },
    {
      type: 'paragraph',
      text: 'Instead of passwords, users authenticate by signing a one-time challenge with their wallet. The backend recovers the address from the signature and verifies it matches — proving ownership without anything secret ever leaving the user’s device.',
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Smart contracts and DeFi data',
      text: 'Beyond reading chains, the work included writing and deploying contracts (ERC-721 NFTs and vault contracts) with a Hardhat/Truffle workflow, and integrating on-chain DEX pricing so the product could show live token values and routes without trusting a centralized feed.',
    },
    {
      type: 'heading',
      text: 'Built to scale across services',
    },
    {
      type: 'paragraph',
      text: 'As the products grew, the backend split into focused services — listeners, an API, a statistics/aggregation service, a collector — communicating over gRPC. Each can scale on its own: a chain with heavy event volume gets more listeners without touching the API, and analytics queries never compete with live indexing.',
    },
    {
      type: 'callout',
      variant: 'result',
      title: 'The chain, as a clean API',
      text: 'The product teams stopped thinking about nodes, reorgs, and nonces entirely. They consumed a fast REST + WebSocket API for on-chain state and a single endpoint to send transactions — while the backend absorbed all the messiness of talking to live blockchains.',
    },
    {
      type: 'metrics',
      items: [
        { label: 'Networks', value: 'ETH · BSC' },
        { label: 'Events lost', value: '0' },
        { label: 'Amount precision', value: 'exact' },
        { label: 'Signing surface', value: '1 svc' },
      ],
    },
  ],
};

export default caseStudy;
