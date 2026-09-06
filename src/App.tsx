import { Link } from '@tanstack/react-router';
import {
  Banner,
  BannerBody,
  BannerBodyContent,
  BannerBodySidebar,
} from '@undp/design-system-react/Banner';
import { Button } from '@undp/design-system-react/Button';
import { Card, CardFooter, CardHeader, CardImage, CardTitle } from '@undp/design-system-react/Card';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { PageHeader, PageHeaderContent } from '@undp/design-system-react/PageHeader';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H1, H2, H4 } from '@undp/design-system-react/Typography';
import { COUNTRIES } from './Constants';

function App() {
  return (
    <div className='flex flex-col antialiased'>
      <PageHeader
        className='h-auto px-0 sm:px-2 md:h-[calc(100vh-115px)]'
        backgroundImage='imgs/header_img.webp'
        contentMode='dark'
      >
        <PageHeaderContent className='max-w-full sm:max-w-[50%]'>
          <H1 size='sm'>Roma Socio-Economic Scoreboard</H1>
        </PageHeaderContent>
      </PageHeader>
      <section id='about'>
        <Banner
          backgroundColor='foreground'
          bodyGap='base'
          bodyMaxWidth='full'
          padding='none'
          sidebarWidth='base'
          className='px-4 py-16 sm:px-12 sm:py-24 lg:px-32 lg:py-40'
        >
          <BannerBody>
            <BannerBodySidebar>
              <H2>Overview</H2>
            </BannerBodySidebar>
            <BannerBodyContent>
              <H4>
                For the Roma communities scattered across Europe and its neighbours, precarious
                livelihoods and discrimination are everyday realities. Roma are resilient, but they
                struggle with barriers of poverty and exclusion, and often invisibility.
              </H4>
              <H4>
                The Roma Socio-Economic Scoreboard is a snapshot of key social and economic
                indicators based on harmonized, comparable data from household surveys across
                Georgia, Moldova and Ukraine.
              </H4>
              <H4>
                The Scoreboard is designed as a resource for policymakers, researchers, civil
                society organizations, and advocates working to advance well-being Roma communities.
                By making evidence more visible and accessible, it amplifies the visibility of
                challenges faced by Roma, and accompanies effective policy and programme design,
                monitor progress and data-driven decision-making.
              </H4>
            </BannerBodyContent>
          </BannerBody>
        </Banner>
      </section>
      <Spacer size='8xl' />
      {/* <section
        id='stats'
        className='mx-auto flex w-full max-w-[1920px] flex-col gap-10 px-4 sm:px-6 lg:px-8'
      >
        <H2>Key numbers</H2>
        <Grid gap='24px' noOfCol={{ base: 1, md: 3 }}>
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow'>
              <StatCardValue>35%</StatCardValue>
              <StatCardTitle>Employment</StatCardTitle>
              <StatCardDescription>Share of people employed</StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={{ base: 1, md: 2 }}>
            <StatCard hoverColor='yellow'>
              <StatCardValue>10%</StatCardValue>
              <StatCardTitle>Unemployment</StatCardTitle>
              <StatCardDescription>Share of unemployed people</StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={{ base: 1, sm: 2 }}>
            <StatCard
              hoverColor='yellow'
              size='full'
              className='col-span-1 min-h-45 sm:min-h-60 md:col-span-2'
            >
              <StatCardValue>10%</StatCardValue>
              <StatCardTitle>Unemployment</StatCardTitle>
              <StatCardDescription>Share of unemployed people</StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow'>
              <StatCardValue>10%</StatCardValue>
              <StatCardTitle>Unemployment</StatCardTitle>
              <StatCardDescription>Share of unemployed people</StatCardDescription>
            </StatCard>
          </GridItem>
        </Grid>
      </section>
      <Spacer size='8xl' />
      <section id='key-findings' className='bg-surface py-20'>
        <div className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto w-full max-w-[1920px] bg-background p-6'>
            <H2>Key findings</H2>
            <Accordion type='single' variant='tertiary' collapsible defaultValue='item-1'>
              <AccordionItem value='item-1'>
                <AccordionTrigger className='cursor-pointer'>
                  <div className='flex items-center gap-2 text-[1.25rem] normal-case'>
                    <BriefcaseBusiness size={20} />
                    Work rarely means security
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Grid noOfCol={{ base: 1, md: 2 }}>
                    <GridItem noOfColSpan={1}>
                      <div className='flex flex-col'>
                        <H5>
                          Roma households are economically active, but the available work is
                          overwhelmingly informal, undocumented, and unprotected.
                        </H5>
                        <H4 weight='bold' marginBottom='none'>
                          32
                        </H4>
                        <P size='base'>
                          Lorem ipsum dolor sit amet consectetur. Eget purus praesent in pulvinar.
                        </P>
                      </div>
                    </GridItem>
                    <GridItem noOfColSpan={1}>
                      <div className='h-full bg-surface' />
                    </GridItem>
                  </Grid>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger className='cursor-pointer'>
                  <div className='flex items-center gap-2 text-[1.25rem] normal-case'>
                    <NotebookText size={20} />
                    Schooling ends early, and rarely restarts
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Grid noOfCol={{ base: 1, md: 2 }}>
                    <GridItem noOfColSpan={1}>
                      <div className='flex flex-col'>
                        <H5>
                          Roma households are economically active, but the available work is
                          overwhelmingly informal, undocumented, and unprotected.
                        </H5>
                        <H4 weight='bold' marginBottom='none'>
                          32
                        </H4>
                        <P size='base'>
                          Lorem ipsum dolor sit amet consectetur. Eget purus praesent in pulvinar.
                        </P>
                      </div>
                    </GridItem>
                    <GridItem noOfColSpan={1}>
                      <div className='h-full bg-surface' />
                    </GridItem>
                  </Grid>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3'>
                <AccordionTrigger className='cursor-pointer'>
                  <div className='flex items-center gap-2 text-[1.25rem] normal-case'>
                    <EqualNot size={20} />
                    Discrimination touches nearly every account
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Grid noOfCol={{ base: 1, md: 2 }}>
                    <GridItem noOfColSpan={1}>
                      <div className='flex flex-col'>
                        <H5>
                          Roma households are economically active, but the available work is
                          overwhelmingly informal, undocumented, and unprotected.
                        </H5>
                        <H4 weight='bold' marginBottom='none'>
                          32
                        </H4>
                        <P size='base'>
                          Lorem ipsum dolor sit amet consectetur. Eget purus praesent in pulvinar.
                        </P>
                      </div>
                    </GridItem>
                    <GridItem noOfColSpan={1}>
                      <div className='h-full bg-surface' />
                    </GridItem>
                  </Grid>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-4'>
                <AccordionTrigger className='cursor-pointer'>
                  <div className='flex items-center gap-2 text-[1.25rem] normal-case'>
                    <HandCoins size={20} />
                    Housing and health costs compound each other
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Grid noOfCol={{ base: 1, md: 2 }}>
                    <GridItem noOfColSpan={1}>
                      <div className='flex flex-col'>
                        <H5>
                          Roma households are economically active, but the available work is
                          overwhelmingly informal, undocumented, and unprotected.
                        </H5>
                        <H4 weight='bold' marginBottom='none'>
                          32
                        </H4>
                        <P size='base'>
                          Lorem ipsum dolor sit amet consectetur. Eget purus praesent in pulvinar.
                        </P>
                      </div>
                    </GridItem>
                    <GridItem noOfColSpan={1}>
                      <div className='h-full bg-surface' />
                    </GridItem>
                  </Grid>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section> */}
      <section id='country-cards' className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
        <H2>Explore countries</H2>
        <Spacer size='2xl' />
        <Grid noOfCol={{ base: 1, sm: 2, md: 4 }} gap='32px'>
          {COUNTRIES.map((country) => (
            <GridItem key={country.id}>
              <Link to='/countries/$countryId' params={{ countryId: country.id }}>
                <Card border={false} backgroundColor='background' size='full' variant='with-image'>
                  <CardHeader>
                    <CardImage src='/imgs/placeholder.webp' className='min-h-100' />
                    <CardTitle>{country.name}</CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <Button padding='none' variant='link'>
                      Read more
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </GridItem>
          ))}
        </Grid>
      </section>
      <Spacer size='8xl' />
    </div>
  );
}

export default App;
