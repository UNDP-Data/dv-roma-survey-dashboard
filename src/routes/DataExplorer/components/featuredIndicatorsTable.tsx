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
import type { IndicatorMetaData, SurveyIndicator } from '@/types';

export const FeaturedIndicatorsTable = ({
  indicators,
  metaById,
  onSelect,
}: {
  indicators: SurveyIndicator[];
  metaById?: Map<string, IndicatorMetaData>;
  onSelect?: (id: string) => void;
}) => (
  <Table className='min-w-120 table-fixed sm:min-w-160'>
    <TableHeader className='[&>tr]:border-stroke [&>tr]:border-b'>
      <TableRow className='[&>th]:whitespace-normal [&>th]:bg-background [&>th]:py-2 [&>th]:font-bold [&>th]:text-content-tertiary [&>th]:text-xs [&>th]:uppercase [&>th]:leading-base sm:[&>th]:whitespace-nowrap md:[&>th]:text-xs lg:[&>th]:text-xs'>
        <TableHead className='w-[30%] pr-2 sm:w-[50%] sm:pr-4'>Indicator</TableHead>
        <TableHead className='w-[10%] pr-1 text-right sm:w-[9%] sm:pr-1'>Roma</TableHead>
        <TableHead className='w-[10%] pr-2 text-right sm:w-[10%] sm:pr-4'>Non-Roma</TableHead>
        <TableHead className='w-[30%] pr-2 sm:w-[20%] sm:pr-4'>Comparison</TableHead>
        <TableHead className='w-[20%] pr-2 text-right sm:w-[11%] sm:pr-3'>Source</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody className='[&>tr]:border-stroke'>
      {indicators.map((indicator) => {
        const meta = metaById?.get(indicator.id);
        const title = meta?.title ?? indicator.description;
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
            <TableCell className='w-[30%] overflow-hidden py-2 pr-2 text-sm sm:w-[50%] sm:pr-4 sm:text-p-sm md:text-p-sm lg:text-p-sm'>
              <span className='block truncate' title={title}>
                {title}
              </span>
            </TableCell>
            <TableCell
              className='w-[10%] pr-1 text-right font-semibold text-p-sm tabular-nums sm:w-[9%] sm:pr-1 md:text-p-sm lg:text-p-sm'
              style={{ color: COLORS[0] }}
            >
              {romaValue?.toFixed(1)}
              {suffix}
            </TableCell>
            <TableCell
              className='w-[10%] pr-2 text-right font-semibold text-p-sm tabular-nums sm:w-[10%] sm:pr-4 md:text-p-sm lg:text-p-sm'
              style={{ color: COLORS[1] }}
            >
              {nonRomaValue?.toFixed(1)}
              {suffix}
            </TableCell>
            <TableCell className='w-[30%] py-2 pr-2 text-p-sm sm:w-[20%] sm:pr-4 md:text-p-sm lg:text-p-sm'>
              {romaValue !== undefined && nonRomaValue !== undefined ? (
                <DumbbellChart
                  data={[{ label: title, x: [nonRomaValue, romaValue] }]}
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
            <TableCell className='w-[20%] py-2 pr-2 text-right text-content-secondary text-p-sm sm:w-[11%] sm:pr-3 md:text-p-sm lg:text-p-sm'>
              {meta?.source ?? '–'}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
