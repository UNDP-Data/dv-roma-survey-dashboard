import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { metaDataDefinition } from '@/utils/metaDataDefinition';

export default function createAboutRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/resources',
    head: () =>
      metaDataDefinition({
        path: '/resources',
        description: 'Roma Socio-Economic Scoreboard resources',
      }),
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./resources.lazy').then((d) => d.Route));
}
