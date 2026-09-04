import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@undp/design-system-react/Accordion';
import { Button } from '@undp/design-system-react/Button';
import { Spacer } from '@undp/design-system-react/Spacer';
import { P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import { COLORS, GROUPS } from '@/Constants';
import type { SurveyIndicator } from '@/types';

export const DisaggregationsPanel = ({ indicator }: { indicator?: SurveyIndicator }) => {
  const [openDisaggregations, setOpenDisaggregations] = useState<string[]>([]);
  return (
    <>
      <div className='flex items-center justify-between gap-4 pb-2'>
        <P size='xs' weight='bold' marginBottom='none' className='text-content-tertiary uppercase'>
          Disaggregations
        </P>
        {openDisaggregations.length > 1 ? (
          <Button
            variant='link'
            className='text-accent-blue hover:text-blue-400'
            size='xs'
            padding='none'
            arrow={false}
            onClick={() => setOpenDisaggregations([])}
          >
            Collapse all
          </Button>
        ) : null}
      </div>
      <Spacer size='base' />
      <Accordion
        variant='tertiary'
        type='multiple'
        value={openDisaggregations}
        onValueChange={setOpenDisaggregations}
      >
        <AccordionItem className='py-0' value='sex'>
          <AccordionTrigger className='max-h-10 py-0 text-xs normal-case sm:text-base [&>svg]:text-accent-blue'>
            Sex of the respondent
          </AccordionTrigger>
          <AccordionContent className='h-auto animate-none'>
            <div className='flex flex-col gap-4'>
              {indicator?.roma
                .filter((el) => el.disaggregation === 'sex')
                .map((el) => el.category)
                .map((el) => (
                  <div key={el} className='p-4'>
                    <P size='base' weight='bold' marginBottom='none'>
                      {el}
                    </P>
                    <Spacer size='base' />
                    <SimpleBarGraph
                      data={[
                        {
                          label: GROUPS[0],
                          color: GROUPS[0],
                          size:
                            indicator?.roma.find((romaData) => romaData.category === el)
                              ?.yesPercent ??
                            indicator?.roma.find((romaData) => romaData.category === el)?.mean ??
                            indicator?.roma.find((romaData) => romaData.category === el)?.gapPp,
                        },
                        {
                          label: GROUPS[1],
                          color: GROUPS[1],
                          size:
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.yesPercent ??
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.mean ??
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.gapPp,
                        },
                      ]}
                      orientation='horizontal'
                      height={48}
                      topMargin={0}
                      hideAxisLine
                      showLabels={false}
                      leftMargin={0}
                      bottomMargin={0}
                      colors={COLORS}
                      trackColor='var(--surface-sm)'
                      showColorScale={false}
                      showTicks={false}
                      showValues
                      valueColor='var(--content-primary)'
                      numberDisplayOptions={{
                        suffix:
                          indicator?.roma.find((romaData) => romaData.category === el)
                            ?.yesPercent !== undefined
                            ? '%'
                            : '',
                      }}
                      maxValue={
                        indicator?.roma.find((romaData) => romaData.category === el)?.yesPercent !==
                        undefined
                          ? 100
                          : undefined
                      }
                    />
                  </div>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className='py-0' value='age group'>
          <AccordionTrigger className='max-h-10 py-0 text-xs normal-case sm:text-base [&>svg]:text-accent-blue'>
            Age groups of the respondent
          </AccordionTrigger>
          <AccordionContent className='h-auto animate-none'>
            <div className='flex flex-col gap-4'>
              {indicator?.roma
                .filter((el) => el.disaggregation === 'age group')
                .map((el) => el.category)
                .map((el) => (
                  <div key={el} className='p-4'>
                    <P size='base' weight='bold' marginBottom='none'>
                      {el}
                    </P>
                    <Spacer size='base' />
                    <SimpleBarGraph
                      data={[
                        {
                          label: GROUPS[0],
                          color: GROUPS[0],
                          size:
                            indicator?.roma.find((romaData) => romaData.category === el)
                              ?.yesPercent ??
                            indicator?.roma.find((romaData) => romaData.category === el)?.mean ??
                            indicator?.roma.find((romaData) => romaData.category === el)?.gapPp,
                        },
                        {
                          label: GROUPS[1],
                          color: GROUPS[1],
                          size:
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.yesPercent ??
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.mean ??
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.gapPp,
                        },
                      ]}
                      orientation='horizontal'
                      height={48}
                      topMargin={0}
                      bottomMargin={0}
                      colors={COLORS}
                      hideAxisLine
                      showLabels={false}
                      leftMargin={0}
                      trackColor='var(--surface-sm)'
                      showColorScale={false}
                      showTicks={false}
                      showValues
                      valueColor='var(--content-primary)'
                      numberDisplayOptions={{
                        suffix:
                          indicator?.roma.find((romaData) => romaData.category === el)
                            ?.yesPercent !== undefined
                            ? '%'
                            : '',
                      }}
                      maxValue={
                        indicator?.roma.find((romaData) => romaData.category === el)?.yesPercent !==
                        undefined
                          ? 100
                          : undefined
                      }
                    />
                  </div>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className='py-0' value='urbanisation'>
          <AccordionTrigger className='max-h-10 py-0 text-xs normal-case sm:text-base [&>svg]:text-accent-blue'>
            Urbanisation
          </AccordionTrigger>
          <AccordionContent className='h-auto animate-none'>
            <div className='flex flex-col gap-4'>
              {indicator?.roma
                .filter((el) => el.disaggregation === 'urbanisation')
                .map((el) => el.category)
                .map((el) => (
                  <div key={el} className='p-4'>
                    <P size='base' weight='bold' marginBottom='none'>
                      {el}
                    </P>
                    <Spacer size='base' />
                    <SimpleBarGraph
                      data={[
                        {
                          label: GROUPS[0],
                          color: GROUPS[0],
                          size:
                            indicator?.roma.find((romaData) => romaData.category === el)
                              ?.yesPercent ??
                            indicator?.roma.find((romaData) => romaData.category === el)?.mean ??
                            indicator?.roma.find((romaData) => romaData.category === el)?.gapPp,
                        },
                        {
                          label: GROUPS[1],
                          color: GROUPS[1],
                          size:
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.yesPercent ??
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.mean ??
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.gapPp,
                        },
                      ]}
                      orientation='horizontal'
                      height={48}
                      topMargin={0}
                      bottomMargin={0}
                      colors={COLORS}
                      trackColor='var(--surface-sm)'
                      showColorScale={false}
                      hideAxisLine
                      showLabels={false}
                      leftMargin={0}
                      showTicks={false}
                      showValues
                      valueColor='var(--content-primary)'
                      numberDisplayOptions={{
                        suffix:
                          indicator?.roma.find((romaData) => romaData.category === el)
                            ?.yesPercent !== undefined
                            ? '%'
                            : '',
                      }}
                      maxValue={
                        indicator?.roma.find((romaData) => romaData.category === el)?.yesPercent !==
                        undefined
                          ? 100
                          : undefined
                      }
                    />
                  </div>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className='py-0' value='education'>
          <AccordionTrigger className='max-h-10 py-0 text-xs normal-case sm:text-base [&>svg]:text-accent-blue'>
            Educational attainment of the respondent
          </AccordionTrigger>
          <AccordionContent className='h-auto animate-none'>
            <div className='flex flex-col gap-4'>
              {indicator?.roma
                .filter((el) => el.disaggregation === 'education')
                .map((el) => el.category)
                .map((el) => (
                  <div key={el} className='p-4'>
                    <P size='base' weight='bold' marginBottom='none'>
                      {el}
                    </P>
                    <Spacer size='base' />
                    <SimpleBarGraph
                      data={[
                        {
                          label: GROUPS[0],
                          color: GROUPS[0],
                          size:
                            indicator?.roma.find((romaData) => romaData.category === el)
                              ?.yesPercent ??
                            indicator?.roma.find((romaData) => romaData.category === el)?.mean ??
                            indicator?.roma.find((romaData) => romaData.category === el)?.gapPp,
                        },
                        {
                          label: GROUPS[1],
                          color: GROUPS[1],
                          size:
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.yesPercent ??
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.mean ??
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.gapPp,
                        },
                      ]}
                      orientation='horizontal'
                      height={48}
                      topMargin={0}
                      bottomMargin={0}
                      colors={COLORS}
                      hideAxisLine
                      showLabels={false}
                      leftMargin={0}
                      trackColor='var(--surface-sm)'
                      showColorScale={false}
                      showTicks={false}
                      showValues
                      valueColor='var(--content-primary)'
                      numberDisplayOptions={{
                        suffix:
                          indicator?.roma.find((romaData) => romaData.category === el)
                            ?.yesPercent !== undefined
                            ? '%'
                            : '',
                      }}
                      maxValue={
                        indicator?.roma.find((romaData) => romaData.category === el)?.yesPercent !==
                        undefined
                          ? 100
                          : undefined
                      }
                    />
                  </div>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className='py-0' value='employment status'>
          <AccordionTrigger className='max-h-10 py-0 text-xs normal-case sm:text-base [&>svg]:text-accent-blue'>
            Employment status of the respondent
          </AccordionTrigger>
          <AccordionContent className='h-auto animate-none'>
            <div className='flex flex-col gap-4'>
              {indicator?.roma
                .filter((el) => el.disaggregation === 'employment status')
                .map((el) => el.category)
                .map((el) => (
                  <div key={el} className='p-4'>
                    <P size='base' weight='bold' marginBottom='none'>
                      {el}
                    </P>
                    <Spacer size='base' />
                    <SimpleBarGraph
                      data={[
                        {
                          label: GROUPS[0],
                          color: GROUPS[0],
                          size:
                            indicator?.roma.find((romaData) => romaData.category === el)
                              ?.yesPercent ??
                            indicator?.roma.find((romaData) => romaData.category === el)?.mean ??
                            indicator?.roma.find((romaData) => romaData.category === el)?.gapPp,
                        },
                        {
                          label: GROUPS[1],
                          color: GROUPS[1],
                          size:
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.yesPercent ??
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.mean ??
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.gapPp,
                        },
                      ]}
                      orientation='horizontal'
                      height={48}
                      topMargin={0}
                      bottomMargin={0}
                      colors={COLORS}
                      hideAxisLine
                      showLabels={false}
                      leftMargin={0}
                      trackColor='var(--surface-sm)'
                      showColorScale={false}
                      showTicks={false}
                      showValues
                      valueColor='var(--content-primary)'
                      numberDisplayOptions={{
                        suffix:
                          indicator?.roma.find((romaData) => romaData.category === el)
                            ?.yesPercent !== undefined
                            ? '%'
                            : '',
                      }}
                      maxValue={
                        indicator?.roma.find((romaData) => romaData.category === el)?.yesPercent !==
                        undefined
                          ? 100
                          : undefined
                      }
                    />
                  </div>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className='py-0' value='household size'>
          <AccordionTrigger className='max-h-10 py-0 text-xs normal-case sm:text-base [&>svg]:text-accent-blue'>
            Household size
          </AccordionTrigger>
          <AccordionContent className='h-auto animate-none'>
            <div className='flex flex-col gap-4'>
              {indicator?.roma
                .filter((el) => el.disaggregation === 'household size')
                .map((el) => el.category)
                .map((el) => (
                  <div key={el} className='p-4'>
                    <P size='base' weight='bold' marginBottom='none'>
                      {el}
                    </P>
                    <Spacer size='base' />
                    <SimpleBarGraph
                      data={[
                        {
                          label: GROUPS[0],
                          color: GROUPS[0],
                          size:
                            indicator?.roma.find((romaData) => romaData.category === el)
                              ?.yesPercent ??
                            indicator?.roma.find((romaData) => romaData.category === el)?.mean ??
                            indicator?.roma.find((romaData) => romaData.category === el)?.gapPp,
                        },
                        {
                          label: GROUPS[1],
                          color: GROUPS[1],
                          size:
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.yesPercent ??
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.mean ??
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.gapPp,
                        },
                      ]}
                      orientation='horizontal'
                      height={48}
                      topMargin={0}
                      bottomMargin={0}
                      colors={COLORS}
                      trackColor='var(--surface-sm)'
                      showColorScale={false}
                      hideAxisLine
                      showLabels={false}
                      leftMargin={0}
                      showTicks={false}
                      showValues
                      valueColor='var(--content-primary)'
                      numberDisplayOptions={{
                        suffix:
                          indicator?.roma.find((romaData) => romaData.category === el)
                            ?.yesPercent !== undefined
                            ? '%'
                            : '',
                      }}
                      maxValue={
                        indicator?.roma.find((romaData) => romaData.category === el)?.yesPercent !==
                        undefined
                          ? 100
                          : undefined
                      }
                    />
                  </div>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className='py-0' value='children in household'>
          <AccordionTrigger className='max-h-10 py-0 text-xs normal-case sm:text-base [&>svg]:text-accent-blue'>
            Children in the household
          </AccordionTrigger>
          <AccordionContent className='h-auto animate-none'>
            <div className='flex flex-col gap-4'>
              {indicator?.roma
                .filter((el) => el.disaggregation === 'children in household')
                .map((el) => el.category)
                .map((el) => (
                  <div key={el} className='p-4'>
                    <P size='base' weight='bold' marginBottom='none'>
                      {el}
                    </P>
                    <Spacer size='base' />
                    <SimpleBarGraph
                      data={[
                        {
                          label: GROUPS[0],
                          color: GROUPS[0],
                          size:
                            indicator?.roma.find((romaData) => romaData.category === el)
                              ?.yesPercent ??
                            indicator?.roma.find((romaData) => romaData.category === el)?.mean ??
                            indicator?.roma.find((romaData) => romaData.category === el)?.gapPp,
                        },
                        {
                          label: GROUPS[1],
                          color: GROUPS[1],
                          size:
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.yesPercent ??
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.mean ??
                            indicator?.nonRoma.find((nonRomaData) => nonRomaData.category === el)
                              ?.gapPp,
                        },
                      ]}
                      orientation='horizontal'
                      height={48}
                      topMargin={0}
                      hideAxisLine
                      showLabels={false}
                      leftMargin={0}
                      bottomMargin={0}
                      colors={COLORS}
                      trackColor='var(--surface-sm)'
                      showColorScale={false}
                      showTicks={false}
                      showValues
                      valueColor='var(--content-primary)'
                      numberDisplayOptions={{
                        suffix:
                          indicator?.roma.find((romaData) => romaData.category === el)
                            ?.yesPercent !== undefined
                            ? '%'
                            : '',
                      }}
                      maxValue={
                        indicator?.roma.find((romaData) => romaData.category === el)?.yesPercent !==
                        undefined
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
    </>
  );
};
