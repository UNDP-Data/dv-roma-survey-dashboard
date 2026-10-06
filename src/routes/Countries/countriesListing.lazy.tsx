import { createLazyRoute, Link } from '@tanstack/react-router';
import { Card, CardHeader, CardImage, CardTitle } from '@undp/design-system-react/Card';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H1 } from '@undp/design-system-react/Typography';
import { COUNTRIES } from '@/Constants';

export function CountriesListing() {
  return (
    <div className='mx-auto my-8 w-full max-w-[1920px] px-4'>
      <H1 size='sm'>Countries</H1>
      <Spacer size='2xl' />
      <Grid noOfCol={{ base: 1, sm: 2, md: 3, lg: 4 }}>
        {COUNTRIES.map((d) => (
          <GridItem key={d.name}>
            <Link to='/countries/$countryId' params={{ countryId: d.isoCode }}>
              <Card
                className='h-full'
                backgroundColor='background'
                size='full'
                variant='with-image'
              >
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

export const Route = createLazyRoute('/countries')({
  component: CountriesListing,
});
