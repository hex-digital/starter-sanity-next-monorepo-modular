import { useCallback, useEffect, useState } from 'react';
import type { ArrayOfObjectsInputProps, ArraySchemaType } from 'sanity';
import { Box, Card, Dialog, Flex, Heading, Stack, TextInput, useClickOutside } from '@sanity/ui';
import { SearchIcon } from '@sanity/icons';
import { generateItemKey } from './BlockWizard/utils/strings';
import { BlocksPicker } from './BlockWizard/components/BlocksPicker';
import { filterBlockVariants } from './BlockWizard/utils/filterBlockVariants';
import { BlocksWizardProvider } from './BlockWizard/contexts/BlockWizard';
import { ArrayFunctions } from './BlockWizard/components/BlockWizardArrayFunction';
import { prepareBlockVariants } from './BlockWizard/utils/prepareBlockVariants';
import { getBlockInitialValues } from './BlockWizard/utils/getBlockInitialValues';
import { groupBlockVariants } from './BlockWizard/utils/groupBlockVariants';
import { OnBlockAddFn } from './BlockWizard/types';
import { useReusableBlocks } from './BlockWizard/hooks/useReusableBlocks';
import { AutomaticWizardGroups } from './BlockWizard/constants';
import type { BlockGroup } from './BlockWizard/types/blockVariant';

export function ModularBlockArrayInput() {
  return function ModularBlockArrayInputComponent(props: ArrayOfObjectsInputProps) {
    const [open, setOpen] = useState(false);
    const [onItemAdd, setOnItemAdd] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [dialogElement, setDialogElement] = useState(null);
    const [groupedBlockVariants, setGroupedBlockVariants] = useState<Array<BlockGroup>>([]);
    const [reusableGroup, setReusableGroup] = useState<BlockGroup | undefined>(undefined);

    const {
      reusableBlockVariants,
      getReusableBlocks,
    } = useReusableBlocks();

    useEffect(() => {
      getReusableBlocks();
    }, [getReusableBlocks]);

    useEffect(() => {
      const blockVariants = prepareBlockVariants(props.schemaType.of);
      const filteredBlockVariants = filterBlockVariants(searchQuery, blockVariants);
      const tempGroupedBlockVariants = groupBlockVariants(filteredBlockVariants);

      const tempReusableGroup = tempGroupedBlockVariants.find(
        (blockGroup) => blockGroup.name === AutomaticWizardGroups.REUSABLE
      );

      if (tempReusableGroup) {
        tempReusableGroup.blockVariants = reusableBlockVariants;
      }

      setGroupedBlockVariants(tempGroupedBlockVariants);
      setReusableGroup(tempReusableGroup);
    }, [props.schemaType.of, searchQuery]);

    const onBlockAdd: OnBlockAddFn = ({ blocks }) => {
      setOpen(false);

      const isSingleBlock = blocks.length === 1;

      blocks.forEach((block) => {
        const { blockName, initialValue } = block;

        let defaultInitialValue = getBlockInitialValues(blockName, props);

        const newItem = {
          _type: blockName,
          ...defaultInitialValue,
          ...initialValue || {},
          _key: generateItemKey(),
        };

        if (onItemAdd && typeof onItemAdd === 'function') {
          onItemAdd(newItem);
        } else {
          props.onItemAppend(newItem);
        }

        if (isSingleBlock) {
          props.onItemOpen([
            ...props.path,
            { _key: newItem._key },
          ]);
        }
      })
    };

    const openBlockWizard = useCallback(
      (handleAdd: any) => {
        setOnItemAdd(() => handleAdd || null);
        setOpen(true);
      },
      [setOnItemAdd, setOpen]
    );

    useClickOutside(
      useCallback(() => setOpen(false), []),
      [dialogElement],
    );

    return (
      <BlocksWizardProvider openBlockWizard={openBlockWizard}>
        {props.renderDefault({
          ...props,
          arrayFunctions: ArrayFunctions,
        })}
        {open && (
          <Dialog
            id="modular-blocks-dialog"
            width={5}
            onClose={() => setOpen(false)}
            zOffset={1000}
            header={(
              <Flex align="center" justify="space-between" gap={2}>
                <Heading as="h2" size={1}>Add block</Heading>
              </Flex>
            )}
          >
            <Card paddingX={4} ref={setDialogElement}>
              <Stack space={2}>
                <Box marginTop={4} marginBottom={2} paddingY={1} marginRight={6} flex={1}>
                  <Card radius={4} tone="transparent">
                    <TextInput
                      aria-label="Search block by name"
                      placeholder="Search block by name"
                      autoComplete="off"
                      border={false}
                      clearButton={false}
                      fontSize={[2, 2, 1]}
                      icon={SearchIcon}
                      radius={2}
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.currentTarget.value)}
                      spellCheck={false}
                    />
                  </Card>
                </Box>
              </Stack>
              <BlocksPicker
                onBlockAdd={onBlockAdd}
                groupedBlockVariants={groupedBlockVariants}
              />
            </Card>
          </Dialog>
        )}
      </BlocksWizardProvider>
    );
  };
}
