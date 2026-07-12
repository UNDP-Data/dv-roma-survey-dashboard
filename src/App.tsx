import {
  Banner,
  BannerBody,
  BannerBodyContent,
  BannerBodySidebar,
} from '@undp/design-system-react/Banner';
import { Button } from '@undp/design-system-react/Button';
import {
  FeaturedCard,
  FeaturedCardDescription,
  FeaturedCardFooter,
  FeaturedCardTitle,
} from '@undp/design-system-react/FeaturedCard';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { PageHeader, PageHeaderContent } from '@undp/design-system-react/PageHeader';
import { Spacer } from '@undp/design-system-react/Spacer';
import {
  StatCard,
  StatCardDescription,
  StatCardTitle,
  StatCardValue,
} from '@undp/design-system-react/StatCard';
import { Blockquote, H1, H2, H4, H5, P } from '@undp/design-system-react/Typography';

function App() {
  return (
    <div className='flex flex-col antialiased'>
      <PageHeader
        className='h-auto px-0 sm:px-2 md:h-[calc(100vh_-_115px)]'
        backgroundImage='imgs/header_img.webp'
        contentMode='dark'
      >
        <PageHeaderContent className='max-w-[100%] sm:max-w-[50%]'>
          <H5>Roma survey</H5>
          <H1 size='sm'>Roma Survey dashboard</H1>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan quam nec
                nibh auctor, nec ultrices orci ullamcorper. Donec sed luctus nulla, sit amet dictum
                lectus. Praesent tempor augue eget velit posuere semper. Sed lobortis sapien nec
                porta aliquet. Fusce sit amet est sed ipsum sagittis mattis a vel augue. Donec ut
                augue vitae elit pellentesque vulputate id at orci. Aliquam erat volutpat. Donec
                risus odio, placerat a auctor eu, fringilla non mauris. In hac habitasse platea
                dictumst
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
        <H2>Key stats</H2>
        <Grid gap='24px' noOfCol={{ base: 1, sm: 2, md: 4 }}>
          <GridItem noOfColSpan={{ base: 1, sm: 2 }}>
            <StatCard hoverColor='yellow'>
              <StatCardValue>35%</StatCardValue>
              <StatCardTitle>Employment</StatCardTitle>
              <StatCardDescription>Share of people employed</StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow'>
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
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow'>
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
        </Grid>
      </section>
      <Spacer size='8xl' />
      <section
        id='quote'
        className='flex w-3/4 flex-col gap-10 bg-accent-yellow px-4 py-20 sm:px-6 lg:px-20'
      >
        <H4>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan quam nec nibh
          auctor, nec ultrices orci ullamcorper. Donec sed luctus nulla, sit amet dictum lectus.
          Praesent tempor augue eget velit posuere semper. Sed lobortis sapien nec porta aliquet.
        </H4>
        <Blockquote>— Name Surname</Blockquote>
      </section>
      <Spacer size='8xl' />
      <section id='featured-stories' className='mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8'>
        <Grid noOfCol={{ base: 1, md: 3 }}>
          <GridItem>
            {' '}
            <H2 className='font-bold md:text-5xl'>
              Featured
              <br />
              stories
            </H2>
          </GridItem>
          <GridItem>
            <a target='_blank' href='https://www.undp.org/' rel='noopener'>
              <FeaturedCard backgroundColor='gray' size='full' className='min-h-[400px]'>
                <FeaturedCardTitle>Story title</FeaturedCardTitle>
                <FeaturedCardDescription>
                  <P>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan quam
                    nec nibh auctor
                  </P>
                </FeaturedCardDescription>
                <FeaturedCardFooter>
                  <Button padding='none' variant='link'>
                    Read more
                  </Button>
                </FeaturedCardFooter>
              </FeaturedCard>
            </a>
          </GridItem>
          <GridItem>
            <a target='_blank' href='https://www.undp.org/' rel='noopener'>
              <FeaturedCard backgroundColor='gray' size='full' className='min-h-[400px]'>
                <FeaturedCardTitle>Story title</FeaturedCardTitle>
                <FeaturedCardDescription>
                  <P>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan quam
                    nec nibh auctor
                  </P>
                </FeaturedCardDescription>
                <FeaturedCardFooter>
                  <Button padding='none' variant='link'>
                    Read more
                  </Button>
                </FeaturedCardFooter>
              </FeaturedCard>
            </a>
          </GridItem>
          <GridItem noOfColSpan={{ base: 1, md: 2 }}>
            <a target='_blank' href='https://www.undp.org/' rel='noopener'>
              <FeaturedCard backgroundColor='gray' size='full' className='min-h-[400px]'>
                <FeaturedCardTitle>Story title</FeaturedCardTitle>
                <FeaturedCardDescription>
                  <P>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan quam
                    nec nibh auctor
                  </P>
                </FeaturedCardDescription>
                <FeaturedCardFooter>
                  <Button padding='none' variant='link'>
                    Read more
                  </Button>
                </FeaturedCardFooter>
              </FeaturedCard>
            </a>
          </GridItem>
          <GridItem>
            <a target='_blank' href='https://www.undp.org/' rel='noopener'>
              <FeaturedCard backgroundColor='gray' size='full' className='min-h-[400px]'>
                <FeaturedCardTitle>Story title</FeaturedCardTitle>
                <FeaturedCardDescription>
                  <P>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan quam
                    nec nibh auctor
                  </P>
                </FeaturedCardDescription>
                <FeaturedCardFooter>
                  <Button padding='none' variant='link'>
                    Read more
                  </Button>
                </FeaturedCardFooter>
              </FeaturedCard>
            </a>
          </GridItem>
        </Grid>
      </section>
      <Spacer size='8xl' />
    </div>
  );
}

export default App;
