import {
  createRootRoute,
  createRoute,
  Outlet,
  useParams,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CharactersPage } from "./pages/CharactersPage";
import { CharacterDetailPage } from "./pages/CharacterDetailPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchInterval: 6 * 60 * 1000,
      staleTime: 6 * 60 * 1000, // 6 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

export const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Outlet />
      </div>
    
    </QueryClientProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => {
    window.location.replace("/character");
    return null;
  },
});

//! create the new character list route
const characterListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/character",
  component: CharactersPage,
});

const characterDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/character/$characterId",
  component: function CharacterDetail() {
    const { characterId } = useParams({ from: "/character/$characterId" });
    return <CharacterDetailPage characterId={characterId} />;
  },
});

// Create the route tree
export const routeTree = rootRoute.addChildren([
  indexRoute,
  characterListRoute,
  characterDetailRoute,
]);
