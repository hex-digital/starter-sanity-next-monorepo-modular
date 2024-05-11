# Sanity Schema Types

Schema Types are definitions of your CMS data types and what fields they possess. They are code that controls what content you have, what fields your content has, formatting for those fields, and presentation of your content previews.

Schema Types are definitions of your CMS data types and what fields they possess.

## Schema Categories

There are 3 categories of schema: Documents, Singletons, and Objects.

**Documents**

Documents are the most conventional category of schema. They define a list of documents, such as Pages, Authors, or Blog Posts.

**Singletons**

Singletons are a special kind of Document, in that there's only ever one of them for each Singleton Schema Type. Examples include Site Configuration, or Theme settings.

**Objects**

Objects are what you may consider Partials. They define a pre-set configuration of fields that can be re-used across other Schema Types. Examples include the Link object, which provides pre-set fields for adding links to other content.

## Adding a New Schema Type

When adding a new schema type, there are 3 stages:

1. Creating the Schema Type and adding Fields
2. Telling Sanity to use the new Schema Type
3. Adding the Schema Type to relevant Schema Configuration

### 1. Creating the Schema Type and adding Fields

To create a new Schema Type, first decide whether it's a Document, Singleton or an Object. Then, create a new file within the relevant folder inside of `./schemas`.

The filename for Documents should be plural (e.g. `legalPages.ts`), while the filename for Objects and Singletons should be singular (e.g. `navigation.ts`).

Then, add your Fields to the new Schema Type, following [Sanity documentation](https://www.sanity.io/docs/schema-field-types) and other existing files as references.

Note that the Schema `name` should always be a constant, as we'll need to use it in several places. The schema constants can be found in `packages/config/sanity/schemas/index.ts`.

### 2. Telling Sanity to use the new Schema Type

Once you've created your new Schema Type, you need to tell Sanity to start using it.

To do this, add it to the `index.ts` file for the schema category, i.e. `apps/sanity/schemas/{documents/singletons/objects}/index.ts`.

(Note: this object is imported in `./schemas/index.ts`, where it is then given to Sanity to start using as a Schema Type)

### 3. Adding the Schema Type to relevant Schema Configuration

Certain Schema Types require certain features in the editor, such as whether they should have a Live Preview, SEO Preview, field-level translations, and more.

This configuration is controlled centrally, in `packages/config/sanity/schemaConfig.ts`.

Whenever you add a new Schema Type, it's important to also add it to this configuration in the appropriate places.

Open the config file, and add the name of the schema to each relevant configuration option. See the comments in the file for more information about each.

### 4. Add the schema type to appropriate areas of the CMS

The CMS "studio view" is controlled by the "desk" plugin. This can be found in `apps/sanity/plugins/desk/`. You may want the schema type to show in the CMS, which can be achieved within this directory.

The new schema type will automatically appear in the root pane of the CMS, underneath the markets. To remove this, add the schema type to the `DOCUMENT_TYPES_IN_STRUCTURE` array. This is recommended once you've added it to an appropriate place in the desk structure.

## Default Templates for content schema types

Each Schema Type can load a page template by default. The component to load is defined in `apps/web/config/sanity/config.ts`.
