import { useQuery } from '@tanstack/react-query';
import { ColorLegend } from '@undp/data-viz/ColorLegend';
import { DonutChart } from '@undp/data-viz/DonutChart';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { Badge } from '@undp/design-system-react/Badge';
import { DropdownSelect } from '@undp/design-system-react/DropdownSelect';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { Spacer } from '@undp/design-system-react/Spacer';
import { Spinner } from '@undp/design-system-react/Spinner';
import { H3, P } from '@undp/design-system-react/Typography';
import {
  VisualizationWidget,
  VisualizationWidgetBody,
  VisualizationWidgetBodyContent,
  VisualizationWidgetHeader,
  VisualizationWidgetHeaderItem,
} from '@undp/design-system-react/VisualizationWidget';
import {
  AlignHorizontalJustifyCenter,
  BriefcaseBusiness,
  GraduationCap,
  Heart,
  House,
} from 'lucide-react';
import { useState } from 'react';
import { COLORS, GROUPS } from '@/Constants';
import type { SurveyIndicator } from '@/types';
import { DisaggregationsPanel } from './components/disaggregationsPanel';
import { FeaturedIndicatorsTable } from './components/featuredIndicatorsTable';

function useSurveyData(country: string) {
  return useQuery({
    queryKey: ['survey-data', country],
    queryFn: () => fetchAndParseJSON(`./data/${country}.json`) as Promise<SurveyIndicator[]>,
  });
}

