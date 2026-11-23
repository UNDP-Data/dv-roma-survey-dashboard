import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@undp/design-system-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@undp/design-system-react/Accordion';
import { Button } from '@undp/design-system-react/Button';
import { Card } from '@undp/design-system-react/Card';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { PageHeader, PageHeaderContent } from '@undp/design-system-react/PageHeader';
import { PageSection } from '@undp/design-system-react/PageSection';
import { Spacer } from '@undp/design-system-react/Spacer';
import {
  StatCard,
  StatCardDescription,
  StatCardTitle,
  StatCardValue,
} from '@undp/design-system-react/StatCard';
import { H1, H2, H3, H4, H5, H6, P } from '@undp/design-system-react/Typography';
import { THEME_LABELS } from './Constants';
import { CardEl } from './components/CardEl';
import { QuoteBlock } from './components/QuoteBlock';
import type { Themes } from './types';

function useAccordionContentData() {
  return useQuery({
    queryKey: ['get-home-page-content'],
    queryFn: () =>
      fetchAndParseJSON(`/homePageContent/accordionContent.json`) as Promise<
        {
          section: Themes;
          content: string;
          keyIndicator: string;
          keyIndicatorValue: string;
          quote: string;
          quoteBy: string;
        }[]
      >,
  });
}

const whatTheScoreboardOffersCards = [
  {
    title: 'Data Explorer',
    description:
      '126 indicators by country across five key socio-economic dimensions, with data disaggregated by household and demographic characteristics.',
    route: '/data-explorer',
    icon: '/imgs/01-data-explorer.svg',
  },
  {
    title: 'Country Snapshots',
    description:
      'Country-specific data stories, pairing survey findings with personal stories from Roma communities and geospatial insights.',
    route: '/countries',
    icon: '/imgs/02-countries.svg',
  },
  {
    title: 'Resources',
    description:
      'Country reports with integrated and policy-relevant analysis of Roma vulnerabilities.',
    route: '/rsosurces',
    icon: '/imgs/03-resources.svg',
  },
];

const whatYouCanDoCards = [
  {
    title: 'Establish baselines for inclusion commitments',
    description:
      'Use the indicators to track progress for EU reporting, national strategies and commitments, and policy evaluation.',
  },
  {
    title: 'Design evidence-driven policy and programme cycles',
    description:
      'Identify priority areas for underserved households and how needs differ based on sex, age, settlement type and household circumstances.',
  },
  {
    title: 'Strengthen advocacy and policy dialogue',
    description:
      'Bring partners together to amplify the inclusion of Roma and the disadvantages they face as priority in policy debates.',
  },
];

