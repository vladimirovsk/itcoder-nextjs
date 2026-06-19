import { BlogPost } from '@/app/components/article/types';

const post: BlogPost = {
  slug: 'integrating-claude-api-production',
  title: 'Integrating the Claude API Into Production: Structured Output & Retries',
  excerpt:
    'A demo that calls an LLM and prints the answer is easy. A production integration that never returns broken JSON, survives timeouts, and degrades gracefully is a different job. Here is the pattern I use.',
  heroDiagram: 'llm-integration',
  date: '2026-06-15',
  readingMinutes: 7,
  tags: ['AI', 'LLM', 'Claude', 'Backend'],
  body: [
    {
      type: 'paragraph',
      text: 'Wiring an LLM into a backend looks trivial in a tutorial: send a prompt, get text back. Production is where it gets interesting. The model occasionally returns malformed output, sometimes it is slow, and once in a while the call just fails. If your code assumes the happy path, those edges become incidents. The fix is to treat the model like any other unreliable external dependency.',
    },
    {
      type: 'heading',
      text: 'The request flow',
    },
    {
      type: 'diagram',
      id: 'llm-integration',
      caption: 'Validate → assemble → call with timeout + retries → parse against a schema → deliver a typed result, with a fallback path on failure.',
    },
    {
      type: 'heading',
      text: 'Get structured output, not prose',
    },
    {
      type: 'paragraph',
      text: 'If you need data back, do not parse free-form text with regex. Ask the model for a specific shape and validate it. With Claude, tool use (function calling) reliably constrains the output to a schema you define — and you reject anything that does not match instead of hoping it is right.',
    },
    {
      type: 'code',
      lang: 'typescript',
      code: `const result = await client.messages.create({
  model: 'claude-opus-4-8',
  max_tokens: 1024,
  tools: [{
    name: 'extract_requirements',
    description: 'Extract structured shift requirements from free text',
    input_schema: {
      type: 'object',
      properties: { skills: { type: 'array', items: { type: 'string' } } },
      required: ['skills'],
    },
  }],
  tool_choice: { type: 'tool', name: 'extract_requirements' },
  messages: [{ role: 'user', content: description }],
});

// Validate before you trust it — never assume the shape is correct.
const parsed = RequirementsSchema.parse(getToolInput(result));`,
    },
    {
      type: 'callout',
      variant: 'challenge',
      title: 'Timeouts and retries',
      text: 'Model latency is variable. Wrap every call in a timeout and retry transient failures with exponential backoff and jitter — but cap it. A request that has already waited 20 seconds should fail over to a fallback, not retry forever and pile up.',
    },
    {
      type: 'heading',
      text: 'Always have a fallback',
    },
    {
      type: 'paragraph',
      text: 'The model will be unavailable at some point. Decide ahead of time what happens then: serve a cached result, fall back to a deterministic default, or queue the work for later. The one unacceptable answer is an unhandled 500 in the user’s face.',
    },
    {
      type: 'list',
      items: [
        'Cache results when the same input recurs — it cuts cost and latency, and doubles as a fallback.',
        'For non-urgent work, queue the LLM call and process it asynchronously.',
        'Log inputs and outputs (minus anything sensitive) so you can debug and evaluate quality over time.',
      ],
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Use the LLM only where language matters',
      text: 'The strongest systems keep deterministic logic deterministic and reserve the model for what it is uniquely good at: turning unstructured language into structure, and structure into natural language. Do not put a probabilistic model on a path that simple math handles better.',
    },
    {
      type: 'heading',
      text: 'Takeaways',
    },
    {
      type: 'list',
      items: [
        'Constrain output with tool use / JSON mode, then validate it against a schema.',
        'Wrap calls in timeouts and bounded, jittered retries.',
        'Design the fallback path before you ship the happy path.',
        'Reserve the model for language tasks; keep deterministic logic deterministic.',
      ],
    },
  ],
};

export default post;
