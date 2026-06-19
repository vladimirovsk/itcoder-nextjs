import { BlogPost } from '@/app/components/article/types';
import nestjsMonolithToMicroservices from './nestjs-monolith-to-microservices';
import integratingClaudeApiProduction from './integrating-claude-api-production';

// All blog posts, newest first.
export const BLOG_POSTS: BlogPost[] = [
  integratingClaudeApiProduction,
  nestjsMonolithToMicroservices,
].sort((a, b) => (a.date < b.date ? 1 : -1));

export const BLOG_MAP: Record<string, BlogPost> = Object.fromEntries(
  BLOG_POSTS.map((p) => [p.slug, p]),
);

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_MAP[slug];
}
