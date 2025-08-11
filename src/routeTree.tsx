import {
  createRootRoute,
  createRoute,
  Outlet,
  useParams,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CharactersPage } from "./pages/CharactersPage";
import { CharacterDetailPage } from "./pages/CharacterDetailPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

export const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </QueryClientProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
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
  characterDetailRoute,
]);
