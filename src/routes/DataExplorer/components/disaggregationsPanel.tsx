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
import type { IndicatorMetaDataType, SurveyIndicatorDataType } from '@/types';

interface Props {
  indicator: SurveyIndicatorDataType;
  meta: IndicatorMetaDataType;
}

export const DisaggregationsPanel = ({ indicator, meta }: Props) => {
  const [openDisaggregations, setOpenDisaggregations] = useState<string[]>([]);
  const calcType = meta.calculationTypeForDisaggregation;

  const disaggregationGraphSettings = [
    {
      id: 'sex',
      title: `Sex of the ${calcType?.sex ?? 'respondent'}`,
    },
    {
      id: 'age group',
      title: `Age groups of the ${calcType?.age ?? 'respondent'}`,
    },
    {
      id: 'urbanisation',
      title: 'Urbanisation',
    },
    {
      id: 'education',
      title: `Educational attainment of the ${calcType?.education ?? 'respondent'}`,
    },
    {
      id: 'employment status',
      title: `Employment status of the ${calcType?.employment ?? 'respondent'}`,
    },
    {
      id: 'household size',
      title: 'Household size',
    },
    {
      id: 'children in household',
      title: 'Children in the household',
    },
  ];

  return (
    <>
      <div className='flex items-center justify-between gap-4 pb-2'>
        <P size='xs' weight='bold' marginBottom='none' className='text-content-tertiary uppercase'>
          Disaggregations
        </P>
        {openDisaggregations.length > 1 ? (
          <Button
            variant='link'
            className='text-secondary hover:text-blue-400'
            size='xs'
            padding='none'
            endIcon='none'
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
        {disaggregationGraphSettings.map((d) => (
          <AccordionItem className='py-0' value={d.id} key={d.id}>
            <AccordionTrigger className='max-h-10 cursor-pointer py-0 text-xs normal-case sm:text-base [&>svg]:text-secondary'>
              {d.title}
            </AccordionTrigger>
            <AccordionContent className='h-auto animate-none'>
              <div className='flex flex-col [&>*+*]:border-stroke [&>*+*]:border-t'>
                {indicator?.roma
                  .filter((el) => el.disaggregation === d.id)
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
                            label: 'Roma',
                            color: 'Roma',
                            size:
                              indicator?.roma.find((romaData) => romaData.category === el)
                                ?.yesPercent ??
                              indicator?.roma.find((romaData) => romaData.category === el)?.mean ??
                              indicator?.roma.find((romaData) => romaData.category === el)?.gapPp,
                          },
                          {
                            label: 'Non-Roma',
                            color: 'Non-Roma',
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
                        showLabels={false}
                        leftMargin={0}
                        bottomMargin={0}
                        colors={['var(--roma)', 'var(--non-roma)']}
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
                        maxValue={meta.maxValue}
                        minValue={0}
                      />
                    </div>
                  ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
