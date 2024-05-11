# Troubleshooting

**Seeing an unexpected schema type in the root list of the CMS?**  
Whenever a new schema type is created, it will automatically appear in the root list in the CMS. Once you've added it to the relevant area of the CMS, you can remove it from the root list by adding its schema type name to the `DOCUMENT_TYPES_IN_STRUCTURE` constant in `/plugins/desk/index.ts`.

**Added a new schema type, but it's not appearing?**  
Once you've added the file for a new schema type in `schemas/`, make sure you also add it to the relevant `index.ts` file, under `singletons/index.ts`, `objects/index.ts`, or `documents/index.ts`, otherwise it won't be picked up by Sanity.

**"Unknown type: ABC. Valid types are: XYZ"**  
This error appears when an object type has been used in a schema, but that object type does not exist. I.E. `{ type: someType }`. It may also appear when a document or singleton type has been used in a List or ListItem, but does not exist.

This most commonly occurs when Sanity hasn't been told about a new object, document or singleton type, i.e. it hasn't been added to the appropriate array in `apps/sanity/schemas/{objects,documents,singletons}/index.ts`.

**"Found 2 members with same type, but not unique names "XYZ" in array."**  
This error appears when you have defined a field with `type: 'array'`, and two of the fields inside the `of: []` array have the same `name` field.

This most often happens when you've copied another block's schema definition, but forgotten to update the `name` field. It can also happen if you create a type with the same `name` as another type without realising.

The error will specify what the non-unique name string is, so you should be able to search the codebase and identify where it's duplicated. To fix, just change the name field to something unique.

**`null` response from a Sanity query?**  
If you're getting a `null` response from a query that you think should be working, check the syntax. Missing commas between fields are a common occurrence.

You can paste the query into the Sanity Vision tool to validate it and tweak it until you can find the issue.

**`Component not defined: Code`**
Usually happens when a dependency that Sanity is using isn't installed.

Run `pnpm i` and the problem should be fixed. If it persists, take a look at the most recent dependency
changes and check validity and correctness of all dependencies and versions.

**template id (`templateId`) is required for initial value template item nodes**
This happens when using an `initialValueTemplate` that hasn't been created already.

This happens most often when creating a new desk structure using the `regionalDocumentTypeListItem` or `regionalDocumentTypeList` helpers, but you haven't added the new schema type to the `LOCALISE_DOCUMENT_LEVEL_DOCUMENT_TYPES` config in `packages/config/sanity/schemaConfig.ts`. This is because the helpers will try to use a localised `initialValueTemplate`, which is automatically created for types in the `LOCALISE_DOCUMENT_LEVEL_DOCUMENT_TYPES` array. If it's not added, it won't be created, and will error.

Alternatively, if it's not the above, check that you're not trying to use an `initialValueTemplate` that you haven't registered yet. It will usually show you the structure path to the file that's causing the issue, above the error, so start looking there first.
