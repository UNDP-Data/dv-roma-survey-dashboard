import { P } from '@undp/design-system-react/Typography';
import { type MotionValue, motion, useMotionValue, useTransform } from 'motion/react';

const POSITION_DATA = [
  61, 14, 347, 79, 128, 8, 33, 30, 450, 6, 273, 42, 251, 64, 267, 71, 291, 83, 484, 6, 445, 58, 434,
  22, 77, 29, 0, 126, 53, 43, 250, 21, 342, 6, 316, 0, 228, 8, 442, 82, 396, 52, 214, 99, 378, 20,
  270, 4, 187, 82, 398, 95, 161, 2, 97, 100, 72, 122, 21, 77, 61, 84, 84, 67, 164, 86, 164, 131,
  238, 100, 234, 42, 291, 17, 321, 71, 363, 33, 411, 19, 403, 117, 421, 56, 428, 126, 467, 22, 494,
  46, 519, 54, 543, 85, 207, 18, 185, 0, 185, 40, 161, 46, 137, 38, 107, 21, 139, 71, 112, 58, 121,
  98, 143, 115, 228, 140, 248, 148, 312, 108, 451, 102, 510, 96, 374, 71, 534, 130, 403, 143, 286,
  130, 194, 126, 154, 152, 454, 142, 108, 140, 41, 108, 128, 143, 213, 40, 223, 62, 468, 66, 486,
  84, 497, 118, 502, 142, 423, 90, 335, 98, 328, 124, 322, 28, 303, 38, 340, 44, 206, 157, 20, 136,
  306, 147, 277, 94, 263, 111, 557, 106, 382, 151, 272, 151, 326, 161, 477, 123, 79, 142, 59, 150,
  95, 161, 360, 104, 376, 115, 358, 138,
];

const MOBILE_POSITION_DATA = [
  330, 105, 314, 120, 320, 150, 70, 6, 152, 0, 94, 0, 44, 5, 110, 15, 11, 34, 54, 21, 79, 29, 67,
  52, 77, 72, 29, 50, 43, 69, 98, 40, 118, 44, 154, 46, 173, 9, 136, 26, 198, 23, 241, 0, 263, 11,
  18, 80, 291, 11, 29, 95, 220, 9, 308, 16, 180, 35, 233, 33, 299, 34, 325, 43, 211, 45, 272, 38,
  251, 52, 56, 87, 11, 125, 166, 131, 290, 126, 213, 80, 313, 69, 297, 88, 280, 63, 192, 68, 173,
  164, 232, 63, 145, 131, 105, 75, 69, 174, 48, 155, 24, 174, 26, 135, 50, 117, 121, 142, 131, 173,
  153, 165, 210, 159, 189, 137, 214, 121, 196, 100, 175, 97, 252, 76, 234, 100, 233, 132, 249, 147,
  233, 175, 300, 159, 272, 143, 275, 94, 167, 60, 137, 67, 153, 90, 130, 98, 108, 105, 81, 92, 91,
  127, 71, 134, 93, 157, 109, 177, 190, 175, 262, 179, 285, 177, 337, 177, 258, 110, 197, 205, 316,
  185, 278, 199, 257, 209, 225, 198, 166, 187, 144, 203, 94, 195, 52, 183, 37, 195, 121, 206, 68,
  206, 3, 195, 162, 214, 298, 207, 0, 148,
];

export function IconCluster({
  activeSlideIndex,
  populationGroup,
  animatedNumber,
  value,
  isMobile,
}: {
  activeSlideIndex: number;
  value: number;
  animatedNumber?: MotionValue<number>;
  populationGroup: 'roma' | 'non-roma';
  isMobile: boolean;
}) {
  const fallbackNumber = useMotionValue(0);
  const animatedLabel = useTransform(
    animatedNumber ?? fallbackNumber,
    (value) => `${Math.round(value)} out of 100`,
  );
  const populationGroupTitleCase = populationGroup === 'roma' ? 'Roma' : 'Non-Roma';
  const positions = isMobile ? MOBILE_POSITION_DATA : POSITION_DATA;
  return (
    <>
      <foreignObject width='100%' height='75px' x={0} y={0}>
        <P
          size='xl'
          weight='bold'
          marginBottom='none'
          style={{ color: `var(--${populationGroup})` }}
          leading='xs'
        >
          {activeSlideIndex > 1 ? (
            !isMobile && animatedNumber ? (
              <motion.span>{animatedLabel}</motion.span>
            ) : (
              `${value} out of 100`
            )
          ) : (
            populationGroupTitleCase
          )}
        </P>
        <P size='base' className='text-content-tertiary' marginBottom='none'>
          {activeSlideIndex > 1 ? populationGroupTitleCase : '100 people'}
        </P>
      </foreignObject>
      <g transform='translate(0, 50)'>
        {isMobile
          ? [...Array(100).keys()].map((i) => (
              <motion.use
                key={`${populationGroup}-${i}`}
                href='#person-icon'
                x={positions[2 * i]}
                y={positions[2 * i + 1]}
                initial={{
                  fill: `var(--${populationGroup})`,
                }}
                animate={{
                  fill: i < value ? `var(--${populationGroup})` : 'var(--gray-400)',
                }}
                transition={{ duration: 0.5 }}
              />
            ))
          : [...Array(100).keys()].map((i) => (
              <use
                key={`${populationGroup}-${i}`}
                href='#person-icon'
                x={positions[2 * i]}
                y={positions[2 * i + 1]}
                style={{ fill: i < value ? `var(--${populationGroup})` : 'var(--gray-400)' }}
              />
            ))}
      </g>
    </>
  );
}
