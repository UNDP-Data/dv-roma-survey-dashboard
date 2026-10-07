import { useQuery } from '@tanstack/react-query';
import { createLazyRoute, Link, useParams } from '@tanstack/react-router';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { Badge } from '@undp/design-system-react/Badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@undp/design-system-react/Breadcrumb';
import { Button } from '@undp/design-system-react/Button';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import {
  PageHeader,
  PageHeaderContent,
  PageHeaderHead,
} from '@undp/design-system-react/PageHeader';
import { Separator } from '@undp/design-system-react/Separator';
import { Spacer } from '@undp/design-system-react/Spacer';
import { Spinner } from '@undp/design-system-react/Spinner';
import { H1, H3, H4, H5, P } from '@undp/design-system-react/Typography';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { COUNTRIES, THEMES } from '@/Constants';
import type { RecommendationDataType } from '@/types';
import ScrollyTellingViz from './Components/ScrollyTellingViz';

function useRecommendationsData(isoCode: string) {
  return useQuery({
    queryKey: ['recommendations', isoCode],
    queryFn: () =>
      fetchAndParseJSON(`/data/recommendation/${isoCode}.json`) as Promise<
        RecommendationDataType[]
      >,
  });
}
export function CountryPage() {
  const params = useParams({ strict: false });
  const countryCode: string = params.countryId || 'MDA';
  const { data: recommendations, isLoading, isError } = useRecommendationsData(countryCode);
  const country = COUNTRIES.find((country) => country.isoCode === countryCode)?.name;
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);
  return (
    <div className='w-full antialiased'>
      <section id='header' className='mx-auto w-full'>
        <PageHeader backgroundImage='/imgs/country_hero.webp' contentMode='dark'>
          <PageHeaderHead>
            <Breadcrumb variant='reverse'>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/countries'>Countries</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{country}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </PageHeaderHead>
          <PageHeaderContent className='@2xl:w-1/3'>
            <H1 size='sm'>Lives on narrow margins in {country}</H1>
            <H4 marginBottom='none'>Barriers, opportunities and strategies of Roma</H4>
          </PageHeaderContent>
        </PageHeader>
      </section>
      <Spacer size='8xl' />
      <Spacer size='8xl' />
      <section id='intro-text' className='mx-auto w-full px-4'>
        <div className='mx-auto max-w-190'>
          <H3 marginBottom='none'>
            For Roma in Moldova, building a future means navigating compounding disadvantages in an
            uncertain present.
          </H3>
          <Spacer size='2xl' />
          <P>
            Roma face disadvantages across education, work, housing, health and public services —
            with discrimination cutting through all of them. These pressures compound: exclusion in
            one area narrows what is possible in the next, so barriers accumulate within households
            and carry across generations.
          </P>
          <P>
            Shared barriers affect people differently depending on circumstance. Gender, age or
            place pull households onto different paths — a young woman who leaves school when she
            marries, a man who moves between countries for seasonal work, an older person without
            insurance in a village where the nearest service is a bus ride away.
          </P>
          <P>
            Despite this, Roma families continue to pursue better lives. They assemble strategies
            from seasonal, informal or entrepreneurial work, undertake care and housing labour for
            each other, and strive for their children to stay at school. They are resilient —
            managing what the day demands while aspiring for better and secure lives.
          </P>
        </div>
      </section>
      <Spacer size='8xl' />
      <Spacer size='8xl' />
      <section id='scrolly' className='mx-auto w-full'>
        <ScrollyTellingViz />
      </section>
      <Spacer size='6xl' />
      <section id='themes' className='mx-auto w-full px-4 py-16'>
        <div className='mx-auto max-w-7xl'>
          <H4 weight='bold'>Read the full story behind each theme</H4>
          <Spacer size='2xl' />
          <Grid noOfCol={{ base: 1, sm: 2, md: 3, lg: 5 }} gap='16px'>
            {THEMES.map((theme) => (
              <GridItem key={theme.id} className='group cursor-pointer'>
                <div className='flex h-full min-h-87.5 flex-col border border-stroke px-0 pb-5'>
                  <div className='h-1.5 w-full' style={{ backgroundColor: `var(--${theme.id})` }} />
                  <Spacer size='2xl' />
                  <div className='px-5'>
                    <Badge
                      style={{
                        backgroundColor: `var(--${theme.id}-light)`,
                        color: `var(--${theme.id})`,
                      }}
                    >
                      {theme.name}
                    </Badge>
                  </div>
                  <Spacer size='xl' />
                  <P size='xl' marginBottom='none' className='grow px-5'>
                    {theme.description}
                  </P>
                  <Spacer size='4xl' />
                  <div className='px-5 py-5'>
                    <Button variant='link' endIcon='arrow-2' padding='none'>
                      Read more
                    </Button>
                  </div>
                </div>
              </GridItem>
            ))}
          </Grid>
        </div>
      </section>
      <Spacer size='6xl' />
      <section
        id='recommendations'
        className='mx-auto w-full bg-secondary px-4 py-16 text-content-reverse'
      >
        <div className='mx-auto max-w-7xl'>
          <H4 weight='bold'>Recommendations</H4>
          <Spacer size='2xl' />
          {isLoading && <Spinner size='lg' className='mx-auto my-20' />}
          {isError && <P>Error loading recommendations</P>}
          {recommendations && !isLoading && !isError && (
            <Grid noOfCol={{ base: 1, sm: 1, md: 1, lg: 1 }} gap='16px'>
              {recommendations.map((recommendation) => (
                <GridItem
                  key={recommendation.themeId}
                  className='bg-background text-content-primary'
                >
                  <button
                    type='button'
                    aria-expanded={selectedRecommendation === recommendation.themeId}
                    className='flex w-full flex-col items-start bg-background px-0 pb-5'
                    onClick={() =>
                      setSelectedRecommendation(
                        selectedRecommendation === recommendation.themeId
                          ? null
                          : recommendation.themeId,
                      )
                    }
                  >
                    <div
                      className='h-1.5 w-full'
                      style={{ backgroundColor: `var(--${recommendation.themeId})` }}
                    />
                    <Spacer size='2xl' />
                    <div className='px-5'>
                      <Badge
                        style={{
                          backgroundColor: `var(--${recommendation.themeId}-light)`,
                          color: `var(--${recommendation.themeId})`,
                        }}
                      >
                        {THEMES.find((d) => d.id === recommendation.themeId)?.name}
                      </Badge>
                    </div>
                    <Spacer size='xl' />
                    <div className='flex w-full items-center justify-between px-5'>
                      <H4 weight='bold' marginBottom='none'>
                        {recommendation.mainRecommendation}
                      </H4>
                      {selectedRecommendation === recommendation.themeId ? (
                        <Minus size={20} />
                      ) : (
                        <Plus size={20} />
                      )}
                    </div>
                  </button>
                  {selectedRecommendation === recommendation.themeId && (
                    <div className='p-5'>
                      {recommendation.detailedRecommendations.map((d, i) => (
                        <P
                          key={d}
                          marginBottom='none'
                          className={
                            i < recommendation.detailedRecommendations.length - 1
                              ? 'border-stroke border-b py-3'
                              : 'pt-3'
                          }
                        >
                          {d}
                        </P>
                      ))}
                    </div>
                  )}
                </GridItem>
              ))}
            </Grid>
          )}
          <Spacer size='4xl' />
          <Separator color='background' className='opacity-20' />
          <Spacer size='4xl' />
          <H4 weight='bold'>What's next</H4>
          <Spacer size='2xl' />
          <Grid noOfCol={{ base: 2, sm: 2, md: 2, lg: 2 }} gap='16px'>
            <GridItem className='group cursor-pointer bg-background text-content-primary'>
              <div className='flex h-full w-full flex-col p-8'>
                <H5 weight='bold'>Download the full report</H5>
                <P size='base' className='grow'>
                  Findings, personal accounts, methodology and recommendations for Roma in Moldova.
                </P>
                <Spacer size='2xl' />
                <div>
                  <Button variant='link' endIcon='download' padding='none'>
                    Download
                  </Button>
                </div>
              </div>
            </GridItem>
            <GridItem className='group cursor-pointer bg-background text-content-primary'>
              <Link to='/data-explorer'>
                <div className='flex h-full w-full flex-col p-8'>
                  <H5 weight='bold'>Explore the data</H5>
                  <P size='base' className='grow'>
                    Every indicator for Roma and nearby non-Roma, with breakdowns by sex, age and
                    place.
                  </P>
                  <Spacer size='2xl' />
                  <div>
                    <Button variant='link' endIcon='arrow' padding='none'>
                      Open data explorer
                    </Button>
                  </div>
                </div>
              </Link>
            </GridItem>
          </Grid>
        </div>
      </section>
      <section id='explore-other-countries' className='mx-auto w-full bg-surface px-4 py-16'>
        <div className='mx-auto max-w-7xl'>
          <H4 weight='bold'>Other countries</H4>
          <Spacer size='2xl' />
          <Grid noOfCol={{ base: 2, sm: 2, md: 2 }} gap='16px'>
            {COUNTRIES.filter((d) => d.isoCode !== countryCode).map((country) => (
              <GridItem
                key={country.id}
                className='group cursor-pointer bg-background text-content-primary'
              >
                <Link to='/countries/$countryId' params={{ countryId: country.id }}>
                  <div className='flex h-full flex-col border border-stroke px-0 pb-5'>
                    <div className='h-1.5 w-full' style={{ backgroundColor: `var(--secondary)` }} />
                    <Spacer size='3xl' />
                    <H5 weight='bold' className='px-5'>
                      {country.name}
                    </H5>
                    <P size='base' className='grow px-5'>
                      How Roma households compare with their neighbours in {country.name}.
                    </P>
                    <Spacer size='2xl' />
                    <div className='px-5'>
                      <Button variant='link' endIcon='arrow' padding='none'>
                        Open data explorer
                      </Button>
                    </div>
                  </div>
                </Link>
              </GridItem>
            ))}
          </Grid>
        </div>
      </section>
    </div>
  );
}

export const Route = createLazyRoute('/countries/$countryId')({
  component: CountryPage,
});
