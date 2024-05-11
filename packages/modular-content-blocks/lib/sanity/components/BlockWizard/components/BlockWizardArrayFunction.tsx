import { useContext } from 'react';
import { Button } from '@sanity/ui';
import { AddIcon } from '@sanity/icons';
import { BlocksWizardContext } from '../contexts/BlockWizard';

export function ArrayFunctions() {
  const { openBlockWizard } = useContext(BlocksWizardContext);

  return (
    <Button
      text="Add item..."
      icon={AddIcon}
      mode="ghost"
      onClick={() => openBlockWizard()}
    />
  );
}
