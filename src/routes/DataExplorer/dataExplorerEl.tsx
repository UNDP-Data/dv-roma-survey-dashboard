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
import { useRef, useState } from 'react';
import { COLORS, FEATURED_INDICATORS, GROUPS } from '@/Constants';
import type { IndicatorMetaData, SurveyIndicator } from '@/types';
import { DisaggregationsPanel } from './components/disaggregationsPanel';
import { FeaturedIndicatorsTable } from './components/featuredIndicatorsTable';

function useDataExplorerData(country: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['survey-data', country],
    queryFn: () => fetchAndParseJSON(`./data/${country}.json`) as Promise<SurveyIndicator[]>,
  });
  const { data: metaData } = useQuery({
    queryKey: ['indicator-metadata'],
    queryFn: () =>
      fetchAndParseJSON('./data/indicatorMetaData.json') as Promise<IndicatorMetaData[]>,
  });
  return { data, isLoading, isError, metaData };
}

type Theme = keyof typeof FEATURED_INDICATORS;

export const DataExplorerEl = ({ country }: { country: string }) => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>('work and employment');
  const [selectedIndicator, setSelectedIndicator] = useState('acceptance_as_spouse');
  const { data, isLoading, isError, metaData } = useDataExplorerData(country);
  const exploreSectionRef = useRef<HTMLDivElement>(null);

  const handleFeaturedSelect = (id: string) => {
    setSelectedIndicator(id);
    exploreSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;

  if (isError || !data) return <>Error</>;

  const featuredIndicators = FEATURED_INDICATORS[selectedTheme]
    .map((id) => data.find((d) => d.id === id))
    .filter((d): d is SurveyIndicator => d !== undefined);

  const metaById = new Map((metaData ?? []).map((m) => [m.id, m]));
  const themeIndicators = data.filter((d) => metaById.get(d.id)?.category === selectedTheme);

  const indicatorGroups = new Map<string, { label: string; value: string }[]>();
  for (const d of themeIndicators) {
    const groupKey = metaById.get(d.id)?.subCategory ?? 'Other';
    const group = indicatorGroups.get(groupKey) ?? [];
    group.push({ label: d.description, value: d.id });
    indicatorGroups.set(groupKey, group);
  }
  const indicatorOptions = [...indicatorGroups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, options]) => ({ label, options }));

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
        onChange={(value) => {
          if (value in FEATURED_INDICATORS) setSelectedTheme(value as Theme);
        }}
        activeItemClass='bg-background font-bold text-accent-blue shadow-[inset_0_3px_0_0_var(--accent-blue)]'
        className='h-16 overflow-x-auto sm:h-20'
      >
        <VisualizationWidgetHeaderItem
          value='work and employment'
          className='basis-0 sm:min-w-32 sm:shrink-0'
        >
          <BriefcaseBusiness
            size={20}
            strokeWidth={selectedTheme === 'work and employment' ? 2 : 1.5}
          />
          <span className='hidden sm:inline'>Work and employment</span>
        </VisualizationWidgetHeaderItem>
        <VisualizationWidgetHeaderItem
          value='education'
          className='basis-0 sm:min-w-32 sm:shrink-0'
        >
          <GraduationCap size={20} strokeWidth={selectedTheme === 'education' ? 2 : 1.5} />
          <span className='hidden sm:inline'>Education</span>
        </VisualizationWidgetHeaderItem>
        <VisualizationWidgetHeaderItem value='health' className='basis-0 sm:min-w-32 sm:shrink-0'>
          <Heart size={20} strokeWidth={selectedTheme === 'health' ? 2 : 1.5} />
          <span className='hidden sm:inline'>Health</span>
        </VisualizationWidgetHeaderItem>
        <VisualizationWidgetHeaderItem
          value='living conditions'
          className='basis-0 sm:min-w-32 sm:shrink-0'
        >
          <House size={20} strokeWidth={selectedTheme === 'living conditions' ? 2 : 1.5} />
          <span className='hidden sm:inline'>Living conditions</span>
        </VisualizationWidgetHeaderItem>
        <VisualizationWidgetHeaderItem
          value='discrimination'
          className='basis-0 sm:min-w-32 sm:shrink-0'
        >
          <AlignHorizontalJustifyCenter
            size={20}
            strokeWidth={selectedTheme === 'discrimination' ? 2 : 1.5}
          />
          <span className='hidden sm:inline'>Discrimination</span>
        </VisualizationWidgetHeaderItem>
      </VisualizationWidgetHeader>
      <VisualizationWidgetBody className='@3xl:max-h-none @3xl:flex-col border-stroke border-t'>
        <VisualizationWidgetBodyContent className='@3xl:max-h-none flex-col bg-gray-100 p-6'>
          {/* The tabs are icon-only below sm, so name the active one here. */}
          <P
            size='sm'
            weight='bold'
            marginBottom='sm'
            className='text-accent-blue uppercase sm:hidden'
          >
            {selectedTheme}
          </P>
          <div className='flex flex-wrap items-center justify-between'>
            <P size='xl' weight='bold' marginBottom='sm' className='text-2xl'>
              Featured indicators
            </P>
            <ColorLegend colors={COLORS} colorDomain={GROUPS} showNAColor={false} />
          </div>
          <Spacer size='base' />
          <div className='w-full min-w-0 rounded-xs border border-stroke bg-background'>
            <FeaturedIndicatorsTable
              indicators={featuredIndicators}
              onSelect={handleFeaturedSelect}
            />
          </div>
          <Spacer size='3xl' />
          <div ref={exploreSectionRef} />
          <P size='xl' weight='bold' marginBottom='sm' className='text-2xl'>
            Explore all indicators
          </P>
          <P marginBottom='2xs' size='sm'>
            Type or select indicator
          </P>
          <div className='max-w-75 md:max-w-100'>
            <DropdownSelect
              color='blue'
              value={{ label: selectedIndicatorData?.description, value: selectedIndicator }}
              // biome-ignore lint/suspicious/noExplicitAny: Need to fix in the DS
              onChange={(d: any) => setSelectedIndicator(d.value)}
              options={indicatorOptions}
              classNames={{
                groupHeading: () =>
                  'font-bold! text-xs! uppercase! py-2! m-0! bg-transparent! text-content-tertiary! cursor-default!',
              }}
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
                    <span
                      className='h-3 w-3 shrink-0 rounded-full'
                      style={{ backgroundColor: COLORS[0] }}
                    />
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
                    <span
                      className='h-3 w-3 shrink-0 rounded-full'
                      style={{ backgroundColor: COLORS[1] }}
                    />
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
                <div className='grid auto-rows-fr grid-cols-1 gap-4'>
                  <div className='flex items-stretch justify-between gap-4 rounded-xs border border-stroke bg-background p-6'>
                    <div className='flex flex-col gap-2'>
                      <P size='xs' weight='bold' marginBottom='none' className='uppercase'>
                        Roma
                      </P>
                      <div className='flex grow flex-col justify-center gap-2'>
                        <div className='flex items-baseline gap-1'>
                          <H3 marginBottom='none' style={{ color: COLORS[0] }}>
                            {romaValue}
                          </H3>
                          {romaRow?.yesPercent !== undefined ? (
                            <P size='lg' marginBottom='none' style={{ color: COLORS[0] }}>
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
                    </div>
                    <div className='hidden w-30 shrink-0 self-center xl:block'>
                      {romaRow?.yesPercent !== undefined ? (
                        <DonutChart
                          data={[
                            { label: 'yes', size: romaRow.yesPercent },
                            { label: 'no', size: romaRow.noPercent },
                          ]}
                          width={120}
                          height={120}
                          padding='0'
                          strokeWidth={15}
                          colors={[COLORS[0], 'var(--surface-sm)']}
                          showColorScale={false}
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className='flex items-stretch justify-between gap-4 rounded-xs border border-stroke bg-background p-6'>
                    <div className='flex flex-col gap-2'>
                      <P size='xs' weight='bold' marginBottom='none' className='uppercase'>
                        Non-Roma
                      </P>
                      <div className='flex grow flex-col justify-center gap-2'>
                        <div className='flex items-baseline gap-1'>
                          <H3 marginBottom='none' style={{ color: COLORS[1] }}>
                            {nonRomaValue}
                          </H3>
                          {nonRomaRow?.yesPercent !== undefined ? (
                            <P size='lg' marginBottom='none' style={{ color: COLORS[1] }}>
                              %
                            </P>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className='hidden w-30 shrink-0 self-center xl:block'>
                      {nonRomaRow?.yesPercent !== undefined ? (
                        <DonutChart
                          data={[
                            { label: 'yes', size: nonRomaRow.yesPercent },
                            { label: 'no', size: nonRomaRow.noPercent },
                          ]}
                          width={120}
                          height={120}
                          padding='0'
                          strokeWidth={15}
                          colors={[COLORS[1], 'var(--surface-sm)']}
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
