import { Spacer } from '@undp/design-system-react/Spacer';
import { P } from '@undp/design-system-react/Typography';
import { type MotionValue, motion, useTransform } from 'motion/react';
import { positionData } from './PositionData';

export function IconCluster({
  activeSlideIndex,
  populationGroup,
  animatedNumber,
  value,
}: {
  activeSlideIndex: number;
  value: number;
  animatedNumber: MotionValue<number>;
  populationGroup: 'roma' | 'non-roma';
}) {
  const animatedLabel = useTransform(animatedNumber, (value) => `${Math.round(value)} out of 100`);
  const populationGroupTitleCase = populationGroup === 'roma' ? 'Roma' : 'Non-Roma';
  return (
    <>
      <foreignObject width='100%' height='75px' x={0} y={0}>
        <P
          size='xl'
          weight='bold'
          marginBottom='none'
          style={{ color: `var(--${populationGroup})` }}
        >
          {activeSlideIndex > 1 ? (
            <motion.span>{animatedLabel}</motion.span>
          ) : (
            populationGroupTitleCase
          )}
        </P>
        <Spacer size='sm' />
        <P size='base' className='text-content-tertiary' marginBottom='none'>
          {activeSlideIndex > 1 ? populationGroupTitleCase : '100 people'}
        </P>
      </foreignObject>
      <g id={`${populationGroup}-dot-plot`} transform='translate(0, 50)'>
        {positionData.map((pos, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: index is unique
          <g key={`${populationGroup}-${i}`} transform={`translate(${pos[0]}, ${pos[1]})`}>
            <motion.path
              // biome-ignore lint/suspicious/noArrayIndexKey: index is unique
              key={`${populationGroup}-${i}`}
              d='M14.3594 13.8594C19.0938 13.8595 22.9315 17.6973 22.9316 22.4317V30.1475C22.9316 32.9882 20.6288 35.291 17.7881 35.291H6.64355C3.80293 35.291 1.50009 32.9881 1.5 30.1475V22.4317C1.50012 17.6972 5.33875 13.8594 10.0732 13.8594H14.3594ZM12.2158 1.85745C15.2933 1.85745 17.7881 4.35225 17.7881 7.42972C17.7881 10.5072 15.2933 13.002 12.2158 13.002C9.13842 13.0019 6.64356 10.5071 6.64355 7.42972C6.64355 4.35229 9.13841 1.85753 12.2158 1.85745Z'
              initial={{
                fill: `var(--${populationGroup})`,
              }}
              animate={{
                fill: i < value ? `var(--${populationGroup})` : 'var(--gray-400)',
              }}
              transition={{ duration: 0.5 }}
            />
            <path
              d='M22.9316 22.4317C22.9315 17.6973 19.0938 13.8595 14.3594 13.8594H10.0732C5.33875 13.8594 1.50012 17.6972 1.5 22.4317V30.1475C1.50009 32.9881 3.80293 35.291 6.64355 35.291H17.7881C20.6288 35.291 22.9316 32.9882 22.9316 30.1475V22.4317ZM17.7881 7.42972C17.7881 4.35225 15.2933 1.85745 12.2158 1.85745C9.13841 1.85753 6.64355 4.35229 6.64355 7.42972C6.64356 10.5071 9.13842 13.0019 12.2158 13.002C15.2933 13.002 17.7881 10.5072 17.7881 7.42972ZM19.2881 7.42972C19.2881 9.52084 18.3793 11.3986 16.9365 12.6934C21.09 13.7897 24.1936 17.4711 24.4189 21.9131L24.4316 22.4317V30.1475C24.4315 33.8165 21.4572 36.791 17.7881 36.791H6.64355C2.97453 36.7909 0.000112534 33.8165 0 30.1475V22.4317C0.000118523 17.7602 3.18079 13.8326 7.49414 12.6934C6.05171 11.3986 5.14356 9.52057 5.14355 7.42972C5.14355 3.52383 8.31005 0.357548 12.2158 0.357452L12.5801 0.366241C16.3167 0.555809 19.2881 3.64598 19.2881 7.42972Z'
              fill='#F8F7F3'
            />
          </g>
        ))}
      </g>
    </>
  );
}
