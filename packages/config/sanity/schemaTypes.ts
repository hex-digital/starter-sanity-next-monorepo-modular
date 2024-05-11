/**
 * List of all the schema types we use in Sanity, as constants.
 * This allows us to refer to them by their constant symbol, rather than a magic string, in both
 * the Sanity Studio app, and the web app.
 */

// !!!!!!                         !!!!!!!!                              !!!!!! //
// DO NOT CHANGE THE VALUES OF THESE CONSTANTS WITHOUT CAREFUL CONSIDERATION.  //
//     CHANGING THE VALUES WILL CAUSE CONTENT TO DISAPPEAR FROM THE CMS        //
// !!!!!!                         !!!!!!!!                              !!!!!! //
export enum DOCUMENT {
  PAGES = 'pages',

  CONFIG_REUSABLE_BLOCKS = 'config.reusableBlocks',
  CONFIG_REDIRECTS = 'config.redirects',

  MEDIA_TAG = 'media.tag', // Added by the Sanity Media Plugin
}

export enum OBJECT {
  MODULAR_OUTER_BLOCKS = 'modularContentBlocks.outer',
  MODULAR_INNER_BLOCKS = 'modularContentBlocks.inner',

  MODULAR_OUTER_BLOCK_SECTION = 'modularContentBlocks.outer.section',

  IMAGE_WITH_ALT = 'imageWithAlt',
}

export enum SINGLETON {
  THEME = 'theme',
  CONFIG_SEO = 'config.seo',
}
