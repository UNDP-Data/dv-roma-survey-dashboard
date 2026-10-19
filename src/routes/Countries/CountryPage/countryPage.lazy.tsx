import { useQuery } from '@tanstack/react-query';
import { createLazyRoute, Link, useParams } from '@tanstack/react-router';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@undp/design-system-react/Breadcrumb';
import { Button } from '@undp/design-system-react/Button';
import { Drawer, DrawerContent, DrawerTrigger } from '@undp/design-system-react/Drawer';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { MarkdownRenderer } from '@undp/design-system-react/MarkdownRenderer';
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
import { COUNTRIES } from '@/Constants';
import { CardEl } from '@/components/CardEl';
import type {
  FullStoryDataType,
  RecommendationDataType,
  ScrollySectionDataType,
  Themes,
} from '@/types';
import CountryNarrative from './Components/CountryNarrative';
import { FullStory } from './Components/FullStory';

function usePageContentData(isoCode: string) {
  return useQuery({
    queryKey: ['get-page-content', isoCode],
    queryFn: () =>
      fetchAndParseJSON(`/countryContent/${isoCode}/mainPage.json`) as Promise<{
        intro: { title: string; content: string };
        scrollyTelling: ScrollySectionDataType[];
        recommendations: RecommendationDataType[];
        fullStoryCards: FullStoryDataType[];
      }>,
  });
}

export function CountryPage() {
  const params = useParams({ strict: false });
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);
  const countryCode: string = params.countryId || 'MDA';
  const { data, isLoading, isError } = usePageContentData(countryCode);
  const country = COUNTRIES.find((country) => country.isoCode === countryCode)?.name;
  const [selectedRecommendation, setSelectedRecommendation] = useState<Themes | null>(null);
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
      {isLoading && <Spinner size='lg' className='mx-auto my-20' />}
      {isError && <P>Error loading</P>}
      {data && !isLoading && !isError && (
        <>
          <section id='intro-text' className='mx-auto w-full px-4'>
            <div className='mx-auto max-w-190'>
              <H3 marginBottom='none'>{data.intro.title}</H3>
              <Spacer size='2xl' />
              <MarkdownRenderer text={data.intro.content} size='base-responsive' />
            </div>
          </section>
          <Spacer size='8xl' />
          <Spacer size='8xl' />
          <section id='scrolly' className='mx-auto w-full'>
            <CountryNarrative data={data.scrollyTelling} />
          </section>
          <section id='themes' className='mx-auto w-full px-4 py-16'>
            <div className='mx-auto max-w-7xl'>
              <H4 weight='bold'>Read the full story behind each theme</H4>
              <Spacer size='2xl' />
              <Grid noOfCol={{ base: 1, sm: 2, md: 2, lg: 3, xl: 5 }} gap='16px'>
                {data.fullStoryCards.map((theme) => (
                  <GridItem key={theme.theme} className='group cursor-pointer'>
                    <Drawer
                      direction='right'
                      open={openDrawer === theme.theme}
                      onOpenChange={(open) => {
                        setOpenDrawer(open ? theme.theme : null);
                      }}
                    >
                      <DrawerTrigger className='w-full'>
                        <CardEl
                          variant={theme.theme}
                          showBadge={true}
                          className='min-h-87.5'
                          isHoverable
                        >
                          <P size='xl' marginBottom='none' className='grow'>
                            {theme.description}
                          </P>
                          <Spacer size='4xl' />
                          <div className='w-fit pt-5'>
                            <Button variant='link' endIcon='arrow-2' padding='none'>
                              Read more
                            </Button>
                          </div>
                        </CardEl>
                      </DrawerTrigger>
                      <DrawerContent className='p-0! [&_.undp-scrollbar]:p-0!'>
                        <FullStory
                          isoCode={countryCode}
                          theme={theme.theme}
                          recommendation={
                            data.recommendations.find(
                              (el) => el.theme === theme.theme,
                            ) as RecommendationDataType
                          }
                          setOpenDrawer={setOpenDrawer}
                        />
                      </DrawerContent>
                    </Drawer>
                  </GridItem>
                ))}
              </Grid>
            </div>
          </section>
          <section
            id='recommendations'
            className='mx-auto w-full bg-secondary px-4 py-16 text-content-reverse'
          >
            <div className='mx-auto max-w-7xl'>
              <H4 weight='bold'>Recommendations</H4>
              <Spacer size='2xl' />
              <Grid noOfCol={{ base: 1, sm: 1, md: 1, lg: 1 }} gap='16px'>
                {data.recommendations.map((recommendation) => (
                  <GridItem
                    key={recommendation.theme}
                    className='bg-background text-content-primary'
                  >
                    <button
                      type='button'
                      aria-expanded={selectedRecommendation === recommendation.theme}
                      className='flex w-full flex-col items-start p-0'
                      onClick={() =>
                        setSelectedRecommendation(
                          selectedRecommendation === recommendation.theme
                            ? null
                            : recommendation.theme,
                        )
                      }
                    >
                      <CardEl
                        variant={recommendation.theme}
                        showBadge={true}
                        isHoverable={true}
                        className='items-start border-0 bg-background'
                      >
                        <div className='flex w-full items-center justify-between'>
                          <H4 weight='bold' marginBottom='none'>
                            {recommendation.mainRecommendation}
                          </H4>
                          {selectedRecommendation === recommendation.theme ? (
                            <Minus size={20} />
                          ) : (
                            <Plus size={20} />
                          )}
                        </div>
                        {selectedRecommendation === recommendation.theme && (
                          <div className='pt-5'>
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
                      </CardEl>
                    </button>
                  </GridItem>
                ))}
              </Grid>
              <Spacer size='4xl' />
              <Separator color='background' className='opacity-20' />
              <Spacer size='4xl' />
              <H4 weight='bold'>What's next</H4>
              <Spacer size='2xl' />
              <Grid noOfCol={{ base: 1, sm: 2, md: 2, lg: 2 }} gap='16px'>
                <GridItem className='group cursor-pointer bg-background text-content-primary'>
                  <div className='flex h-full w-full flex-col p-8'>
                    <H5>Download the full report</H5>
                    <P size='base' className='grow' marginBottom='none'>
                      Findings, personal accounts, methodology and recommendations for Roma in
                      Moldova.
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
                      <H5>Explore the data</H5>
                      <P size='base' className='grow' marginBottom='none'>
                        Every indicator for Roma and nearby non-Roma, with breakdowns by sex, age
                        and place.
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
        </>
      )}
      <section id='explore-other-countries' className='mx-auto w-full bg-surface px-4 py-16'>
        <div className='mx-auto max-w-7xl'>
          <H4 weight='bold'>Other countries</H4>
          <Spacer size='2xl' />
          <Grid noOfCol={{ base: 1, sm: 2, md: 2 }} gap='16px'>
            {COUNTRIES.filter((d) => d.isoCode !== countryCode).map((country) => (
              <GridItem
                key={country.id}
                className='group cursor-pointer bg-background text-content-primary'
              >
                <Link to='/countries/$countryId' params={{ countryId: country.id }}>
                  <CardEl isHoverable>
                    <H5>{country.name}</H5>
                    <P size='base' className='grow' marginBottom='none'>
                      How Roma households compare with their neighbours in {country.name}.
                    </P>
                    <Spacer size='2xl' />
                    <div>
                      <Button variant='link' endIcon='arrow' padding='none'>
                        Open data explorer
                      </Button>
                    </div>
                  </CardEl>
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
