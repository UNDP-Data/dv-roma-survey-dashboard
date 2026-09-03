import { useQuery } from '@tanstack/react-query';
import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { DonutChart } from '@undp/data-viz/DonutChart';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@undp/design-system-react/Accordion';
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
import type { SurveyIndicator } from '@/types';

function useSurveyData(country: string) {
  return useQuery({
    queryKey: ['survey-data', country],
    queryFn: () => fetchAndParseJSON(`./data/${country}.json`) as Promise<SurveyIndicator[]>,
  });
}

function generateBarGraphData(selectedIndicatorData: SurveyIndicator, category: string) {
  return [
    {
      label: 'Roma',
      color: 'Roma',
      size:
        selectedIndicatorData?.roma.find((romaData) => romaData.category === category)
          ?.yesPercent ??
        selectedIndicatorData?.roma.find((romaData) => romaData.category === category)?.mean ??
        selectedIndicatorData?.roma.find((romaData) => romaData.category === category)?.gapPp,
    },
    {
      label: 'Non-Roma',
      color: 'Non-Roma',
      size:
        selectedIndicatorData?.nonRoma.find((nonRomaData) => nonRomaData.category === category)
          ?.yesPercent ??
        selectedIndicatorData?.nonRoma.find((nonRomaData) => nonRomaData.category === category)
          ?.mean ??
        selectedIndicatorData?.nonRoma.find((nonRomaData) => nonRomaData.category === category)
          ?.gapPp,
    },
  ];
}

