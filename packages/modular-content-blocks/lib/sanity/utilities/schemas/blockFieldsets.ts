export enum BlockFieldsets {
  META = 'meta',
}

export function outerBlockFieldsets() {
  return blockFieldsets();
}

export function innerBlockFieldsets() {
  return blockFieldsets();
}

export function blockFieldsets() {
  return [
    {
      name: BlockFieldsets.META,
      title: 'Block Meta',
      description: 'Configuration and attributes for this block',
      options: {
        collapsible: true,
        collapsed: true
      },
    }
  ];
}
