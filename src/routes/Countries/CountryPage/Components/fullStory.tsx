/** biome-ignore-all lint/suspicious/noArrayIndexKey: index doesn't changes */
/** biome-ignore-all lint/suspicious/noExplicitAny: Data is custom*/

import { useQuery } from '@tanstack/react-query';
import { GroupedBarGraph, SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { UnitChart } from '@undp/data-viz/UnitChart';
import { cn } from '@undp/design-system-react/cn';
import { DrawerBody, DrawerFooter, DrawerHeader } from '@undp/design-system-react/Drawer';
import { MarkdownRenderer } from '@undp/design-system-react/MarkdownRenderer';
import { Separator } from '@undp/design-system-react/Separator';
import { Spacer } from '@undp/design-system-react/Spacer';
import { Spinner } from '@undp/design-system-react/Spinner';
import { H2, H4, H6, P } from '@undp/design-system-react/Typography';
import { BadgeEl } from '@/components/BadgeEl';
import { CardEl } from '@/components/CardEl';
import type { RecommendationDataType, Themes } from '@/types';

function useFullStoryData(isoCode: string, theme: Themes) {
  return useQuery({
    queryKey: ['fullStory', isoCode, theme],
    queryFn: () => fetchAndParseJSON(`/countryContent/${isoCode}/fullStories/${theme}.json`),
  });
}
export function FullStory({
  isoCode,
  theme,
  recommendation,
}: {
  isoCode: string;
  theme: Themes;
  recommendation: RecommendationDataType;
}) {
  const { data, isLoading, isError } = useFullStoryData(isoCode, theme);
  const bgColorClass =
    theme === 'Education'
      ? 'bg-education-light'
      : theme === 'Health'
        ? 'bg-health-light'
        : theme === 'Employment'
          ? 'bg-employment-light'
          : theme === 'Housing'
            ? 'bg-housing-light'
            : theme === 'Discrimination'
              ? 'bg-discrimination-light'
              : 'bg-surface';
  const textColorClass =
    theme === 'Education'
      ? 'text-education'
      : theme === 'Health'
        ? 'text-health'
        : theme === 'Employment'
          ? 'text-employment'
          : theme === 'Housing'
            ? 'text-housing'
            : theme === 'Discrimination'
              ? 'text-discrimination'
              : 'text-content-primary';
  const next =
    theme === 'Education'
      ? 'Employment'
      : theme === 'Employment'
        ? 'Health'
        : theme === 'Health'
          ? 'Housing'
          : theme === 'Housing'
            ? 'Discrimination'
            : theme === 'Discrimination'
              ? 'Education'
              : 'Education';
  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <P>Error loading recommendations</P>;
  if (!data) return <P>No data found</P>;
  return (
    <>
      <DrawerHeader className='bg-secondary py-33.5! pl-32 text-content-reverse'>
        <div className='flex w-full flex-col gap-4 md:w-1/2'>
          <BadgeEl variant={theme} reverse className='w-fit' />
          <H2 marginBottom='none' weight='bold'>
            {data.title}
          </H2>
        </div>
      </DrawerHeader>
      <DrawerBody className='flex-col gap-5 pl-32'>
        <Spacer size='6xl' />
        <div>
          {data.sections.map((section: any, i: number) => (
            <div key={i} className={cn('flex w-full flex-col gap-5', section.className)}>
              {section.title && (
                <P size='xl' weight='bold' marginBottom='none'>
                  {section.title}
                </P>
              )}
              <div className='flex'>
                <div className='flex w-full flex-col gap-5 md:w-3/4'>
                  {section.content.map((content: any, j: number) => (
                    <div className={cn('pr-0 md:pr-6', content.className)} key={j}>
                      {content.type === 'text' && (
                        <div className={content.className}>
                          <MarkdownRenderer text={content.content} />
                        </div>
                      )}
                      {content.type === 'separator' && (
                        <Separator className={content.className} color='foreground-soft' />
                      )}
                      {content.type === 'quote' && (
                        <CardEl
                          className={cn('border-0 bg-surface', content.className)}
                          showBadge={false}
                          variant={theme}
                        >
                          <H6
                            marginBottom='none'
                            style={{ color: `var(--${theme.toLowerCase()})` }}
                          >
                            Stories behind statistics
                          </H6>
                          <Spacer size='base' />
                          <P size='xl' weight='bold' marginBottom='none'>
                            {content.content}
                          </P>
                          <Spacer size='base' />
                          <P size='base' className='text-content-secondary' marginBottom='none'>
                            {content.author}
                          </P>
                        </CardEl>
                      )}
                      {content.type === 'graph' && (
                        <div className={cn('flex w-full flex-col gap-6', content.className)}>
                          {content.title && (
                            <P size='xl' weight='bold' marginBottom='none'>
                              {content.title}
                            </P>
                          )}
                          {content.subTitle && (
                            <P size='base' className='text-content-secondary' marginBottom='none'>
                              {content.subTitle}
                            </P>
                          )}
                          {content.graphType === 'barChart' && (
                            <SimpleBarGraph
                              data={content.data}
                              trackColor='var(--gray-200)'
                              cornerRadius={4}
                              showValues
                              maxValue={100}
                              orientation='horizontal'
                              source={content.source}
                              {...(content.settings ?? {})}
                            />
                          )}
                          {content.graphType === 'groupedBarChart' && (
                            <GroupedBarGraph
                              data={content.data}
                              trackColor='var(--gray-200)'
                              cornerRadius={4}
                              showValues
                              maxValue={100}
                              orientation='horizontal'
                              colorDomain={['Roma', 'Non-Roma']}
                              colors={['var(--roma', 'var(--non-roma']}
                              source={content.source}
                              {...(content.settings ?? {})}
                            />
                          )}
                          {content.graphType === 'unitChart' && (
                            <div className='flex flex-row gap-6'>
                              <UnitChart
                                gridIcon={{
                                  width: 24,
                                  height: 37,
                                  d: [
                                    'M14.3594 13.8594C19.0938 13.8595 22.9315 17.6973 22.9316 22.4317V30.1475C22.9316 32.9882 20.6288 35.291 17.7881 35.291H6.64355C3.80293 35.291 1.50009 32.9881 1.5 30.1475V22.4317C1.50012 17.6972 5.33875 13.8594 10.0732 13.8594H14.3594ZM12.2158 1.85745C15.2933 1.85745 17.7881 4.35225 17.7881 7.42972C17.7881 10.5072 15.2933 13.002 12.2158 13.002C9.13842 13.0019 6.64356 10.5071 6.64355 7.42972C6.64355 4.35229 9.13841 1.85753 12.2158 1.85745Z',
                                  ],
                                }}
                                size={540}
                                width={540}
                                gridSize={20}
                                height={200}
                                colors={[
                                  `var(--${content.populationGroup || 'non-roma'})`,
                                  'var(--gray-300',
                                ]}
                                showColorScale={false}
                                data={[
                                  {
                                    label: 'yes',
                                    value: content.value,
                                  },
                                  {
                                    label: 'no',
                                    value: 100 - content.value,
                                  },
                                ]}
                                {...(content.settings ?? {})}
                              />
                              <div className='flex grow flex-col gap-2'>
                                <H4
                                  weight='bold'
                                  marginBottom='none'
                                  style={{
                                    color: `var(--${content.populationGroup || 'non-roma'})`,
                                  }}
                                >
                                  {content.value} out of 100
                                </H4>
                                <P size='lg' className='text-content-secondary' marginBottom='none'>
                                  {content.populationGroup === 'roma' ? 'Roma' : 'Non-Roma'}
                                </P>
                              </div>
                            </div>
                          )}
                          {content.source && (
                            <P size='sm' className='text-content-secondary' marginBottom='none'>
                              Source: {content.source}
                            </P>
                          )}
                        </div>
                      )}
                      {content.type === 'spacer' && <Spacer size={content.size} />}
                    </div>
                  ))}
                </div>
                {section.microViz && (
                  <div className='hidden w-full pr-6 md:block md:w-1/4'>
                    <H4 weight='bold' marginBottom='none' style={{ color: 'var(--roma)' }}>
                      {section.microViz.value} out of 100
                    </H4>
                    <P size='base' marginBottom='xs'>
                      {section.microViz.text}
                    </P>
                    <UnitChart
                      gridIcon={{
                        width: 24,
                        height: 37,
                        d: [
                          'M14.3594 13.8594C19.0938 13.8595 22.9315 17.6973 22.9316 22.4317V30.1475C22.9316 32.9882 20.6288 35.291 17.7881 35.291H6.64355C3.80293 35.291 1.50009 32.9881 1.5 30.1475V22.4317C1.50012 17.6972 5.33875 13.8594 10.0732 13.8594H14.3594ZM12.2158 1.85745C15.2933 1.85745 17.7881 4.35225 17.7881 7.42972C17.7881 10.5072 15.2933 13.002 12.2158 13.002C9.13842 13.0019 6.64356 10.5071 6.64355 7.42972C6.64355 4.35229 9.13841 1.85753 12.2158 1.85745Z',
                        ],
                      }}
                      size={270}
                      height={37}
                      gridSize={10}
                      totalNoOfDots={10}
                      colors={[`var(--roma)`, 'var(--gray-300']}
                      showColorScale={false}
                      data={[
                        {
                          label: 'yes',
                          value: section.microViz.value,
                        },
                        {
                          label: 'no',
                          value: 10 - section.microViz.value,
                        },
                      ]}
                    />
                  </div>
                )}
              </div>
              <Separator color='surface-md' />
            </div>
          ))}
        </div>
        <Spacer size='2xl' />
        <P size='sm' className='text-content-secondary'>
          {data.source}
        </P>
        <div className={cn('w-full p-12', bgColorClass)}>
          <div className='w-full max-w-3xl'>
            <H6 marginBottom='xs' className={textColorClass}>
              Policy options
            </H6>
            <H4 weight='bold' marginBottom='none' className={textColorClass}>
              {recommendation.mainRecommendation}
            </H4>
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
          </div>
        </div>
        <Spacer size='4xl' />
      </DrawerBody>
      <DrawerFooter className='relative w-full'>
        <div className='w-full bg-secondary py-16 pl-32 text-content-reverse'>
          <P size='xs' weight='bold' className='uppercase opacity-70'>
            Next
          </P>
          <H2 weight='bold'>{next}</H2>
        </div>
      </DrawerFooter>
    </>
  );
}