export const DataExplorerEl = ({ country }: { country: string }) => {
  const [selectedTheme, setSelectedTheme] = useState('workAndEmployment');
  const [selectedIndicator, setSelectedIndicator] = useState('acceptance_as_spouse');
  const { data, isLoading, isError } = useSurveyData(country);

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;

  if (isError || !data) return <>Error</>;

  const selectedIndicatorData = data.find((d) => d.id === selectedIndicator);
  return (
    <VisualizationWidget>
      <VisualizationWidgetHeader
        defaultValue={selectedTheme}
        onChange={setSelectedTheme}
        activeItemClass='bg-background text-accent-blue'
      >
        <VisualizationWidgetHeaderItem value='workAndEmployment'>
          <BriefcaseBusiness size={20} strokeWidth={1.5} />
          Work & employment
        </VisualizationWidgetHeaderItem>
        <VisualizationWidgetHeaderItem value='education'>
          <GraduationCap size={20} strokeWidth={1.5} />
          Education
        </VisualizationWidgetHeaderItem>
        <VisualizationWidgetHeaderItem value='health'>
          <Heart size={20} strokeWidth={1.5} />
          Health
        </VisualizationWidgetHeaderItem>
        <VisualizationWidgetHeaderItem value='livingConditions'>
          <House size={20} strokeWidth={1.5} />
          Living conditions
        </VisualizationWidgetHeaderItem>
        <VisualizationWidgetHeaderItem value='discrimination'>
          <AlignHorizontalJustifyCenter size={20} strokeWidth={1.5} />
          Discrimination
        </VisualizationWidgetHeaderItem>
      </VisualizationWidgetHeader>
      <VisualizationWidgetBody className='@3xl:max-h-none @3xl:flex-col'>
        <VisualizationWidgetBodyContent className='@3xl:max-h-none flex-col p-4'>
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
          <div className='mx-auto my-8 w-full bg-surface p-4'>
            <P size='lg' marginBottom='none' weight='bold'>
              {selectedIndicatorData?.description}
            </P>
            <Spacer size='xl' />
            <Grid
              gap='16px'
              noOfCol={{
                base: 1,
                md: 3,
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
                <div>
                  <P
                    size='xs'
                    weight='bold'
                    marginBottom='none'
                    className='text-content-tertiary uppercase'
                  >
                    No. of respondent
                  </P>
                  <Spacer size='base' />
                  <P size='base' marginBottom='none'>
                    {selectedIndicatorData?.noOfRespondents}
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
                <div>
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
            <Grid
              gap='16px'
              noOfCol={{
                base: 1,
                lg: 2,
              }}
            >
              <GridItem
                noOfColSpan={{
                  base: 1,
                  md: 1,
                }}
              >
                <Spacer size='base' />
                <div className='flex h-93 flex-col gap-4'>
                  <P size='xs' weight='bold' marginBottom='none' className='text-content-tertiary'>
                    Roma v/s Non-Roma
                  </P>
                  <div className='flex grow flex-col gap-3 rounded-xs border border-stroke p-4'>
                    <div className='flex items-stretch justify-between'>
                      <div className='flex h-30 flex-col justify-between'>
                        <P size='base' weight='bold' marginBottom='none'>
                          Roma
                        </P>
                        <H3 weight='bold' marginBottom='none' className='text-accent-red'>
                          {selectedIndicatorData?.roma.find((el) => el.disaggregation === 'none')
                            ?.yesPercent ??
                            selectedIndicatorData?.roma.find((el) => el.disaggregation === 'none')
                              ?.mean ??
                            selectedIndicatorData?.roma.find((el) => el.disaggregation === 'none')
                              ?.gapPp}
                          {selectedIndicatorData?.roma.find((el) => el.disaggregation === 'none')
                            ?.yesPercent !== undefined
                            ? '%'
                            : ''}
                        </H3>
                      </div>
                      {selectedIndicatorData?.roma.find((el) => el.disaggregation === 'none')
                        ?.yesPercent !== undefined ? (
                        <div className='flex h-full'>
                          <DonutChart
                            data={[
                              {
                                label: 'yes',
                                size:
                                  selectedIndicatorData?.roma.find(
                                    (el) => el.disaggregation === 'none',
                                  )?.yesPercent ?? 0,
                              },
                              {
                                label: 'no',
                                size:
                                  selectedIndicatorData?.roma.find(
                                    (el) => el.disaggregation === 'none',
                                  )?.noPercent ?? 0,
                              },
                            ]}
                            width={120}
                            height={120}
                            padding='0'
                            strokeWidth={15}
                            colors={['var(--accent-red)', 'var(--surface-sm)']}
                            showColorScale={false}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className='flex grow flex-col gap-3 rounded-xs border border-stroke p-4'>
                    <div className='flex items-stretch justify-between'>
                      <div className='flex h-30 flex-col justify-between'>
                        <P size='base' weight='bold' marginBottom='none'>
                          Non-Roma
                        </P>
                        <H3 weight='bold' marginBottom='none' className='text-accent-blue'>
                          {selectedIndicatorData?.nonRoma.find((el) => el.disaggregation === 'none')
                            ?.yesPercent ??
                            selectedIndicatorData?.nonRoma.find(
                              (el) => el.disaggregation === 'none',
                            )?.mean ??
                            selectedIndicatorData?.nonRoma.find(
                              (el) => el.disaggregation === 'none',
                            )?.gapPp}
                          {selectedIndicatorData?.nonRoma.find((el) => el.disaggregation === 'none')
                            ?.yesPercent !== undefined
                            ? '%'
                            : ''}
                        </H3>
                      </div>
                      {selectedIndicatorData?.nonRoma.find((el) => el.disaggregation === 'none')
                        ?.yesPercent !== undefined ? (
                        <div className='flex h-full'>
                          <DonutChart
                            data={[
                              {
                                label: 'yes',
                                size:
                                  selectedIndicatorData?.roma.find(
                                    (el) => el.disaggregation === 'none',
                                  )?.yesPercent ?? 0,
                              },
                              {
                                label: 'no',
                                size:
                                  selectedIndicatorData?.roma.find(
                                    (el) => el.disaggregation === 'none',
                                  )?.noPercent ?? 0,
                              },
                            ]}
                            colors={['var(--accent-blue)', 'var(--surface-sm)']}
                            width={120}
                            padding='0'
                            height={120}
                            strokeWidth={15}
                            showColorScale={false}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </GridItem>
              <GridItem
                noOfColSpan={{
                  base: 1,
                  md: 1,
                }}
              >
                <Spacer size='base' />
                <div className='undp-scrollbar flex h-93 flex-col gap-4'>
                  <P size='xs' weight='bold' marginBottom='none' className='text-content-tertiary'>
                    Disaggregation
                  </P>
                  <Accordion collapsible variant='primary' type='single'>
                    <AccordionItem className='bg-white' value='sex'>
                      <AccordionTrigger>Sex of the person</AccordionTrigger>
                      <AccordionContent>
                        <div className='flex flex-col gap-4'>
                          {selectedIndicatorData?.roma
                            .filter((el) => el.disaggregation === 'sex')
                            .map((el) => el.category)
                            .map((el) => (
                              <div key={el} className='bg-surface p-4'>
                                <P size='base' weight='bold' marginBottom='none'>
                                  {el}
                                </P>
                                <Spacer size='base' />
                                <SimpleBarGraph
                                  data={generateBarGraphData(selectedIndicatorData, el)}
                                  orientation='horizontal'
                                  height={60}
                                  topMargin={0}
                                  bottomMargin={0}
                                  colors={['var(--accent-red)', 'var(--accent-blue)']}
                                  showColorScale={false}
                                  showTicks={false}
                                  showValues
                                  numberDisplayOptions={{
                                    suffix:
                                      selectedIndicatorData?.roma.find(
                                        (romaData) => romaData.category === el,
                                      )?.yesPercent !== undefined
                                        ? '%'
                                        : '',
                                  }}
                                  maxValue={
                                    selectedIndicatorData?.roma.find(
                                      (romaData) => romaData.category === el,
                                    )?.yesPercent !== undefined
                                      ? 100
                                      : undefined
                                  }
                                />
                              </div>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className='bg-white' value='age group'>
                      <AccordionTrigger>Age group of the person</AccordionTrigger>
                      <AccordionContent>
                        <div className='flex flex-col gap-4'>
                          {selectedIndicatorData?.roma
                            .filter((el) => el.disaggregation === 'age group')
                            .map((el) => el.category)
                            .map((el) => (
                              <div key={el} className='bg-surface p-4'>
                                <P size='base' weight='bold' marginBottom='none'>
                                  {el}
                                </P>
                                <Spacer size='base' />
                                <SimpleBarGraph
                                  data={generateBarGraphData(selectedIndicatorData, el)}
                                  colors={['var(--accent-red)', 'var(--accent-blue)']}
                                  showColorScale={false}
                                  showTicks={false}
                                  showValues
                                  numberDisplayOptions={{
                                    suffix:
                                      selectedIndicatorData?.roma.find(
                                        (romaData) => romaData.category === el,
                                      )?.yesPercent !== undefined
                                        ? '%'
                                        : '',
                                  }}
                                  orientation='horizontal'
                                  height={60}
                                  topMargin={0}
                                  bottomMargin={0}
                                  maxValue={
                                    selectedIndicatorData?.roma.find(
                                      (romaData) => romaData.category === el,
                                    )?.yesPercent !== undefined
                                      ? 100
                                      : undefined
                                  }
                                />
                              </div>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className='bg-white' value='urbanisation'>
                      <AccordionTrigger>Urbanization</AccordionTrigger>
                      <AccordionContent>
                        <div className='flex flex-col gap-4'>
                          {selectedIndicatorData?.roma
                            .filter((el) => el.disaggregation === 'urbanisation')
                            .map((el) => el.category)
                            .map((el) => (
                              <div key={el} className='bg-surface p-4'>
                                <P size='base' weight='bold' marginBottom='none'>
                                  {el}
                                </P>
                                <Spacer size='base' />
                                <SimpleBarGraph
                                  data={generateBarGraphData(selectedIndicatorData, el)}
                                  colors={['var(--accent-red)', 'var(--accent-blue)']}
                                  showColorScale={false}
                                  showTicks={false}
                                  showValues
                                  numberDisplayOptions={{
                                    suffix:
                                      selectedIndicatorData?.roma.find(
                                        (romaData) => romaData.category === el,
                                      )?.yesPercent !== undefined
                                        ? '%'
                                        : '',
                                  }}
                                  orientation='horizontal'
                                  height={60}
                                  topMargin={0}
                                  bottomMargin={0}
                                  maxValue={
                                    selectedIndicatorData?.roma.find(
                                      (romaData) => romaData.category === el,
                                    )?.yesPercent !== undefined
                                      ? 100
                                      : undefined
                                  }
                                />
                              </div>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className='bg-white' value='education'>
                      <AccordionTrigger>Educational attainment of the person</AccordionTrigger>
                      <AccordionContent>
                        <div className='flex flex-col gap-4'>
                          {selectedIndicatorData?.roma
                            .filter((el) => el.disaggregation === 'education')
                            .map((el) => el.category)
                            .map((el) => (
                              <div key={el} className='bg-surface p-4'>
                                <P size='base' weight='bold' marginBottom='none'>
                                  {el}
                                </P>
                                <Spacer size='base' />
                                <SimpleBarGraph
                                  data={generateBarGraphData(selectedIndicatorData, el)}
                                  colors={['var(--accent-red)', 'var(--accent-blue)']}
                                  showColorScale={false}
                                  showTicks={false}
                                  showValues
                                  numberDisplayOptions={{
                                    suffix:
                                      selectedIndicatorData?.roma.find(
                                        (romaData) => romaData.category === el,
                                      )?.yesPercent !== undefined
                                        ? '%'
                                        : '',
                                  }}
                                  orientation='horizontal'
                                  height={60}
                                  topMargin={0}
                                  bottomMargin={0}
                                  maxValue={
                                    selectedIndicatorData?.roma.find(
                                      (romaData) => romaData.category === el,
                                    )?.yesPercent !== undefined
                                      ? 100
                                      : undefined
                                  }
                                />
                              </div>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className='bg-white' value='employment status'>
                      <AccordionTrigger>Employment status of the person</AccordionTrigger>
                      <AccordionContent>
                        <div className='flex flex-col gap-4'>
                          {selectedIndicatorData?.roma
                            .filter((el) => el.disaggregation === 'employment status')
                            .map((el) => el.category)
                            .map((el) => (
                              <div key={el} className='bg-surface p-4'>
                                <P size='base' weight='bold' marginBottom='none'>
                                  {el}
                                </P>
                                <Spacer size='base' />
                                <SimpleBarGraph
                                  data={generateBarGraphData(selectedIndicatorData, el)}
                                  colors={['var(--accent-red)', 'var(--accent-blue)']}
                                  showColorScale={false}
                                  showTicks={false}
                                  showValues
                                  numberDisplayOptions={{
                                    suffix:
                                      selectedIndicatorData?.roma.find(
                                        (romaData) => romaData.category === el,
                                      )?.yesPercent !== undefined
                                        ? '%'
                                        : '',
                                  }}
                                  orientation='horizontal'
                                  height={60}
                                  topMargin={0}
                                  bottomMargin={0}
                                  maxValue={
                                    selectedIndicatorData?.roma.find(
                                      (romaData) => romaData.category === el,
                                    )?.yesPercent !== undefined
                                      ? 100
                                      : undefined
                                  }
                                />
                              </div>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className='bg-white' value='household size'>
                      <AccordionTrigger>Household size</AccordionTrigger>
                      <AccordionContent>
                        <div className='flex flex-col gap-4'>
                          {selectedIndicatorData?.roma
                            .filter((el) => el.disaggregation === 'household size')
                            .map((el) => el.category)
                            .map((el) => (
                              <div key={el} className='bg-surface p-4'>
                                <P size='base' weight='bold' marginBottom='none'>
                                  {el}
                                </P>
                                <Spacer size='base' />
                                <SimpleBarGraph
                                  data={generateBarGraphData(selectedIndicatorData, el)}
                                  colors={['var(--accent-red)', 'var(--accent-blue)']}
                                  showColorScale={false}
                                  showTicks={false}
                                  showValues
                                  numberDisplayOptions={{
                                    suffix:
                                      selectedIndicatorData?.roma.find(
                                        (romaData) => romaData.category === el,
                                      )?.yesPercent !== undefined
                                        ? '%'
                                        : '',
                                  }}
                                  orientation='horizontal'
                                  height={60}
                                  topMargin={0}
                                  bottomMargin={0}
                                  maxValue={
                                    selectedIndicatorData?.roma.find(
                                      (romaData) => romaData.category === el,
                                    )?.yesPercent !== undefined
                                      ? 100
                                      : undefined
                                  }
                                />
                              </div>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className='bg-white' value='children in household'>
                      <AccordionTrigger>Children in household</AccordionTrigger>
                      <AccordionContent>
                        <div className='flex flex-col gap-4'>
                          {selectedIndicatorData?.roma
                            .filter((el) => el.disaggregation === 'children in household')
                            .map((el) => el.category)
                            .map((el) => (
                              <div key={el} className='bg-surface p-4'>
                                <P size='base' weight='bold' marginBottom='none'>
                                  {el}
                                </P>
                                <Spacer size='base' />
                                <SimpleBarGraph
                                  data={generateBarGraphData(selectedIndicatorData, el)}
                                  colors={['var(--accent-red)', 'var(--accent-blue)']}
                                  showColorScale={false}
                                  showTicks={false}
                                  showValues
                                  numberDisplayOptions={{
                                    suffix:
                                      selectedIndicatorData?.roma.find(
                                        (romaData) => romaData.category === el,
                                      )?.yesPercent !== undefined
                                        ? '%'
                                        : '',
                                  }}
                                  orientation='horizontal'
                                  height={60}
                                  topMargin={0}
                                  bottomMargin={0}
                                  maxValue={
                                    selectedIndicatorData?.roma.find(
                                      (romaData) => romaData.category === el,
                                    )?.yesPercent !== undefined
                                      ? 100
                                      : undefined
                                  }
                                />
                              </div>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </GridItem>
            </Grid>
          </div>
        </VisualizationWidgetBodyContent>
      </VisualizationWidgetBody>
    </VisualizationWidget>
  );
};
