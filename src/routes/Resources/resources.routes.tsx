import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export default function createAboutRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/resources',
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./resources.lazy').then((d) => d.Route));
}
