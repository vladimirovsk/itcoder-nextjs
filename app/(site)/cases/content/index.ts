import { CaseStudy } from '@/app/components/article/types';
import cryptoExchangeBackend from './crypto-exchange-backend';
import aiMatchingEngine from './ai-matching-engine';
import blockchainWeb3Api from './blockchain-web3-api';

// Registry of full case studies. Only entries listed here have detail pages.
// Cards in cases.json that match a slug here become clickable.
export const CASE_STUDIES: CaseStudy[] = [cryptoExchangeBackend, aiMatchingEngine, blockchainWeb3Api];

export const CASE_STUDY_MAP: Record<string, CaseStudy> = Object.fromEntries(
  CASE_STUDIES.map((c) => [c.slug, c]),
);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDY_MAP[slug];
}
