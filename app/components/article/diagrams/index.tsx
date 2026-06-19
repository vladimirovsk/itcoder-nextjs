import { ComponentType } from 'react';
import MicroservicesDiagram from './MicroservicesDiagram';
import MatchingPipelineDiagram from './MatchingPipelineDiagram';
import LLMIntegrationDiagram from './LLMIntegrationDiagram';
import Web3IndexingDiagram from './Web3IndexingDiagram';

// Registry: diagram id (used in content blocks) → SVG component.
export const DIAGRAMS: Record<string, ComponentType> = {
  microservices: MicroservicesDiagram,
  'matching-pipeline': MatchingPipelineDiagram,
  'llm-integration': LLMIntegrationDiagram,
  'web3-indexing': Web3IndexingDiagram,
};
