import type { AnyRoute } from '@tanstack/react-router';
import { createRoute, Link, useParams } from '@tanstack/react-router';
import { Button } from '@undp/design-system-react/Button';
import { Card, CardFooter, CardHeader, CardImage, CardTitle } from '@undp/design-system-react/Card';
import { cn } from '@undp/design-system-react/cn';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { Separator } from '@undp/design-system-react/Separator';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H2, H3, H4, H5, P } from '@undp/design-system-react/Typography';
import { DownloadIcon } from 'lucide-react';
import { useState } from 'react';
import { COUNTRIES } from '@/Constants';
import { KeyFindings } from './Components/keyFindings';

export function CountryPage() {
  const params = useParams({ strict: false });
  const country: string = params.countryId;
  const categories = [
    'Social Vulnerability',
    'Labor & Livelihood',
    'Education & Youth',
    'Discrimination',
    'Health & Care',
    'Housing & Living',
  ];
  const [selectedCategory, setSelectedCategory] = useState('Social Vulnerability');
  return (
    <div className='w-full antialiased'>
      <section id='header' className='mx-auto w-full bg-surface py-20'>
        <div className='mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8'>
          <div className='w-full md:w-1/2'>
            <P className='uppercase' size='xs' marginBottom='none'>
              Country report
            </P>
            <Spacer size='2xl' />
            <H2 className='font-heading capitalize' marginBottom='none'>
              {country}
            </H2>
            <Spacer size='2xl' />
            <H3>
              A household-level portrait of Roma vulnerability — from national survey to lived
              experience
            </H3>
            <Spacer size='sm' />
            <P>
              Lorem ipsum dolor sit amet consectetur. Suspendisse in posuere eu laoreet. Non fames
              pulvinar purus netus nisi. Tempus sodales habitasse sed adipiscing. Eu in pretium at
              sed vivamus dui nam. Arcu nisi eget vel eu convallis diam integer.
            </P>
          </div>
          <Spacer size='2xl' />
          <Grid noOfCol={{ base: 1, sm: 2, md: 4 }} className='w-full'>
            <GridItem noOfColSpan={1}>
              <H4 weight='bold' marginBottom='none'>
                1000
              </H4>
              <P>households surveyed</P>
            </GridItem>
            <GridItem noOfColSpan={1}>
              <H4 weight='bold' marginBottom='none'>
                700
              </H4>
              <P>Roma households interviewed</P>
            </GridItem>
            <GridItem noOfColSpan={1}>
              <H4 weight='bold' marginBottom='none'>
                63
              </H4>
              <P>localities covered</P>
            </GridItem>
            <GridItem noOfColSpan={1}>
              <H4 weight='bold' marginBottom='none'>
                547
              </H4>
              <P>micro-narratives collected</P>
            </GridItem>
          </Grid>
        </div>
      </section>
      <Spacer size='8xl' />
      <section id='stats' className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
        <H3>Key findings</H3>
        <Spacer size='6xl' />
        <KeyFindings
          index={1}
          title='Work rarely means security'
          description={
            <P size='base' marginBottom='none'>
              Roma households are economically active, but the available work is overwhelmingly
              informal, undocumented, and unprotected{' '}
              <span className='font-bold'>
                – 73.3% of employed Roma work informally, vs. 33.3% of non-Roma.
              </span>
            </P>
          }
          persona={{
            name: 'Vasile · Composite narrative persona',
            description:
              "He stretches every leu and puts his children's schooling and his mother's medication first — and it still is not enough.",
          }}
        />
        <Spacer size='6xl' />
        <Separator color='surface-md' />
        <Spacer size='6xl' />
        <KeyFindings
          index={2}
          title='Schooling ends early, and rarely restarts'
          description={
            <P size='base' marginBottom='none'>
              Housing instability is a leading, underrecognized driver: nationally,{' '}
              <span className='font-bold'>
                56.3% of Roma youth (15–25) are NEET, vs. 14.7% of non-Roma.
              </span>
            </P>
          }
          persona={{
            name: 'Vasile · Composite narrative persona',
            description:
              "He stretches every leu and puts his children's schooling and his mother's medication first — and it still is not enough.",
          }}
          reverse
        />
        <Spacer size='6xl' />
        <Separator color='surface-md' />
        <Spacer size='6xl' />
        <KeyFindings
          index={2}
          title='Discrimination touches nearly every account'
          description={
            <P size='base' marginBottom='none'>
              <span className='font-bold'>
                Only 0.2% of Moldova micro-narratives recorded no form of discrimination at all.
              </span>{' '}
              It shows up in hiring and in routine contact with public institutions alike. 56.3% of
              Roma youth (15–25) are NEET, vs. 14.7% of non-Roma.
            </P>
          }
          persona={{
            name: 'Lilia · Composite narrative persona',
            description:
              'Employers turn her away, shop staff watch her closely, police checks feel routine.',
          }}
        />
      </section>
      <Spacer size='8xl' />
      <section id='key-findings' className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
        <H3>
          Explore data on Roma communities in{' '}
          {country.replace(/\b\w/g, (char) => char.toUpperCase())}
        </H3>
        <div className='flex flex-wrap gap-4'>
          {categories.map((category) => (
            <button
              type='button'
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'rounded-full border px-4 py-1 text-[14px]',
                selectedCategory === category
                  ? 'border-stroke-4xl bg-foreground-soft text-content-reverse'
                  : 'border-stroke text-content-primary hover:bg-surface',
              )}
            >
              {category}
            </button>
          ))}
        </div>
        <Spacer size='2xl' />
        <div className='w-full bg-surface p-4 md:p-8'>
          <div className='w-full md:w-1/2'>
            <H5 weight='bold'>{selectedCategory}</H5>
            <P size='base'>
              Lorem ipsum dolor sit amet consectetur. Nunc bibendum massa bibendum enim mauris. Non
              quam malesuada sed lobortis placerat ut aliquam. Cras eget dui.
            </P>
          </div>
          <Separator color='surface-md' />
          <Spacer size='2xl' />
          <div className='h-62.5 w-full bg-blue-100' />
        </div>
      </section>
      <Spacer size='2xl' />
      <section id='download-report' className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
        <div className='flex w-full flex-col bg-surface p-6 md:p-10'>
          <H4 weight='bold'>Download report</H4>
          <P size='lg' marginBottom='none'>
            Lorem ipsum dolor sit amet consectetur. Consequat tempus.
          </P>
          <Spacer size='2xl' />
          <Button variant='link' arrow={false} padding='none' className='w-fit'>
            Download <DownloadIcon className='text-accent-blue' />
          </Button>
        </div>
      </section>
      <Spacer size='8xl' />
      <section id='key-findings' className='bg-surface py-20'>
        <div className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
          <H3>Explore other countries</H3>
          <Spacer size='2xl' />
          <Grid noOfCol={{ base: 1, sm: 2, md: 4 }} gap='32px'>
            {COUNTRIES.filter((d) => d.id !== country).map((country) => (
              <GridItem key={country.id}>
                <Link to='/countries/$countryId' params={{ countryId: country.id }}>
                  <Card backgroundColor='background' size='full' variant='with-image'>
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
        </div>
      </section>
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
