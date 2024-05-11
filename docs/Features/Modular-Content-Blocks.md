# Modular Content Blocks

Modular Content Blocks are the building blocks of our page sections.

A modular content block is designated as either a section block or an inner block. Inner blocks can only be included inside a section block.

The majority of code for creating and configuring modular content blocks can be found under `packages/modular-content-blocks`.

## Adding a new Modular Content Block

The easiest way to get started is to duplicate an existing Inner or Outer block, as required, then alter it to what you need.

However, if you want to create one from scratch, you'll need to:

- Create a new directory for your block in `packages/modular-content-blocks/blocks/{inner|outer}/.`
- Create at least 4 files:
  - `config.ts` for shared configuration for both Sanity and Web. Usually this is just the blocks name. 
  - `schema.ts`, containing the block's schema, for use with Sanity 
  - `{NAME}.tsx` for the block's React component 
  - `web.ts` to contain the block's groq query, as well as to export the config and the component, for easy import into the frontend library 

Optionally images can also be added to the directory. These are used with the Block Picker in the CMS, to show a preview of what the block may look like when selecting it. They're added to the blocks `options.variants` schema.

The block will now be available in the CMS as a Modular Content Block, and automatically pull through all fields and render all component trees. Enjoy!

**Why a Block and a CMS Block?**  
Each Modular Content Block always renders another block, usually found in `packages/ui/components`.

This approach ensures that any block sections can be used outside of the CMS' modular content flow with ease. Furthermore, it decouples the end UI from the CMS, so that if the CMS block schema needs to change, we only need to change the CMS block, and not every instance of the UI block across the codebase.
