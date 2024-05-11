import { useCallback, useEffect, useState } from 'react';
import { useClient } from 'sanity';
import { Heading, Stack, Text, ThemeProvider } from '@sanity/ui';
import { buildTheme } from '@sanity/ui/theme';
import styled from 'styled-components';
import { BlockVariantCard } from './BlockVariantCard';
import { BlockGroup, BlockVariant } from '../types/blockVariant';
import groq from 'groq';
import { DOCUMENT } from '@pkg/config/sanity/schemas';
import { reusableBlocksToBlockVariants } from '../utils/reusableBlocksToBlockVariants';
import { OnBlockAddFn, ReusableBlockDocument } from '../types';
import { useReusableBlocks } from '../hooks/useReusableBlocks';

interface Props {
  onBlockAdd: OnBlockAddFn;
  groupedBlockVariants: Array<BlockGroup>;
}

const Wrapper = styled.div`
  height: 450px;
  @media only screen and (min-width: 768px) {
    height: 650px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

export function BlocksPicker({ onBlockAdd, groupedBlockVariants }: Props) {
  return (
    <ThemeProvider theme={buildTheme()}>
      <Wrapper>
        <Stack space={6} paddingY={3}>
          {groupedBlockVariants
            .filter((blockGroup) => blockGroup.blockVariants.length)
            .map((blockGroup) => (
              <Stack key={blockGroup.name} space={3}>
                <Heading size={3}>{blockGroup.name.charAt(0).toUpperCase() + blockGroup.name.slice(1)} Blocks</Heading>
                {blockGroup.description && <Text>{blockGroup.description}</Text>}
                <Stack space={2} paddingY={3}>
                  <Grid>
                    {blockGroup.blockVariants.map((blockVariant) =>
                      <BlockVariantCard key={blockVariant.title} blockVariant={blockVariant} onBlockAdd={onBlockAdd} />
                    )}
                  </Grid>
                </Stack>
              </Stack>
            ))
          }
        </Stack>
      </Wrapper>
    </ThemeProvider>
  );
}
