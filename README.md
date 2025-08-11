# Resource Explorer

A polished, single-page React application for exploring the Rick and Morty universe! This app lets you browse, search, filter, sort, and favorite characters, providing a fast and delightful user experience. Built with the latest React, TanStack Query & Router, and modern state management, it demonstrates best practices in UI/UX, code structure, and data handling.

---

## ✨ Features

- **Character List & Detail View**: Browse all Rick and Morty characters with paginated results. Click any character to view detailed information on a dedicated page.
- **Search (Debounced + Cancel on Change)**: Type in the search bar to filter by name. Input is debounced (~500ms) and any in‑flight request is cancelled when the query changes, ensuring fast and consistent results.
- **Filter & Sort**: Use the filter bar to refine by status (Alive, Dead, Unknown) and gender. Sorting options are also available within the filter component.
- **Favorites**: Mark characters as favorites from both the list and detail views. Favorites are persisted in your browser (localStorage) and easily accessible via the Favorites drawer.
- **URL State Sync**: All search, filter, sort, and pagination states are reflected in the URL (e.g., `/character?page=3&status=alive&gender=male`). This makes sharing and reloading safe and reliable.
- **Loading & Error Handling**: Enjoy smooth skeleton loaders and clear error messages with retry/clear options.
- **Theme Toggle**: Switch between light and dark themes. Your preference is remembered.
- **Responsive & Accessible**: Designed to work beautifully on all devices, with semantic HTML and keyboard-friendly controls.

---

## 🚀 Getting Started

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd resourceexplorer
```

### 2. Install Dependencies

```sh
pnpm install
# or
yarn install
# or
npm install
```

### 3. Run the App

```sh
pnpm dev
# or
yarn dev
# or
npm run dev
```

Visit [http://localhost:5173/character](http://localhost:5173/character) to start exploring!

---

## 🧭 How to Use

- **Search**: Type a character's name; results update after a short pause (debounced). Press Enter to search immediately.
- **Filter & Sort**: Use the filter bar to select status, gender, or sort order. The list updates and the URL reflects your choices.
- **Pagination**: Navigate between pages using the pagination controls at the bottom.
- **Favorites**: Click the heart icon on any character card or detail page to add/remove from favorites. Access all favorites via the Favorites button in the header.
- **View Details**: Click any character card to see detailed info on a separate page.
- **Theme**: Toggle between light and dark mode using the theme switcher in the header.

---

## 🛠️ Architecture & Custom Hooks

- **React 18+** with TypeScript
- **TanStack Query** for data fetching, caching, and background refetching
- **Request cancellation**: In‑flight requests are cancelled on input changes via TanStack Query passing `AbortSignal` to fetch.
- **TanStack Router** for client-side routing and URL state management
- **Context API & useState** for global and local state
- **Performance‑oriented React patterns**: Strategic use of `useMemo` and `useCallback` across pages, contexts, and UI components to minimize unnecessary re‑renders and computations.
- **Custom Hooks**:

  - `useCharacters`: Fetches and manages character data, handles loading, error, and pagination states.
  - `useFavorites`: Manages favorite characters, persists to localStorage, and provides add/remove logic.

- **Component Structure**:
  - `SearchBar`: Handles search input and triggers queries
  - `FilterBar`: Manages filtering and sorting options
  - `CharacterCard`: Displays character info and favorite toggle
  - `Pagination`: Handles page navigation
  - `MyFavorites`: Drawer for viewing all favorited characters
  - `ThemeToggle`: Switches between light and dark themes

### Performance details

- Memoized derived data: Searched and filtered character lists are computed with `useMemo` to avoid recalculating when unrelated state changes.
- Stable handlers: Event handlers such as search submit/clear, filter changes, pagination, character click, and favorites operations are wrapped with `useCallback` so child components don’t re-render unnecessarily.
- Debounced search: The `SearchBar` debounces input and cancels previous timers to limit network calls and computations.
- Cached fetching: TanStack Query caches results and performs background updates for snappy UX with minimal recomputation.

---

## 🌐 API Reference

This app uses the [Rick and Morty API](https://rickandmortyapi.com/). To explore more endpoints (episodes, locations, etc.), visit their [documentation](https://rickandmortyapi.com/documentation). The current app focuses on the `/character` endpoint, supporting deep search, filter, and pagination:

- Example: `http://localhost:5173/character?page=3&status=alive&gender=male`
- Example: `http://localhost:5173/character?status=alive&gender=male`

---

## 📝 Trade-offs & Notes

- **URL as Source of Truth**: All list state (search, filter, sort, page) is synced to the URL for shareability and reload safety.
- **Favorites**: Persisted in localStorage for a seamless experience across sessions.
- **Error & Loading States**: Skeletons and clear error messages ensure a smooth UX.
- **State Management**: Context and useState are used for simplicity and clarity, avoiding unnecessary complexity.
- **Performance**: TanStack Query provides caching and background refetching for snappy data updates; debouncing and cancellation reduce unnecessary work and race conditions.

---

## 🧪 What’s Next (Not Yet Implemented)

- **Virtualized List**: For 100+ items, use a library like `react-window` to render only visible items for better performance.

---

## 📚 Explore More

To discover more about the available API routes and data, visit the [Rick and Morty API documentation](https://rickandmortyapi.com/documentation). The app currently focuses on characters, but you can extend it to episodes, locations, and more!

---

## 💡 Questions or Feedback?

Feel free to open an issue or PR!

---

### Happy exploring! 🚀
