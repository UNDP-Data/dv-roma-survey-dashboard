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
import { useEffect, useMemo, useRef, useState } from 'react';
import { FEATURED_INDICATORS, GROUPS } from '@/Constants';
import type { IndicatorMetaDataType, SurveyIndicatorDataType, Themes } from '@/types';
import { DisaggregationsPanel } from './components/disaggregationsPanel';
import { FeaturedIndicatorsTable } from './components/featuredIndicatorsTable';

function useDataExplorerData(country: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['survey-data', country],
    queryFn: () =>
      fetchAndParseJSON(`./data/${country}.json`) as Promise<SurveyIndicatorDataType[]>,
  });
  const {
    data: metaData,
    isLoading: isMetaDataLoading,
    isError: isMetaDataError,
  } = useQuery({
    queryKey: ['indicator-metadata'],
    queryFn: () =>
      fetchAndParseJSON('./data/indicatorMetaData.json') as Promise<IndicatorMetaDataType[]>,
  });
  return {
    data,
    isLoading: isLoading || isMetaDataLoading,
    isError: isError || isMetaDataError,
    metaData,
  };
}

export const DataExplorerEl = ({ country }: { country: string }) => {
  const [selectedTheme, setSelectedTheme] = useState<Themes>('Education');
  const [selectedIndicator, setSelectedIndicator] = useState('child_enrolled_in_daycare');
  const { data, isLoading, isError, metaData } = useDataExplorerData(country);
  const exploreSectionRef = useRef<HTMLDivElement>(null);

  const metaDataFilteredByCategory = useMemo(
    () => metaData?.filter((d) => d.category === selectedTheme),
    [selectedTheme, metaData],
  );

  useEffect(() => {
    if (metaDataFilteredByCategory) setSelectedIndicator(metaDataFilteredByCategory[0].id);
  }, [metaDataFilteredByCategory]);

  const handleFeaturedSelect = (id: string) => {
    setSelectedIndicator(id);
    exploreSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (isError) return <>Error</>;

  if (isLoading || !data || !metaData) return <Spinner size='lg' className='mx-auto my-20' />;

  const featuredIndicators = FEATURED_INDICATORS[selectedTheme]
    .map((id) => data.find((d) => d.id === id))
    .filter((d) => d !== undefined);

  const metaDataSubCategoryFilteredByCategory = [
    ...new Set(metaDataFilteredByCategory?.map((d) => d.subCategory)),
  ];

  const indicatorOptionsBySubCategory = metaDataSubCategoryFilteredByCategory.map((d) => ({
    label: d,
    options: (metaDataFilteredByCategory || [])
      .filter((el) => el.subCategory === d)
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((el) => ({ label: el.title, value: el.id })),
  }));

  const selectedIndicatorData = data.find(
    (d) => d.id === selectedIndicator,
  ) as SurveyIndicatorDataType;
  const selectedMeta = metaData.find((d) => d.id === selectedIndicator) as IndicatorMetaDataType;
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
          setSelectedTheme(value as Themes);
        }}
        activeItemClass='bg-background font-bold text-secondary shadow-[inset_0_3px_0_0_var(--secondary)]'
        className='h-16 overflow-x-auto sm:h-20'
      >
        <VisualizationWidgetHeaderItem
          value='Education'
          className='basis-0 sm:min-w-32 sm:shrink-0'
        >
          <GraduationCap size={20} strokeWidth={selectedTheme === 'Education' ? 2 : 1.5} />
          <span className='hidden sm:inline'>Education</span>
        </VisualizationWidgetHeaderItem>
        <VisualizationWidgetHeaderItem
          value='Employment'
          className='basis-0 sm:min-w-32 sm:shrink-0'
        >
          <BriefcaseBusiness size={20} strokeWidth={selectedTheme === 'Employment' ? 2 : 1.5} />
          <span className='hidden sm:inline'>Economic security</span>
        </VisualizationWidgetHeaderItem>
        <VisualizationWidgetHeaderItem value='Housing' className='basis-0 sm:min-w-32 sm:shrink-0'>
          <House size={20} strokeWidth={selectedTheme === 'Housing' ? 2 : 1.5} />
          <span className='hidden sm:inline'>Living conditions</span>
        </VisualizationWidgetHeaderItem>
        <VisualizationWidgetHeaderItem value='Health' className='basis-0 sm:min-w-32 sm:shrink-0'>
          <Heart size={20} strokeWidth={selectedTheme === 'Health' ? 2 : 1.5} />
          <span className='hidden sm:inline'>Health</span>
        </VisualizationWidgetHeaderItem>
        <VisualizationWidgetHeaderItem
          value='Discrimination'
          className='basis-0 sm:min-w-32 sm:shrink-0'
        >
          <AlignHorizontalJustifyCenter
            size={20}
            strokeWidth={selectedTheme === 'Discrimination' ? 2 : 1.5}
          />
          <span className='hidden sm:inline'>Discrimination</span>
        </VisualizationWidgetHeaderItem>
      </VisualizationWidgetHeader>
      <VisualizationWidgetBody className='@3xl:max-h-none @3xl:flex-col border-stroke border-t'>
        <VisualizationWidgetBodyContent className='@3xl:max-h-none flex-col bg-gray-100 p-6'>
          <P
            size='sm'
            weight='bold'
            marginBottom='sm'
            className='text-secondary uppercase sm:hidden'
          >
            {selectedTheme}
          </P>
          <div className='flex flex-wrap items-center justify-between'>
            <P size='xl' weight='bold' marginBottom='sm' className='text-2xl'>
              Featured indicators
            </P>
            <ColorLegend
              colors={GROUPS.map((d) => `var(--${d.toLowerCase()})`)}
              colorDomain={GROUPS}
              showNAColor={false}
            />
          </div>
          <Spacer size='base' />
          <div className='w-full min-w-0 rounded-xs border border-stroke bg-background'>
            <FeaturedIndicatorsTable
              indicators={featuredIndicators}
              metaDataFilteredByCategory={metaDataFilteredByCategory || []}
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
              value={{ label: selectedMeta?.title, value: selectedMeta?.id }}
              // biome-ignore lint/suspicious/noExplicitAny: Need to fix in the DS
              onChange={(d: any) => setSelectedIndicator(d.value)}
              options={indicatorOptionsBySubCategory}
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
            <P size='xl'>{selectedMeta?.title}</P>
            <Grid
              gap='16px'
              noOfCol={{
                base: 1,
                lg: 12,
                sm: 2,
              }}
            >
              <GridItem
                noOfColSpan={{
                  base: 1,
                  lg: 5,
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
                    {selectedMeta?.formula}
                  </P>
                </div>
              </GridItem>
              <GridItem
                noOfColSpan={{
                  base: 1,
                  lg: 3,
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
                    {selectedMeta?.surveyBase}
                  </P>
                </div>
              </GridItem>
              <GridItem
                noOfColSpan={{
                  base: 1,
                  lg: 2,
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
                  {GROUPS.map((d) => (
                    <div className='flex items-center gap-2' key={d}>
                      <span
                        className='h-3 w-3 shrink-0 rounded-full'
                        style={{ backgroundColor: `var(--${d.toLocaleLowerCase()})` }}
                      />
                      <P size='base' marginBottom='none'>
                        {d}
                      </P>
                      <P size='base' weight='bold' marginBottom='none'>
                        {selectedIndicatorData?.[d === 'Roma' ? 'roma' : 'nonRoma']
                          .find((el) => el.disaggregation === 'none')
                          ?.noOfRespondents.toLocaleString('en-US')}
                      </P>
                    </div>
                  ))}
                </div>
              </GridItem>
              <GridItem
                noOfColSpan={{
                  base: 1,
                  lg: 2,
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
                    {selectedMeta?.source}
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
                  {GROUPS.map((d) => {
                    const rowData = d === 'Roma' ? romaRow : nonRomaRow;
                    return (
                      <div
                        key={d}
                        className='flex items-stretch justify-between gap-4 rounded-xs border border-stroke bg-background p-6'
                      >
                        <div className='flex flex-col gap-2'>
                          <P size='xs' weight='bold' marginBottom='none' className='uppercase'>
                            {d}
                          </P>
                          <div className='flex grow flex-col justify-center gap-2'>
                            <div className='flex items-baseline gap-1'>
                              <H3
                                marginBottom='none'
                                style={{ color: `var(--${d.toLowerCase()})` }}
                              >
                                {d === 'Roma' ? romaValue : nonRomaValue}
                              </H3>
                              {rowData?.yesPercent !== undefined ? (
                                <P
                                  size='lg'
                                  marginBottom='none'
                                  style={{ color: `var(--${d.toLowerCase()})` }}
                                >
                                  %
                                </P>
                              ) : null}
                            </div>
                            {gap !== undefined && d === 'Roma' && (
                              <Badge
                                color='surface-sm'
                                size='sm'
                                rounded='sm'
                                className='w-fit rounded-lg'
                              >
                                {gap > 0 ? '+' : ''}
                                {gap.toFixed(1)}{' '}
                                {rowData?.yesPercent !== undefined
                                  ? 'pp vs non-Roma'
                                  : 'vs non-Roma'}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className='hidden w-30 shrink-0 self-center xl:block'>
                          {rowData?.yesPercent !== undefined && (
                            <DonutChart
                              data={[
                                { label: 'yes', size: rowData.yesPercent },
                                { label: 'no', size: rowData.noPercent },
                              ]}
                              width={120}
                              height={120}
                              padding='0'
                              strokeWidth={15}
                              colors={[`var(--${d.toLowerCase()})`, 'var(--surface-sm)']}
                              showColorScale={false}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Spacer size='base' />
                <P size='sm' marginBottom='none' className='text-content-tertiary'>
                  Source: 2025 Multi-Country Survey on Socio-Economic Vulnerabilities of Roma
                </P>
              </GridItem>
              <GridItem noOfColSpan={{ base: 1, lg: 3 }}>
                <DisaggregationsPanel indicator={selectedIndicatorData} meta={selectedMeta} />
              </GridItem>
            </Grid>
          </div>
        </VisualizationWidgetBodyContent>
      </VisualizationWidgetBody>
    </VisualizationWidget>
  );
};
