import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export default function createCountriesRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/countries',
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./countriesListing.lazy').then((d) => d.Route));
}