export const DataExplorerEl = ({ country }: { country: string }) => {
  const [selectedTheme, setSelectedTheme] = useState('work and employment');
  const [selectedIndicator, setSelectedIndicator] = useState('acceptance_as_spouse');
  const { data, isLoading, isError } = useSurveyData(country);

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;

  if (isError || !data) return <>Error</>;

  const selectedIndicatorData = data.find((d) => d.id === selectedIndicator);
  const romaRow = selectedIndicatorData?.roma.find((el) => el.disaggregation === 'none');
  const nonRomaRow = selectedIndicatorData?.nonRoma.find((el) => el.disaggregation === 'none');
  const romaValue = romaRow?.yesPercent ?? romaRow?.mean ?? romaRow?.gapPp;
  const nonRomaValue = nonRomaRow?.yesPercent ?? nonRomaRow?.mean ?? nonRomaRow?.gapPp;
  const gap =
    romaValue !== undefined && nonRomaValue !== undefined ? romaValue - nonRomaValue : undefined;
  return (
    <VisualizationWidget>
      <VisualizationWidgetHeader
        defaultValue={selectedTheme}
        onChange={setSelectedTheme}
        activeItemClass='bg-background text-accent-blue'
        className='h-20'
      >
        <VisualizationWidgetHeaderItem value='work and employment' className='basis-0'>
          <BriefcaseBusiness size={20} strokeWidth={1.5} />
          Work & employment
        </VisualizationWidgetHeaderItem>
        <VisualizationWidgetHeaderItem value='education' className='basis-0'>
          <GraduationCap size={20} strokeWidth={1.5} />
          Education
        </VisualizationWidgetHeaderItem>
        <VisualizationWidgetHeaderItem value='health' className='basis-0'>
          <Heart size={20} strokeWidth={1.5} />
          Health
        </VisualizationWidgetHeaderItem>
        <VisualizationWidgetHeaderItem value='living conditions' className='basis-0'>
          <House size={20} strokeWidth={1.5} />
          Living conditions
        </VisualizationWidgetHeaderItem>
        <VisualizationWidgetHeaderItem value='discrimination' className='basis-0'>
          <AlignHorizontalJustifyCenter size={20} strokeWidth={1.5} />
          Discrimination
        </VisualizationWidgetHeaderItem>
      </VisualizationWidgetHeader>
      <VisualizationWidgetBody className='@3xl:max-h-none @3xl:flex-col border-stroke border-t'>
        <VisualizationWidgetBodyContent className='@3xl:max-h-none flex-col bg-gray-100 p-6'>
          <div className='flex flex-wrap items-center justify-between'>
            <P size='xl' weight='bold' marginBottom='sm' className='text-2xl'>
              Featured indicators
            </P>
            <ColorLegend colors={COLORS} colorDomain={GROUPS} showNAColor={false} />
          </div>
          <Spacer size='base' />
          <div className='rounded-xs border border-stroke bg-background'>
            <FeaturedIndicatorsTable indicators={data.slice(0, 5)} />
          </div>
          <Spacer size='3xl' />
          <P size='xl' weight='bold' marginBottom='sm' className='text-2xl'>
            Explore all indicators
          </P>
          <P marginBottom='2xs' size='sm'>
            Type or select indicator
          </P>
          <div className='max-w-75 md:max-w-100'>
            <DropdownSelect
              color='primary'
              value={{ label: selectedIndicatorData?.description, value: selectedIndicator }}
              // biome-ignore lint/suspicious/noExplicitAny: Need to fix in the DS
              onChange={(d: any) => setSelectedIndicator(d.value)}
              options={data.map((d) => ({
                label: d.description,
                value: d.id,
              }))}
              showCheck
              size='base'
              variant='light'
              isSearchable
            />
          </div>
          <div className='mx-auto mt-4 mb-8 w-full rounded-xs border border-stroke bg-background p-6'>
            <P size='xl'>{selectedIndicatorData?.description ?? ''}</P>
            <Grid
              gap='16px'
              noOfCol={{
                base: 1,
                md: 4,
                sm: 2,
              }}
            >
              <GridItem
                noOfColSpan={{
                  base: 1,
                  md: 1,
                  sm: 1,
                }}
              >
                <div>
                  <P
                    size='xs'
                    weight='bold'
                    marginBottom='none'
                    className='text-content-tertiary uppercase'
                  >
                    What it measures
                  </P>
                  <Spacer size='base' />
                  <P size='base' marginBottom='none'>
                    {selectedIndicatorData?.description}
                  </P>
                </div>
              </GridItem>
              <GridItem
                noOfColSpan={{
                  base: 1,
                  md: 1,
                  sm: 1,
                }}
              >
                <div className='h-full border-stroke lg:border-l lg:pl-6'>
                  <P
                    size='xs'
                    weight='bold'
                    marginBottom='none'
                    className='text-content-tertiary uppercase'
                  >
                    No. of respondent
                  </P>
                  <Spacer size='base' />
                  <div className='flex items-center gap-2'>
                    <span className='h-3 w-3 shrink-0 rounded-full bg-accent-red' />
                    <P size='base' marginBottom='none'>
                      Roma
                    </P>
                    <P size='base' weight='bold' marginBottom='none'>
                      {selectedIndicatorData?.roma
                        .find((el) => el.disaggregation === 'none')
                        ?.noOfRespondents.toLocaleString('en-US')}
                    </P>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='h-3 w-3 shrink-0 rounded-full bg-accent-blue' />
                    <P size='base' marginBottom='none'>
                      Non-Roma
                    </P>
                    <P size='base' weight='bold' marginBottom='none'>
                      {selectedIndicatorData?.nonRoma
                        .find((el) => el.disaggregation === 'none')
                        ?.noOfRespondents.toLocaleString('en-US')}
                    </P>
                  </div>
                </div>
              </GridItem>
              <GridItem
                noOfColSpan={{
                  base: 1,
                  md: 1,
                  sm: 1,
                }}
              >
                <div className='h-full border-stroke lg:border-l lg:pl-6'>
                  <P
                    size='xs'
                    weight='bold'
                    marginBottom='none'
                    className='text-content-tertiary uppercase'
                  >
                    Survey base
                  </P>
                  <Spacer size='base' />
                  <P size='base' marginBottom='none'>
                    –
                  </P>
                </div>
              </GridItem>
              <GridItem
                noOfColSpan={{
                  base: 1,
                  md: 1,
                  sm: 1,
                }}
              >
                <div className='h-full border-stroke lg:border-l lg:pl-6'>
                  <P
                    size='xs'
                    weight='bold'
                    marginBottom='none'
                    className='text-content-tertiary uppercase'
                  >
                    Source
                  </P>
                  <Spacer size='base' />
                  <P size='base' marginBottom='none'>
                    World Bank
                  </P>
                </div>
              </GridItem>
            </Grid>
            <Spacer size='3xl' />
            <Grid gap='32px' noOfCol={{ base: 1, lg: 5 }}>
              <GridItem noOfColSpan={{ base: 1, lg: 2 }}>
                <div className='pb-2'>
                  <P
                    size='xs'
                    weight='bold'
                    marginBottom='none'
                    className='text-content-tertiary uppercase'
                  >
                    Roma vs non-Roma
                  </P>
                </div>
                <Spacer size='base' />
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center justify-between gap-4 rounded-xs border border-stroke bg-background p-6'>
                    <div className='flex flex-col gap-2'>
                      <P size='xs' weight='bold' marginBottom='none' className='uppercase'>
                        Roma
                      </P>
                      <div className='flex items-baseline gap-1 text-accent-red'>
                        <H3 marginBottom='none' className='text-accent-red'>
                          {romaValue}
                        </H3>
                        {romaRow?.yesPercent !== undefined ? (
                          <P size='lg' marginBottom='none' className='text-accent-red'>
                            %
                          </P>
                        ) : null}
                      </div>
                      {gap !== undefined ? (
                        <Badge
                          variant='surface-sm'
                          size='sm'
                          rounded='sm'
                          className='w-fit rounded-lg'
                        >
                          {gap > 0 ? '+' : ''}
                          {gap.toFixed(1)} pp vs non-Roma
                        </Badge>
                      ) : null}
                    </div>
                    <div className='w-30'>
                      {romaRow?.yesPercent !== undefined ? (
                        <DonutChart
                          data={[
                            { label: 'yes', size: romaRow.yesPercent },
                            { label: 'no', size: romaRow.noPercent },
                          ]}
                          padding='0'
                          strokeWidth={15}
                          colors={['var(--accent-red)', 'var(--surface-sm)']}
                          showColorScale={false}
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className='flex items-center justify-between gap-4 rounded-xs border border-stroke bg-background p-6'>
                    <div className='flex flex-col gap-2'>
                      <P size='xs' weight='bold' marginBottom='none' className='uppercase'>
                        Non-Roma
                      </P>
                      <div className='flex items-baseline gap-1'>
                        <H3 marginBottom='none' className='text-accent-blue'>
                          {nonRomaValue}
                        </H3>
                        {nonRomaRow?.yesPercent !== undefined ? (
                          <P size='lg' marginBottom='none' className='text-accent-blue'>
                            %
                          </P>
                        ) : null}
                      </div>
                    </div>
                    <div className='w-30'>
                      {nonRomaRow?.yesPercent !== undefined ? (
                        <DonutChart
                          data={[
                            { label: 'yes', size: nonRomaRow.yesPercent },
                            { label: 'no', size: nonRomaRow.noPercent },
                          ]}
                          padding='0'
                          strokeWidth={15}
                          colors={['var(--accent-blue)', 'var(--surface-sm)']}
                          showColorScale={false}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
                <Spacer size='base' />
                <P size='sm' marginBottom='none' className='text-content-tertiary'>
                  Survey fieldwork carried out in [TBA]
                </P>
              </GridItem>
              <GridItem noOfColSpan={{ base: 1, lg: 3 }}>
                <DisaggregationsPanel indicator={selectedIndicatorData} />
              </GridItem>
            </Grid>
          </div>
        </VisualizationWidgetBodyContent>
      </VisualizationWidgetBody>
    </VisualizationWidget>
  );
};
