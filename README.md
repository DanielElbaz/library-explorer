# Library Explorer

React + TypeScript mini app for browsing the provided `books.json` catalog. The UI focuses on clean state management and typed props.

## Highlights
- Loads books on mount via a small `fetchBooks` wrapper with loading/error states.
- Search (title/author), tag select, min-rating control, sort (title/rating), and favorites-only toggle can be combined; active state is stored in local component state.
- Book list items are split into `BookList` and `BookItem` for clearer structure. All props/state use strict TypeScript types defined in `src/types.ts`.
- Favorites persist through `localStorage`, and empty states explain what to do next.

## Run It
```bash
npm install
npm start        # http://localhost:3000
npm test         # unit tests (React Testing Library)
```

## Decisions & Trade-offs
- Hard-coded tag options keep the UI predictable; they can be derived from data later if the dataset becomes dynamic.
- Local component state was favored over heavier state libraries because the requirements fit comfortably in a single tree.
- Styles stay inline for speed and because it is minor style needed; 
