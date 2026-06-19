// Shared content model for long-form pages (case studies + blog articles).
// Content is authored as a typed array of blocks. This mirrors what an MDX
// pipeline would produce, but keeps everything type-checked and dependency-free.
// When/if we move to MDX, only the *source* of these blocks changes — the
// renderer and the visual result stay identical.

export type ArticleBlock =
  | { type: 'heading'; text: string; id?: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'code'; lang?: string; code: string }
  | { type: 'quote'; text: string }
  | {
      type: 'callout';
      variant: 'challenge' | 'result' | 'note';
      title: string;
      text: string;
    }
  | { type: 'metrics'; items: { label: string; value: string }[] }
  // References a diagram component by id (see components/article/diagrams).
  | { type: 'diagram'; id: string; caption?: string };

export interface ArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  // Hero/card image — either a generated diagram id or an imported image key.
  heroDiagram?: string;
  date: string; // ISO, e.g. '2026-06-18'
  readingMinutes: number;
  tags: string[];
}

// A case study extends the article meta with project-specific framing.
export interface CaseStudy extends ArticleMeta {
  client: string; // anonymized descriptor, e.g. "Cryptocurrency exchange"
  role: string; // e.g. "Backend architecture & lead development"
  stack: string[];
  body: ArticleBlock[];
}

export interface BlogPost extends ArticleMeta {
  body: ArticleBlock[];
}
