# figma-page-drawer

A lightweight Figma page generation skill focused on:

- collecting page requirements
- generating visible Figma pages via Development Plugin code
- supporting iterative updates on existing pages
- keeping page state for later refinement
- preparing output for downstream design-to-code / Vue implementation

## Features

- requirement form
- modification form
- screenshot reference metadata support
- page state file
- dashboard/list/form/detail/mobile templates
- build script
- update script
- tests with Vitest

## Scripts

- `pnpm test`
- `pnpm build:dashboard`
- `pnpm build:list`
- `pnpm build:update`

## Notes

First version uses full-page regeneration instead of node-level patching.
