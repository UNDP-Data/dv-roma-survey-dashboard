import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export default function createAboutRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/about',
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./about.lazy').then((d) => d.Route));
}
