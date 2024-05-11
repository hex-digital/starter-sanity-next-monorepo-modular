# Sanity + Next Monorepo

A monorepo powered by [Next.js](https://nextjs.org/) and [SanityCMS](https://www.sanity.io/).

The repo has two apps in it that can be deployed separately: `apps/web` and `apps/sanity`

These apps are powered by workspace packages that are shared between the apps. These are all available at `packages/...`

pnpm manages dependencies automatically for all apps and packages, maintaining a central `pnpm-lock.yaml` file, and symlinking node_modules into their respective directories for use.

## Documentation

For an overview of the repository, development setup instructions, and general feature documentation, [please see the docs directory](./docs/0.Start-Here.md)
