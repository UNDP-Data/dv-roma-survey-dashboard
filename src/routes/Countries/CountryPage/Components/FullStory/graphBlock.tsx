import { GroupedBarGraph, SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { UnitChart } from '@undp/data-viz/UnitChart';
import { cn } from '@undp/design-system-react/cn';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H4, P } from '@undp/design-system-react/Typography';

export function GraphBlock({
  className,
  title,
  subTitle,
  graphType,
  data,
  source,
  value = 0,
  populationGroup = 'non-roma',
  settings,
}: {
  className?: string;
  title?: string;
  subTitle?: string;
  graphType?: string;
  // biome-ignore lint/suspicious/noExplicitAny: Data is custom
  data?: any;
  source?: string;
  value?: number;
  populationGroup?: string;
  // biome-ignore lint/suspicious/noExplicitAny: Setting is custom
  settings?: any;
}) {
  return (
    <div className={cn('flex w-full flex-col', className)}>
      {title && (
        <>
          <P size='xl' weight='bold' marginBottom='none'>
            {title}
          </P>
          <Spacer size='sm' />
        </>
      )}
      {subTitle && (
        <P size='base' className='text-content-secondary' marginBottom='none'>
          {subTitle}
        </P>
      )}
      {(title || subTitle) && <Spacer size='xl' />}
      {graphType === 'barChart' && (
        <SimpleBarGraph
          data={data}
          trackColor='var(--gray-200)'
          cornerRadius={4}
          showValues
          maxValue={100}
          orientation='horizontal'
          leftMargin={96}
          numberDisplayOptions={{ suffix: '%' }}
          source={source}
          showTicks={false}
          topMargin={0}
          bottomMargin={0}
          valueColor='var(--content-primary)'
          classNames={{
            yAxis: { labels: 'text-left text-sm', axis: 'hidden' },
            graphObjectValues: 'font-bold',
          }}
          {...(settings ?? {})}
        />
      )}
      {graphType === 'groupedBarChart' && (
        <GroupedBarGraph
          data={data}
          trackColor='var(--gray-200)'
          cornerRadius={4}
          showValues
          maxValue={100}
          orientation='horizontal'
          colorDomain={['Roma', 'Non-Roma']}
          colors={['var(--roma', 'var(--non-roma']}
          leftMargin={96}
          numberDisplayOptions={{ suffix: '%' }}
          source={source}
          minHeight={0}
          showTicks={false}
          topMargin={0}
          bottomMargin={0}
          valueColor='var(--content-primary)'
          classNames={{
            yAxis: { labels: 'text-left text-sm', axis: 'hidden' },
            graphObjectValues: 'font-bold',
          }}
          {...(settings ?? {})}
        />
      )}
      {graphType === 'unitChart' && (
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
            colors={[`var(--${populationGroup})`, 'var(--gray-300']}
            showColorScale={false}
            source={source}
            data={[
              {
                label: 'yes',
                value: value,
              },
              {
                label: 'no',
                value: 100 - value,
              },
            ]}
            {...(settings ?? {})}
          />
          <div className='flex grow flex-col gap-2'>
            <H4
              weight='bold'
              marginBottom='none'
              style={{
                color: `var(--${populationGroup})`,
              }}
            >
              {value} out of 100
            </H4>
            <P size='lg' className='text-content-secondary' marginBottom='none'>
              {populationGroup === 'roma' ? 'Roma' : 'Non-Roma'}
            </P>
          </div>
        </div>
      )}
    </div>
  );
}
