import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { COUNTRIES } from '@/Constants';
import { metaDataDefinition } from '@/utils/metaDataDefinition';

export default function createCountryPageRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/countries/$countryId',
    head: ({ params }) => {
      const countryName = COUNTRIES.find((d) => d.isoCode === params.countryId)?.name;
      return metaDataDefinition({
        path: `/countries/${params.countryId}`,
        title: `Roma Socio-Economic Scoreboard | ${countryName}`,
        description: `The Roma Socio-Economic Scoreboard is a snapshot of key social and economic indicators based on harmonized, comparable data from household surveys across ${countryName}`,
      });
    },
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./countryPage.lazy').then((d) => d.Route));
}
