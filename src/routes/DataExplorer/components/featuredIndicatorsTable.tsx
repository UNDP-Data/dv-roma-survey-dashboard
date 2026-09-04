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

export const FeaturedIndicatorsTable = ({
  indicators,
  onSelect,
}: {
  indicators: SurveyIndicator[];
  onSelect?: (id: string) => void;
}) => (
  <Table className='min-w-120 table-fixed sm:min-w-160'>
    <TableHeader className='[&>tr]:border-stroke [&>tr]:border-b'>
      <TableRow className='[&>th]:whitespace-normal [&>th]:bg-background [&>th]:py-2 [&>th]:pr-2 [&>th]:font-bold [&>th]:text-content-tertiary [&>th]:text-xs [&>th]:uppercase [&>th]:leading-base [&>th]:last:pr-2 sm:[&>th]:whitespace-nowrap sm:[&>th]:pr-4 sm:[&>th]:last:pr-3 md:[&>th]:text-xs lg:[&>th]:text-xs'>
        <TableHead className='w-[26%] sm:w-[44%]'>Indicator</TableHead>
        <TableHead className='w-[13%] sm:w-[9%]'>Roma</TableHead>
        <TableHead className='w-[14%] sm:w-[12%]'>Non-Roma</TableHead>
        <TableHead className='w-[35%] sm:w-[24%]'>Comparison</TableHead>
        <TableHead className='w-[12%] text-right sm:w-[11%]'>Source</TableHead>
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
          <TableRow
            key={indicator.id}
            onClick={() => onSelect?.(indicator.id)}
            className='cursor-pointer hover:bg-surface-2xs'
          >
            <TableCell className='w-[25%] overflow-hidden py-2 pr-4 text-sm sm:w-[50%] sm:text-p-sm md:text-p-sm lg:text-p-sm'>
              <span className='block truncate' title={indicator.description}>
                {indicator.description}
              </span>
            </TableCell>
            <TableCell
              className='w-[10%] pr-4 font-semibold text-p-sm sm:w-[10%] md:text-p-sm lg:text-p-sm'
              style={{ color: COLORS[0] }}
            >
              {romaValue}
              {suffix}
            </TableCell>
            <TableCell
              className='w-[10%] pr-4 font-semibold text-p-sm sm:w-[10%] md:text-p-sm lg:text-p-sm'
              style={{ color: COLORS[1] }}
            >
              {nonRomaValue}
              {suffix}
            </TableCell>
            <TableCell className='w-[35%] py-2 pr-4 text-p-sm sm:w-[20%] md:text-p-sm lg:text-p-sm'>
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
                  leftMargin={10}
                  rightMargin={10}
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
            <TableCell className='w-[15%] py-2 pr-3 text-right text-content-secondary text-p-sm sm:w-[10%] md:text-p-sm lg:text-p-sm'>
              –
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
