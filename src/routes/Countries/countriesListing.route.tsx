import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { metaDataDefinition } from '@/utils/metaDataDefinition';

export default function createCountriesRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/countries',
    head: () =>
      metaDataDefinition({
        path: '/countries',
        description: 'Roma Socio-Economic Scoreboard countries',
      }),
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./countriesListing.lazy').then((d) => d.Route));
}
