# TartanHacks Registration Site

This is the frontend website for the TartanHacks Registration System.
## Backend Configuration

1. [Deploy the backend](https://github.com/ScottyLabs/tartanhacks-backend/blob/master/README.md).

2. In `next.config.js`, set the links to the  `local`, `development`, `staging`, and `production` backends.


## Getting Started
1. Install the dependencies with
```
npm install
```

2. Then, run the development server:
```
npm run dev
```

The website can then be accessed at [http://localhost:3000](http://localhost:3000)

## Styling

Global styling rules are specified in `styles/globals.css`.

The color palette, font, and screen width breakpoints are specified in `themes/theme.ts`.

The styling of elements such as buttons, icons, backgrounds etc. is specified by the `useStyle` variable in the corresponding file in `src/components/design`.

Page-specific styling is specified by `useStyle` in the file `pages/{page_path}`.