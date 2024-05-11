import { BlockSchemaDefinition } from '../../components/BlockWizard/types/blockSchema';
import { OuterBlockItemComponent } from '../../components/OuterBlockItemComponent';
import { InnerBlockItemComponent } from '../../components/InnerBlockItemComponent';

export function defineOuterBlock(schemaTypeDefinition: BlockSchemaDefinition): BlockSchemaDefinition {
  return {
    ...schemaTypeDefinition,
    components: {
      ...schemaTypeDefinition.components,
      item: schemaTypeDefinition.components?.item ?? OuterBlockItemComponent,
    },
  };
}

export function defineInnerBlock(schemaTypeDefinition: BlockSchemaDefinition): BlockSchemaDefinition {
  return {
    ...schemaTypeDefinition,
    components: {
      ...schemaTypeDefinition.components,
      item: schemaTypeDefinition.components?.item ?? InnerBlockItemComponent,
    },
  };
}
