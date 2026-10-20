import { UnitChart } from '@undp/data-viz/UnitChart';
import { H4, P } from '@undp/design-system-react/Typography';

export function MicroVizBlock({ text, value }: { text: string; value: number }) {
  return (
    <div className='hidden w-full pr-6 md:block md:w-1/4 md:max-w-60'>
      <H4 weight='bold' marginBottom='none' style={{ color: 'var(--roma)' }}>
        {value} out of 100
      </H4>
      <P size='base' marginBottom='xs'>
        {text}
      </P>
      <UnitChart
        gridIcon={{
          width: 24,
          height: 37,
          d: [
            'M14.3594 13.8594C19.0938 13.8595 22.9315 17.6973 22.9316 22.4317V30.1475C22.9316 32.9882 20.6288 35.291 17.7881 35.291H6.64355C3.80293 35.291 1.50009 32.9881 1.5 30.1475V22.4317C1.50012 17.6972 5.33875 13.8594 10.0732 13.8594H14.3594ZM12.2158 1.85745C15.2933 1.85745 17.7881 4.35225 17.7881 7.42972C17.7881 10.5072 15.2933 13.002 12.2158 13.002C9.13842 13.0019 6.64356 10.5071 6.64355 7.42972C6.64355 4.35229 9.13841 1.85753 12.2158 1.85745Z',
          ],
        }}
        size={270}
        height={37}
        gridSize={10}
        totalNoOfDots={10}
        colors={[`var(--roma)`, 'var(--gray-300']}
        showColorScale={false}
        data={[
          {
            label: 'yes',
            value: value,
          },
          {
            label: 'no',
            value: 10 - value,
          },
        ]}
      />
    </div>
  );
}
