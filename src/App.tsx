import { Link } from '@tanstack/react-router';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@undp/design-system-react/Accordion';
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
import {
  StatCard,
  StatCardDescription,
  StatCardTitle,
  StatCardValue,
} from '@undp/design-system-react/StatCard';
import { H1, H2, H3, H4, H5, P } from '@undp/design-system-react/Typography';
import { BriefcaseBusiness, EqualNot, HandCoins, NotebookText } from 'lucide-react';
import { COUNTRIES } from './Constants';

function App() {
  return (
    <div className='flex flex-col antialiased'>
      <PageHeader
        className='h-auto px-0 sm:px-2 md:h-[calc(100vh_-_115px)]'
        backgroundImage='imgs/header_img.webp'
        contentMode='dark'
      >
        <PageHeaderContent className='max-w-[100%] sm:max-w-[50%]'>
          <H1 size='sm'>Roma Survey in Georgia, Moldova and Ukraine</H1>
        </PageHeaderContent>
      </PageHeader>
      <section id='about'>
        <Banner
          backgroundColor='black'
          bodyGap='base'
          bodyMaxWidth='full'
          padding='none'
          sidebarWidth='base'
          className='px-4 py-16 sm:px-12 sm:py-24 lg:px-32 lg:py-60'
        >
          <BannerBody>
            <BannerBodySidebar>
              <H2>About</H2>
            </BannerBodySidebar>
            <BannerBodyContent>
              <H4>
                The survey aims to build a robust data set for effective evidence-based
                decision-making on policies that promote Roma inclusion in order to narrow the gap
                between Roma and non-Roma populations with regard to multi-dimensional poverty and
                access to socio-economic rights in Georgia, Moldova, and Ukraine.
              </H4>
            </BannerBodyContent>
          </BannerBody>
        </Banner>
      </section>
      <Spacer size='8xl' />
      <section
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
              className='col-span-1 min-h-[180px] sm:min-h-[240px] md:col-span-2'
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
      <section id='key-findings' className='bg-primary-gray-200 py-20'>
        <div className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto w-full max-w-[1920px] bg-primary-white p-6'>
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
                      <div className='h-full bg-primary-gray-200' />
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
                      <div className='h-full bg-primary-gray-200' />
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
                      <div className='h-full bg-primary-gray-200' />
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
                      <div className='h-full bg-primary-gray-200' />
                    </GridItem>
                  </Grid>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      <Spacer size='8xl' />
      <section id='country-cards' className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
        <H3>Explore countries</H3>
        <Spacer size='2xl' />
        <Grid noOfCol={{ base: 1, sm: 2, md: 4 }} gap='32px'>
          {COUNTRIES.map((country) => (
            <GridItem key={country.id}>
              <Link to='/countries/$countryId' params={{ countryId: country.id }}>
                <Card backgroundColor='white' size='full' variant='with-image'>
                  <CardHeader>
                    <CardImage src='/imgs/placeholder.webp' />
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
