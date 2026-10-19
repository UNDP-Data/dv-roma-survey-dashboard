import { Spacer } from '@undp/design-system-react/Spacer';
import { H5, P } from '@undp/design-system-react/Typography';
import { NarrativeCard } from '@/components/NarrativeCard';
import type { ScrollySectionDataType } from '@/types';
import { IconCluster } from './iconCluster';
import { NeighborhoodViz } from './neighborhoodViz';

export default function MobileViz({ data }: { data: ScrollySectionDataType[] }) {
  return (
    <div className='mx-auto flex w-full flex-col gap-16 bg-surface px-4 py-8'>
      {data.map((el, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: index acts as a unique key
        <section className='flex flex-col gap-6' key={i}>
          {i === 0 ? (
            <svg viewBox='0 0 620 500' className='w-full' aria-hidden='true'>
              <NeighborhoodViz />
            </svg>
          ) : (
            <div className='w-full'>
              {(el.vizContent.title || el.vizContent.subTitle) && (
                <>
                  <H5 weight='bold' marginBottom='2xs'>
                    {el.vizContent.title}
                  </H5>
                  <P size='sm' className='text-content-tertiary' marginBottom='none'>
                    {el.vizContent.subTitle}
                  </P>
                  <Spacer size='base' />
                </>
              )}
              <svg
                viewBox='0 0 365 645'
                className='w-full'
                role='img'
                aria-label={
                  el.vizContent.title || el.vizContent.subTitle
                    ? `${el.vizContent.title}. ${el.vizContent.subTitle}`
                    : 'Roma and non-Roma populations, 100 people in each group.'
                }
              >
                <g id={`roma-section-${i}`}>
                  <IconCluster
                    populationGroup='roma'
                    value={el.vizContent.romaHighlighted}
                    isMobile
                    activeSlideIndex={i}
                  />
                </g>
                <g id={`non-roma-section-${i}`} transform='translate(0,340)'>
                  <IconCluster
                    populationGroup='non-roma'
                    value={el.vizContent.nonRomaHighlighted}
                    isMobile
                    activeSlideIndex={i}
                  />
                </g>
              </svg>
            </div>
          )}
          <NarrativeCard text={el.text} />
        </section>
      ))}
    </div>
  );
}
