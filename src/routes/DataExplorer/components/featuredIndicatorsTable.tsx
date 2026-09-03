import { DumbbellChart } from '@undp/data-viz/DumbbellChart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@undp/design-system-react/Table';
import { COLORS, GROUPS } from '@/Constants';
import type { SurveyIndicator } from '@/types';

export const FeaturedIndicatorsTable = ({ indicators }: { indicators: SurveyIndicator[] }) => (
  <Table className='table-fixed'>
    <TableHeader className='[&>tr]:border-stroke [&>tr]:border-b'>
      <TableRow className='[&>th]:bg-background [&>th]:py-2 [&>th]:pr-4 [&>th]:last:pr-3 [&>th]:font-bold [&>th]:text-content-tertiary [&>th]:text-xs [&>th]:uppercase [&>th]:leading-base md:[&>th]:text-xs lg:[&>th]:text-xs'>
        <TableHead className='w-[44%]'>Indicator</TableHead>
        <TableHead className='w-[9%]'>Roma</TableHead>
        <TableHead className='w-[12%]'>Non-Roma</TableHead>
        <TableHead className='w-[24%]'>Comparison</TableHead>
        <TableHead className='w-[11%] text-right'>Source</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody className='[&>tr]:border-stroke'>
      {indicators.map((indicator) => {
        const romaData = indicator.roma.find((el) => el.disaggregation === 'none');
        const nonRomaData = indicator.nonRoma.find((el) => el.disaggregation === 'none');
        const romaValue = romaData?.yesPercent ?? romaData?.mean ?? romaData?.gapPp;
        const nonRomaValue = nonRomaData?.yesPercent ?? nonRomaData?.mean ?? nonRomaData?.gapPp;
        const suffix = romaData?.yesPercent !== undefined ? '%' : '';
        return (
          <TableRow key={indicator.id}>
            <TableCell className='w-[44%] whitespace-normal py-2 pr-4 text-p-sm md:text-p-sm lg:text-p-sm'>
              {indicator.description}
            </TableCell>
            <TableCell className='w-[9%] pr-4 font-semibold text-accent-red text-p-sm md:text-p-sm lg:text-p-sm'>
              {romaValue}
              {suffix}
            </TableCell>
            <TableCell className='w-[12%] pr-4 text-accent-blue text-p-sm md:text-p-sm lg:text-p-sm'>
              {nonRomaValue}
              {suffix}
            </TableCell>
            <TableCell className='w-[24%] py-2 pr-4 text-p-sm md:text-p-sm lg:text-p-sm'>
              {romaValue !== undefined && nonRomaValue !== undefined ? (
                <DumbbellChart
                  data={[{ label: indicator.description, x: [nonRomaValue, romaValue] }]}
                  colorDomain={[GROUPS[1], GROUPS[0]]}
                  colors={[COLORS[1], COLORS[0]]}
                  orientation='horizontal'
                  height={24}
                  radius={4}
                  padding='0'
                  backgroundColor={false}
                  leftMargin={0}
                  rightMargin={0}
                  topMargin={0}
                  bottomMargin={0}
                  minValue={0}
                  maxValue={romaData?.yesPercent !== undefined ? 100 : undefined}
                  showLabels={false}
                  showValues={false}
                  showTicks={false}
                  showColorScale={false}
                />
              ) : null}
            </TableCell>
            <TableCell className='w-[11%] py-2 pr-3 text-right text-content-secondary text-p-sm md:text-p-sm lg:text-p-sm'>
              –
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
