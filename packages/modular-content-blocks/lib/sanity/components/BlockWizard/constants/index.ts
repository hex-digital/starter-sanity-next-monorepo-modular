export enum NamedWizardGroups {
  HERO = 'hero',
  NICHE = 'niche',
}

export enum AutomaticWizardGroups {
  DEFAULT = 'default', // Blocks with no group will end up in the default category
  REUSABLE = 'reusable',
}

export const wizardGroup = [
  { name: NamedWizardGroups.HERO, description: 'Hero blocks should always be the first block on the page' },
  { name: AutomaticWizardGroups.DEFAULT },
  { name: NamedWizardGroups.NICHE, description: 'Niche blocks are created for specific purposes, and should almost never be needed otherwise' },
  { name: AutomaticWizardGroups.REUSABLE, description: 'Reusable blocks can be created once and then quickly inserted into any page, e.g. to quickly scaffold landing pages' },
];

export const wizardGroupOrder = [
  NamedWizardGroups.HERO,
  AutomaticWizardGroups.DEFAULT,
  NamedWizardGroups.NICHE,
  AutomaticWizardGroups.REUSABLE,
];
