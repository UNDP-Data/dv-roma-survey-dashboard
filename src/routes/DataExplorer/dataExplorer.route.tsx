import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export default function createDataExplorerRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/data-explorer',
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./dataExplorer.lazy').then((d) => d.Route));
}
