import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export default function createCountryPageRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/countries/$countryId',
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./countryPage.lazy').then((d) => d.Route));
}
