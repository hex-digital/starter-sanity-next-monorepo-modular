import { Card, Text, Flex } from '@sanity/ui';
import styled from 'styled-components';
import { useColorSchemeValue } from 'sanity';
import { BlockVariant } from '../types/blockVariant';
import { OnBlockAddFn } from '../types';

interface Props {
  onBlockAdd: OnBlockAddFn;
  blockVariant: BlockVariant;
}

const BlockVariantCardWrapper = styled(Card)<{ $currentScheme?: 'light' | 'dark'; }>`
  --hover-bg: ${(props) => props.$currentScheme === 'light' ? '#F2F3F5' : '#2A2C30'};

  all: initial;
  padding: 0.75em;
  border-radius: 0.1875rem;


  &:hover {
    background: var(--hover-bg);
    cursor: pointer;
  }

  &[data-has-asset="true"] {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 0.75rem;
  }

  &[data-has-asset="false"] {
    display: block;
    border: 1px solid var(--card-border-color);
  }

`;

const BlockAssetWrapper = styled.div`
  max-height: 400px;
  height: 100%;
  width: 100%;

  & img,
  video {
    width: 100%;
    max-height: 100%;
    object-fit: contain;
    object-position: top left;
    border: 1px solid var(--card-border-color);
    overflow: hidden;
  }
`;

export function BlockVariantCard({ blockVariant, onBlockAdd }: Props) {
  const scheme = useColorSchemeValue();

  return (
    <BlockVariantCardWrapper
      role="button"
      tone="transparent"
      data-has-asset={!!blockVariant.assetUrl}
      padding={2}
      radius={2}
      style={{ position: "relative" }}
      onClick={() => onBlockAdd({ blocks: blockVariant.blocks })}
      $currentScheme={scheme}
    >
      {
        blockVariant.assetUrl
          ? (
            <>
              <Text>{blockVariant.title}</Text>
              <BlockAssetWrapper>
                { /\.mp4$|\.mov$|\.avi$|\.wmv$|\.flv$|\.mkv$/.test(blockVariant.assetUrl)
                  ? <video
                    muted={true}
                    loop={true}
                    autoPlay={true}
                    src={blockVariant.assetUrl}
                    aria-label={blockVariant.title}
                  />
                  : <img src={blockVariant.assetUrl} alt={blockVariant.title} />
                }
              </BlockAssetWrapper>
            </>
          )
          : (
            <Flex style={{height: '100%'}} justify="center" align="center">
              <Text size={1} weight="bold" align="center">
                {blockVariant.title}
              </Text>
            </Flex>
          )
      }
    </BlockVariantCardWrapper>
  );
}
