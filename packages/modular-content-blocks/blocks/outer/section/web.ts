import groq from 'groq';

export { component } from './CmsSection';
export { config } from './config';

/**
 * When loading this Block in a modular content block, the below query will be added to the
 * overall query. It will be scoped to this specific block.
 *
 * When using an empty string, all fields will be included.
 * If you need to follow references, rename fields, or do anything else other than
 * get fields, then add these extra bits to the groq export below.
 *
 * If your schema has inner blocks, that field must be called `content`. This is because we include
 * the inner blocks under the key `content`, so that we only need to include them once, saving on query size.
 *
 * The final query for outer blocks will look like:
 * {
 *   ...,
 *   content[] {
 *     ...,
 *     // INNER BLOCK QUERY PART
 *   },
 *   _type == "YOUR_BLOCK" => {
 *     // YOUR_QUERY_PART,
 *   }
 * }
 *
 * The _type == "YOUR_BLOCK" will be excluded if the below query is empty, or "..." three dots.
 */
export const query = groq``;

