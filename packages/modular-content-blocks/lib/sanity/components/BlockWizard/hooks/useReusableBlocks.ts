import { useCallback, useState } from 'react';
import groq from 'groq';
import { useClient } from 'sanity';
import { DOCUMENT } from '@pkg/config/sanity/schemaTypes';
import { ReusableBlockDocument } from '../types';
import { BlockVariant } from '../types/blockVariant';
import { reusableBlocksToBlockVariants } from '../utils/reusableBlocksToBlockVariants';

export function useReusableBlocks() {
  const [reusableBlockVariants, setReusableBlockVariants] = useState<Array<BlockVariant>>([]);

  const client = useClient({ apiVersion: '2024-03-12' });

  const getReusableBlocks = useCallback(async() => {
    const reusableBlocks = await client.fetch<Array<ReusableBlockDocument>>(
      groq`*[_type == "${DOCUMENT.CONFIG_REUSABLE_BLOCKS}"]`
    );

    setReusableBlockVariants(reusableBlocksToBlockVariants(reusableBlocks, client));
  }, []);


  return {
    reusableBlockVariants,
    setReusableBlockVariants,
    getReusableBlocks,
  }
}
