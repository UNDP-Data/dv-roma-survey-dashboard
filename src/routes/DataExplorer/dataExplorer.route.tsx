import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { metaDataDefinition } from '@/utils/metaDataDefinition';

export default function createDataExplorerRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/data-explorer',
    head: () =>
      metaDataDefinition({
        path: '/data-explorer',
        description: 'Roma Socio-Economic Scoreboard data explorer',
      }),
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./dataExplorer.lazy').then((d) => d.Route));
}
