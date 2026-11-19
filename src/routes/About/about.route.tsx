import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { metaDataDefinition } from '@/utils/metaDataDefinition';

export default function createAboutRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/about',
    head: () =>
      metaDataDefinition({
        path: '/about',
        description: 'About Roma Socio-Economic Scoreboard',
      }),
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./about.lazy').then((d) => d.Route));
}
