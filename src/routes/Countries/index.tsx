import type { AnyRoute } from '@tanstack/react-router';
import { createRoute, Link } from '@tanstack/react-router';
import { Card, CardHeader, CardImage, CardTitle } from '@undp/design-system-react/Card';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H1 } from '@undp/design-system-react/Typography';

export function CountriesListing() {
  const countryList = [
    { id: 'MKD', name: 'North Macedonia' },
    { id: 'MDA', name: 'Moldova' },
    { id: 'MNG', name: 'Mongolia' },
    { id: 'MNE', name: 'Montenegro' },
  ];
  return (
    <div className='mx-auto my-8 w-full max-w-[1920px] px-4'>
      <H1 size='sm'>Countries</H1>
      <Spacer size='2xl' />
      <Grid noOfCol={{ base: 1, sm: 2, md: 3, lg: 4 }}>
        {countryList.map((d) => (
          <GridItem key={d.name}>
            <Link to='/{-$locale}/countries/$countryId' params={{ countryId: d.id }}>
              <Card className='h-full' backgroundColor='white' size='full' variant='with-image'>
                <CardHeader>
                  <CardImage src='/imgs/resources-01' />
                  <CardTitle>{d.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
}

export default function createCountriesRoute(parentRoute: AnyRoute) {
  return createRoute({
    path: '/countries',
    component: CountriesListing,
    getParentRoute: () => parentRoute,
  });
}
