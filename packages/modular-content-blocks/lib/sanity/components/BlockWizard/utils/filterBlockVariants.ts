import { tokenize } from './strings';

import { BlockVariant } from '../types/blockVariant';

interface Result {
  blockVariant: BlockVariant;
  matchCount: number;
}

export function filterBlockVariants(searchQuery: string, blockVariants: Array<BlockVariant>) {
  const tokens = tokenize(searchQuery);

  const filteredBlockVariants = tokens.length <= 0
    ? blockVariants
    : blockVariants
      .reduce(
        (results, blockVariant) => {
          const title = tokenize(blockVariant.title).join(' ');
          const matches = tokens.filter((token) => title.includes(token));

          if (!matches.length) {
            return results;
          }

          const indexToInsert = results.findIndex(
            (result) => result.matchCount < matches.length
          );
          const toAdd = { blockVariant, matchCount: matches.length };

          if (indexToInsert === -1) {
            return [...results, toAdd];
          }

          return [
            ...results.slice(0, indexToInsert),
            toAdd,
            ...results.slice(indexToInsert)
          ];
        },
        [] as Array<Result>
      )
      .map(({ blockVariant }) => blockVariant);

  return filteredBlockVariants;
}
