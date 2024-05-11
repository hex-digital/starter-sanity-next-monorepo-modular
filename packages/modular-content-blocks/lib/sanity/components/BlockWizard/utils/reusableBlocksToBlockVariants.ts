import { BlockVariant } from '../types/blockVariant';
import { AutomaticWizardGroups, NamedWizardGroups } from '../constants';
import { ReusableBlockDocument } from '../types';
import { urlFor } from '../../../urlFor';
import { SanityClient } from 'sanity';
import imageUrlBuilder from '@sanity/image-url';

export function reusableBlocksToBlockVariants(
  reusableBlockDocuments: Array<ReusableBlockDocument>,
  client: SanityClient,
  group?: AutomaticWizardGroups | NamedWizardGroups,
): Array<BlockVariant> {
  return reusableBlockDocuments.map(
    (reusableBlockDoc) => {
      const builder = imageUrlBuilder(client)

      return {
        title: reusableBlockDoc.title ?? 'Unnamed Block',
        assetUrl: reusableBlockDoc.image && builder.image(reusableBlockDoc.image).width(600).url(),
        group: group ?? AutomaticWizardGroups.REUSABLE,
        blocks: reusableBlockDoc.content?.map((block) => ({
          blockName: block._type,
          initialValue: block,
        })) ?? [],
      };
    }
  );
}
