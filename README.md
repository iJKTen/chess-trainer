# Chess Opening Trainer

An interactive chess opening trainer that helps you memorize and practice popular chess openings. Built with React, TypeScript, and Vite.

## Features

- Practice chess openings as white or black
- Move validation against expected opening lines
- Wrong move feedback with visual highlight and error sound
- Distinct sounds for moves and captures (sourced from Lichess)
- Chess.com-style green board theme with coordinate labels
- Responsive layout that scales to any viewport, including mobile
- Play Again / Next Opening controls on completion

## Tech Stack

- [React](https://react.dev/) with TypeScript
- [Vite](https://vite.dev/) for development and builds
- [Chessground](https://github.com/lichess-org/chessground) for the interactive board
- [chess.js](https://github.com/jhlywa/chess.js) for move validation and game logic

## Getting Started

```bash
npm install
npm run dev
```

## Adding Openings

Openings are defined in `src/data/openings.json`. Each opening has a name, the color you play as, and a list of moves in SAN notation:

```json
{
  "name": "italian game",
  "color": "white",
  "moves": ["e4", "e5", "Nf3", "Nc6", "Bc4"]
}
```

The openings file is lazy-loaded via dynamic `import()` so it is code-split into its own chunk and fetched after the initial page render, keeping the main bundle small.

## Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start dev server with HMR    |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run ESLint                   |
