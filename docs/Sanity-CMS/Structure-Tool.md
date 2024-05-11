# Structure Tool

The Structure Tool is the UI that editor's use to view and edit content.

While Sanity provides numerous functions to create UI for our schema types, we can also fully customise
the structure tool, or any element within it, such as lists, list items, preview, views, fields, components, branding, etc.

The structure tool is composed using files found in `apps/sanity/plugins/structure/...`. The entry point
for the structure tool is the `index.ts` file in this location. This files contains the structure, as well
as the default document node. Both of these are imported into `sanity.config.ts`, where the structure plugin
is imported and set at the top level.

## Schema Types in the Structure Tool

> If you haven't read up on Schema Types yet, or don't know the difference between a Document, Singleton, and an Object, please see [the schemas documentation here](./Schema-Types.md).

Most of our content is shown in some form of a list, and clicking on a document in that list will open
a child view, showing the fields for that schema type. They can then be edited and saved.

The functionality available is often dependent on the schema type, and the view used to render that schema type. We configure the default document node to decide what views are available for most content types. The Structure Tool structure can then show different views for different content, where needed.

## Documents

Most content is a document, and these types are usually shown in a single list per schema type, showing all content for this schema type. Clicking on an item in this list will show the fields to edit, and sometimes will also show an SEO Preview or a Live Preview, depending on what it is for.

## Singletons

Singleton schema types are types where we only ever have a single document of this type (or one per locale, for singletons localised at the document-level). This is enforced in the UI, as we never show them in lists, and instead, clicking on them in the structure will immediately show their fields to edit, instead of a list.

#### Translations of Singletons

Translations can be created up-front, via a CLI script. This will ensure they all exist and
are correctly linked together as translations. This script can be found in `apps/sanity/scripts/createRegionalSingletons.ts`

If, however, some already exist, or new languages are added for example, then create the new page in the new locale, and link them together using Skeleton Key > Translation Meta.

### "Singleton Documents" or "Pre-set ID Documents"

There is a special case for Documents, whereby a single document of a certain type is used in a similar way to a singleton, but without being a special Singleton type. This is common for Homepages or Section Homes, which are of a certain document type ("Page"), but which don't appear in a list. Instead, clicking on it will show a document of a specific, pre-set ID.

This is accomplished by specifying a document ID in the structure tool for this document, allowing us to click on it an edit it. However, it's still a "Page" type, so will still be available as a parent page for anything that can have Pages as the parent, and it will have the fields of a Page schema type.

We accomplish this in the following manner:

- When creating the Structure, we provide a specific Document ID for the list item
- We create that Document ID using the `singletonDocIdByName` function (`packages/sanity-utils/singletonDocId.ts`)
- This function requires a SINGLETON_DOCUMENT string to ensure it's unique (`packages/config/sanity/singletons.ts`)
- When showing documents, we specifically exclude those that start with `singleton-` using a filter on the list (e.g. in `apps/sanity/plugins/structure/utils/regionalDocumentListItem.ts`)

Now when we click on the item, it will open this specific document (or create it if it doesn't exist yet), and it won't appear in other lists for this document type.

#### Translations of a Singleton Document

As with Singletons, translations can be created up-front, via a CLI script. This will ensure they all exist and
are correctly linked together as translations. This script can be found in `apps/sanity/scripts/createRegionalSingletons.ts`

If, however, some already exist, or new languages are added for example, then create the new page in the new locale, and link them together using Skeleton Key > Translation Meta.
