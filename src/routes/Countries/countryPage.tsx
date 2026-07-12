import type { AnyRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
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
import { VizCarousel } from '@undp/design-system-react/VizCarousel';

export function CountryPage() {
  return (
    <div className='w-full antialiased'>
      <PageHeader
        className='h-auto px-0 sm:px-2 md:h-[calc(100vh_-_115px)]'
        backgroundImage='/imgs/header_img.webp'
        contentMode='light'
        variant='secondary'
      >
        <PageHeaderContent>
          <H5>Country Page</H5>
          <H1 size='sm'>Moldova</H1>
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
      <section id='stats' className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
        <H5>Overview</H5>
        <H3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan quam nec nibh
          auctor, nec ultrices orci ullamcorper. Donec sed luctus nulla, sit amet dictum lectus.
        </H3>
        <Grid gap='24px' noOfCol={{ base: 1, md: 3 }}>
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow'>
              <StatCardValue>34</StatCardValue>
              <StatCardTitle>people interviewed</StatCardTitle>
              <StatCardDescription>Lorem ipsum dolor sit amet</StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow'>
              <StatCardValue>34</StatCardValue>
              <StatCardTitle>people interviewed</StatCardTitle>
              <StatCardDescription>Lorem ipsum dolor sit amet</StatCardDescription>
            </StatCard>
          </GridItem>
          <GridItem noOfColSpan={1}>
            <StatCard hoverColor='yellow'>
              <StatCardValue>34</StatCardValue>
              <StatCardTitle>people interviewed</StatCardTitle>
              <StatCardDescription>Lorem ipsum dolor sit amet</StatCardDescription>
            </StatCard>
          </GridItem>
        </Grid>
      </section>
      <Spacer size='8xl' />
      <section id='country-snapshots' className='mx-auto w-full bg-primary-gray-200 py-12'>
        <div className='mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8'>
          <H5>Country snapshots</H5>
          <H3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan quam nec nibh
            auctor, nec ultrices orci ullamcorper. Donec sed luctus nulla, sit amet dictum lectus.
          </H3>
          <div className='w-full bg-primary-white p-6'>
            <VizCarousel
              slideNo
              slides={[
                {
                  content: (
                    <div className='flex flex-col'>
                      <H3>Snapshot 1</H3>
                      <P>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan
                        quam nec nibh auctor, nec ultrices orci ullamcorper. Donec sed luctus nulla,
                        sit amet dictum lectus.
                      </P>
                      <Grid noOfCol={3}>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              100%
                            </H4>
                            <P size='base'>Lorem ipsum dolor sit amet</P>
                          </div>
                        </GridItem>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              32
                            </H4>
                            <P size='base'>Lorem ipsum dolor sit amet</P>
                          </div>
                        </GridItem>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              600
                            </H4>
                            <P size='base'>Lorem ipsum dolor sit amet</P>
                          </div>
                        </GridItem>
                      </Grid>
                    </div>
                  ),
                  viz: <div className='h-full min-h-[320px] w-full bg-primary-gray-300' />,
                },
                {
                  content: (
                    <div className='flex flex-col'>
                      <H3>Snapshot 2</H3>
                      <P>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan
                        quam nec nibh auctor, nec ultrices orci ullamcorper. Donec sed luctus nulla,
                        sit amet dictum lectus.
                      </P>
                      <Grid noOfCol={3}>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              100%
                            </H4>
                            <P size='base'>Lorem ipsum dolor sit amet</P>
                          </div>
                        </GridItem>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              32
                            </H4>
                            <P size='base'>Lorem ipsum dolor sit amet</P>
                          </div>
                        </GridItem>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              600
                            </H4>
                            <P size='base'>Lorem ipsum dolor sit amet</P>
                          </div>
                        </GridItem>
                      </Grid>
                    </div>
                  ),
                  viz: <div className='h-full w-full bg-primary-gray-500' />,
                },
                {
                  content: (
                    <div className='flex flex-col'>
                      <H3>Snapshot 3</H3>
                      <P>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan
                        quam nec nibh auctor, nec ultrices orci ullamcorper. Donec sed luctus nulla,
                        sit amet dictum lectus.
                      </P>
                      <Grid noOfCol={3}>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              100%
                            </H4>
                            <P size='base'>Lorem ipsum dolor sit amet</P>
                          </div>
                        </GridItem>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              32
                            </H4>
                            <P size='base'>Lorem ipsum dolor sit amet</P>
                          </div>
                        </GridItem>
                        <GridItem noOfColSpan={1}>
                          <div>
                            <H4 marginBottom='none' weight='bold'>
                              600
                            </H4>
                            <P size='base'>Lorem ipsum dolor sit amet</P>
                          </div>
                        </GridItem>
                      </Grid>
                    </div>
                  ),
                  viz: <div className='h-full w-full bg-primary-gray-300' />,
                },
              ]}
              vizWidth='base'
            />
          </div>
        </div>
      </section>
      <Spacer size='8xl' />
      <section id='key=findings' className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
        <H5>Key findings</H5>
        <H3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan quam nec nibh
          auctor, nec ultrices orci ullamcorper. Donec sed luctus nulla, sit amet dictum lectus.
        </H3>
        <Accordion type='single' variant='tertiary' collapsible defaultValue='item-1'>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='text-[1.25rem] normal-case'>
              Lorem ipsum dolor sit amet
            </AccordionTrigger>
            <AccordionContent>
              <Grid noOfCol={{ base: 1, md: 2 }}>
                <GridItem noOfColSpan={1}>
                  <div className='flex flex-col'>
                    <H5>
                      Lorem ipsum dolor sit amet consectetur. At maecenas enim proin accumsan enim
                      lacus pellentesque vestibulum semper.
                    </H5>
                    <H4 weight='bold' marginBottom='none'>
                      32
                    </H4>
                    <P size='base'>
                      Lorem ipsum dolor sit amet consectetur. Eget purus praesent in pulvinar.
                    </P>
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
            <AccordionTrigger className='text-[1.25rem] normal-case'>
              Lorem ipsum dolor sit amet
            </AccordionTrigger>
            <AccordionContent>
              <Grid noOfCol={{ base: 1, md: 2 }}>
                <GridItem noOfColSpan={1}>
                  <div className='flex flex-col'>
                    <H5>
                      Lorem ipsum dolor sit amet consectetur. At maecenas enim proin accumsan enim
                      lacus pellentesque vestibulum semper.
                    </H5>
                    <H4 weight='bold' marginBottom='none'>
                      32
                    </H4>
                    <P size='base'>
                      Lorem ipsum dolor sit amet consectetur. Eget purus praesent in pulvinar.
                    </P>
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
            <AccordionTrigger className='text-[1.25rem] normal-case'>
              Lorem ipsum dolor sit amet
            </AccordionTrigger>
            <AccordionContent>
              <Grid noOfCol={{ base: 1, md: 2 }}>
                <GridItem noOfColSpan={1}>
                  <div className='flex flex-col'>
                    <H5>
                      Lorem ipsum dolor sit amet consectetur. At maecenas enim proin accumsan enim
                      lacus pellentesque vestibulum semper.
                    </H5>
                    <H4 weight='bold' marginBottom='none'>
                      32
                    </H4>
                    <P size='base'>
                      Lorem ipsum dolor sit amet consectetur. Eget purus praesent in pulvinar.
                    </P>
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
            <AccordionTrigger className='text-[1.25rem] normal-case'>
              Lorem ipsum dolor sit amet
            </AccordionTrigger>
            <AccordionContent>
              <Grid noOfCol={{ base: 1, md: 2 }}>
                <GridItem noOfColSpan={1}>
                  <div className='flex flex-col'>
                    <H5>
                      Lorem ipsum dolor sit amet consectetur. At maecenas enim proin accumsan enim
                      lacus pellentesque vestibulum semper.
                    </H5>
                    <H4 weight='bold' marginBottom='none'>
                      32
                    </H4>
                    <P size='base'>
                      Lorem ipsum dolor sit amet consectetur. Eget purus praesent in pulvinar.
                    </P>
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
      </section>
      <Spacer size='8xl' />
    </div>
  );
}

export default function createProjectPageRoute(parentRoute: AnyRoute) {
  return createRoute({
    path: '/countries/$countryId',
    component: CountryPage,
    getParentRoute: () => parentRoute,
  });
}
