# TartanHacks Registration Site

This is the frontend website for the TartanHacks Registration System.

## Backend Configuration

1. [Deploy the backend](https://github.com/ScottyLabs/tartanhacks-backend/blob/master/README.md).

2. In `next.config.js`, set the links to the  `local`, `development`, `staging`, and `production` backends.

## Getting Started

Install the dependencies and run the server via [Bun](https://bun.sh):

```
bun install
bun run build
bun start
```

After running these commands, you will see the changes on [http://localhost:3000](http://localhost:3000/)

## Contributing

Claim an [issue](https://github.com/ScottyLabs/tartanhacks-registration/issues) by assigning it to yourself. Then, create a branch for the issue you're working on. Follow the `<feature>` naming convention for your branch.

e.g. `Add-Prettier-Support`

## Merging your PR

After you finish working on your feature, create a new [PR](https://github.com/ScottyLabs/tartanhacks-registration/pulls) and request someone to review it.


The website can then be accessed at [http://localhost:3000](http://localhost:3000)

## Styling

Global styling rules are specified in `styles/globals.css`.

The color palette, font, and screen width breakpoints are specified in `themes/theme.ts`.

The styling of elements such as buttons, icons, backgrounds etc. is specified by the `useStyle` variable in the corresponding file in `src/components/design`.

Page-specific styling is specified by `useStyle` in the file `pages/{page_path}`.