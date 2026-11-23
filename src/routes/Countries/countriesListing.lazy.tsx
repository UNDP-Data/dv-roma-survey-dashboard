import { createLazyRoute, Link } from '@tanstack/react-router';
import { Button } from '@undp/design-system-react/Button';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { PageSection } from '@undp/design-system-react/PageSection';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H2, H5, P } from '@undp/design-system-react/Typography';
import { COUNTRIES } from '@/Constants';
import { CardEl } from '@/components/CardEl';

export function CountriesListing() {
  return (
    <PageSection>
      <H2>Explore countries</H2>
      <Spacer size='2xl' />
      <Grid noOfCol={{ base: 1, sm: 2, md: 4 }} gap='16px'>
        {COUNTRIES.map((country) => (
          <GridItem
            key={country.isoCode}
            className='group cursor-pointer bg-background text-content-primary'
          >
            <Link to='/countries/$countryId' params={{ countryId: country.isoCode }}>
              <CardEl isHoverable>
                <H5>{country.name}</H5>
                <P size='base' className='grow' marginBottom='none'>
                  How Roma households compare with their neighbours in {country.name}.
                </P>
                <Spacer size='2xl' />
                <div>
                  <Button variant='link' endIcon='arrow' padding='none'>
                    Explore country
                  </Button>
                </div>
              </CardEl>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </PageSection>
  );
}

export const Route = createLazyRoute('/countries')({
  component: CountriesListing,
});