function App() {
  const { data, isLoading, isError } = useAccordionContentData();
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
      <section id='intro-text' className='relative mx-auto w-full px-4 pt-36 pb-16 xl:pb-36'>
        <img src='/imgs/patterns/p01.svg' alt='' className='absolute top-0 left-0' />
        <img
          src='/imgs/patterns/p02.svg'
          alt=''
          className='absolute right-0 bottom-0 max-xl:hidden'
        />
        <div className='mx-auto max-w-190'>
          <H3 marginBottom='none'>
            Despite decades of progress, social and economic exclusion continues to affect Roma
            communities, with disadvantages often passed from one generation to the next.
          </H3>
          <Spacer size='2xl' />
          <P>
            For the Roma communities scattered across Europe and its neighbours, precarious
            livelihoods and discrimination are everyday realities. Roma are resilient, but they
            struggle with barriers of poverty and exclusion, and often invisibility.
          </P>
          <P>
            The Roma Socio-Economic Scoreboard is a snapshot of key social and economic indicators
            based on harmonized, comparable data from household surveys across Georgia, Moldova and
            Ukraine.
          </P>
          <P>
            The Scoreboard is a resource for policymakers, researchers, civil society organizations,
            and advocates working to advance well-being of Roma communities. By making evidence more
            visible and accessible, it brings the challenges Roma face into sharper focus and
            supports policy and programme design, policy monitoring and data-driven decision-making.
          </P>
        </div>
      </section>
      <PageSection backgroundColor='surface'>
        <H2>Key numbers</H2>
        <Spacer size='2xl' />
        <Grid gap='24px' noOfCol={{ base: 1, md: 3, lg: 4 }}>
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow' className='h-full bg-background'>
              <StatCardValue>2,450</StatCardValue>
              <StatCardTitle>households surveyed</StatCardTitle>
              <StatCardDescription>
                1,550 Roma and 900 nearby non-Roma households.
              </StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={{ base: 1, lg: 2 }}>
            <StatCard hoverColor='yellow' className='h-full bg-background'>
              <StatCardValue>1,369</StatCardValue>
              <StatCardTitle>personal stories</StatCardTitle>
              <StatCardDescription>
                micro-narratives conveying lived experiences of Roma women and men, in their own
                words.
              </StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow' className='h-full bg-background'>
              <StatCardValue>126</StatCardValue>
              <StatCardTitle>indicators</StatCardTitle>
              <StatCardDescription>
                based on the 2025 Multi-country Survey on Socio-economic Vulnerabilities of Roma.
              </StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={{ base: 1, lg: 2 }}>
            <StatCard hoverColor='yellow' className='h-full bg-background'>
              <StatCardValue>5</StatCardValue>
              <StatCardTitle>key socio-economic dimensions</StatCardTitle>
              <StatCardDescription>
                showing how the vulnerabilities of Roma households are compounded across education,
                work and employment, living conditions, health and discrimination.
              </StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow' className='h-full bg-background'>
              <StatCardValue>7</StatCardValue>
              <StatCardTitle>disaggregation categories</StatCardTitle>
              <StatCardDescription>
                based on demographic and household characteristics.
              </StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow' className='h-full bg-background'>
              <StatCardValue>3</StatCardValue>
              <StatCardTitle>streams of evidence</StatCardTitle>
              <StatCardDescription>
                that are brought together for granular insights from household surveys,
                micro-narratives and geospatial analysis.
              </StatCardDescription>
            </StatCard>
          </GridItem>
        </Grid>
      </PageSection>
      <PageSection>
        <div className='max-w-5xl'>
          <H2>Key socio-economic dimensions</H2>
          <P>
            The indicators derived from the 2025 Multi-country Survey on Socio-economic
            Vulnerabilities of Roma measure disparities between Roma and neighboring non-Roma
            households across five key socio-economic dimensions, complemented by personal stories
            collected from 1,369 individuals across Georgia, Moldova and Ukraine, and geospatial
            findings. The dimensions shed light on the distinct barriers Roma face in accessing
            education and vocational training, economic security, safe and adequate housing, or
            health care, each compounding one another to shape pathways of vulnerability.
          </P>
        </div>
        <Spacer size='2xl' />
        <Accordion type='single' variant='secondary' collapsible defaultValue='item-1'>
          {isError && <P className='text-error'>Error loading data</P>}
          {(isLoading || !data) && <Skeleton />}
          {data?.map((d) => (
            <AccordionItem value={d.section} key={d.section} className='border-b-surface-md'>
              <AccordionTrigger className='cursor-pointer'>
                <div className='flex items-center gap-2 font-bold text-[1.25rem] uppercase'>
                  {THEME_LABELS[d.section]}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Grid noOfCol={{ base: 1, md: 2 }} gap='32px'>
                  <GridItem noOfColSpan={1}>
                    <div className='flex flex-col'>
                      <P>{d.content}</P>
                      <H4 weight='bold' marginBottom='none'>
                        {d.keyIndicator}
                      </H4>
                      <P size='base'>{d.keyIndicatorValue}</P>
                    </div>
                  </GridItem>
                  <GridItem noOfColSpan={1}>
                    <QuoteBlock
                      theme={d.section}
                      quote={d.quote}
                      author={d.quoteBy}
                      className='bg-background'
                    />
                  </GridItem>
                </Grid>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </PageSection>
      <PageSection backgroundColor='surface'>
        <Grid noOfCol={{ base: 1, md: 2, lg: 4 }} gap='24px'>
          <GridItem noOfColSpan={1}>
            <H2>What You Can Explore</H2>
          </GridItem>
          {whatTheScoreboardOffersCards.map((el) => (
            <GridItem noOfColSpan={1} key={el.title}>
              <Link to={el.route}>
                <Card
                  size='full'
                  variant='without-image'
                  className='relative h-full min-h-75 overflow-hidden border-none pt-4 hover:bg-background/60'
                >
                  <CardHeader>
                    <img
                      src={el.icon}
                      alt={`${el.title} icon`}
                      className='mx-6 mt-2 h-20 w-20'
                      aria-hidden
                    />
                    <CardTitle>{el.title}</CardTitle>
                    <CardDescription className='mb-8'>{el.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button padding='none' variant='link' endIcon='arrow'>
                      Explore
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </GridItem>
          ))}
        </Grid>
      </PageSection>
      <PageSection>
        <div className='max-w-5xl'>
          <H2>What you can do</H2>
          <P>
            The Scoreboard provides efforts for Roma-inclusive societies with a shared, public
            evidence base.
          </P>
        </div>
        <Spacer size='2xl' />
        <Grid noOfCol={{ base: 1, md: 3 }} gap='24px'>
          {whatYouCanDoCards.map((el, i) => (
            <GridItem noOfColSpan={1} key={el.title}>
              <CardEl>
                <H6>0{i + 1}</H6>
                <H5>{el.title}</H5>
                <P size='base' className='grow' marginBottom='none'>
                  {el.description}
                </P>
              </CardEl>
            </GridItem>
          ))}
        </Grid>
      </PageSection>
      <PageSection backgroundColor='surface'>
        <H6>With support from</H6>
        <img src='/imgs/logos/logo-eu-en.png' alt='European Union' className='h-40' />
      </PageSection>
    </div>
  );
}

export default App;
