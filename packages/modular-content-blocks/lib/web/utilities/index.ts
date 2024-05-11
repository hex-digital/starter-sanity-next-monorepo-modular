import groq from 'groq';
import { WebBlock } from '../../types';

const ignoreGroq = ['', '...', '...,'];

function buildBlockQueryPart(block: WebBlock) {
  // If block doesn't need any special field query, then it will be empty or just some dots, so ignore it.
  if (!block.query || typeof block.query !== 'string') {
    return groq``;
  }

  const query = block.query.trim();

  if (ignoreGroq.includes(query)) {
    return groq``;
  }

  return groq`_type == "${block.config.name}"=>{ ${block.query} }`;
}

export function buildBlockQuery(blocks: Array<WebBlock>) {
  return blocks
    .map(buildBlockQueryPart)
    .filter(groqString => groqString.length !== 0)
    .join(',');
}
