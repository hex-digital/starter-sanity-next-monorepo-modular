# Live Preview

The CMS has a Preview pane which displays an iFrame of the website in preview mode. It opens the iframe on the page of the website that corresponds to the document being previewed.

When the preview is loaded, a secret token is generated. This token authorises the user to enter the Preview mode.

The preview mode is activated by calling a `/api/sanity/draft` api in the web app. This API takes a secret token and a path name to display on the frontend. It then validates that the secret and the path name are valid and still have authorisation, as the preview mode is only valid for 1 hour.

If valid, the user is redirected to the website URL, and a draft mode cookie is activated.

The website can detect the draft mode cookie, and compares its value with one stored on the server. If they match, we know it's an authorised preview mode session, and so the website enables the preview mode client. This is done in a server middleware, so that the token is not leaked to the client.

In this preview mode, all sanity client requests are given the "preview" perspective, so that draft content can be loaded as well as published content. Furthermore, all queries are given listeners, and the data automatically updates in response to relevant events from Sanity, effectively providing real-time Live Previews to editors.

Schema Types that should have the Preview pane are defined in the schema config, `packages/config/sanity/schemaConfig.ts`, in the `PREVIEWABLE_DOCUMENT_TYPES` constant.
