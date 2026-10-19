import { Spacer } from '@undp/design-system-react/Spacer';
import { H5, P } from '@undp/design-system-react/Typography';
import { animate, motion, useMotionValue } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { NarrativeCard } from '@/components/NarrativeCard';
import type { ScrollySectionDataType, SlideContent } from '@/types';
import { DESKTOP_POSITIONS, IconCluster, IconClusterDef, MOBILE_POSITIONS } from './iconCluster';
import { NeighborhoodViz, NeighborhoodVizDef } from './neighborhoodViz';

function ClusterFigure({
  title,
  subTitle,
  roma,
  nonRoma,
  activeSlideIndex,
}: {
  title?: string;
  subTitle?: string;
  roma: number;
  nonRoma: number;
  activeSlideIndex: number;
}) {
  return (
    <div className='w-full'>
      {title && (
        <>
          <H5 weight='bold' marginBottom='2xs'>
            {title}
          </H5>
          <P size='sm' className='text-content-tertiary' marginBottom='none'>
            {subTitle}
          </P>
          <Spacer size='base' />
        </>
      )}
      <svg
        viewBox='0 0 365 645'
        className='w-full'
        role='img'
        aria-label={
          title
            ? `${title}. ${subTitle}`
            : 'Roma and non-Roma populations, 100 people in each group.'
        }
      >
        <g>
          <IconCluster
            populationGroup='roma'
            value={roma}
            positions={MOBILE_POSITIONS}
            activeSlideIndex={activeSlideIndex}
          />
        </g>
        <g transform='translate(0,340)'>
          <IconCluster
            populationGroup='non-roma'
            value={nonRoma}
            positions={MOBILE_POSITIONS}
            activeSlideIndex={activeSlideIndex}
          />
        </g>
      </svg>
    </div>
  );
}

export default function CountryNarrative({ data }: { data: ScrollySectionDataType[] }) {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth > 640);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const romaCount = useMotionValue(0);
  const nonRomaCount = useMotionValue(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const resizeObserver = new ResizeObserver(([entry]) => {
      setIsDesktop(entry.contentRect.width > 640);
    });
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  const slides = useMemo<SlideContent[]>(
    () =>
      data.map((item) => ({
        vizContent: item.vizContent,
        slideContent: <NarrativeCard text={item.text} />,
      })),
    [data],
  );

  const activeSlide = slides[activeSlideIndex] ?? slides[0];

  useEffect(() => {
    animate(romaCount, activeSlide.vizContent.romaHighlighted, { duration: 0.5, ease: 'easeOut' });
    animate(nonRomaCount, activeSlide.vizContent.nonRomaHighlighted, {
      duration: 0.5,
      ease: 'easeOut',
    });
  }, [activeSlide, romaCount, nonRomaCount]);

  return (
    <div ref={containerRef} className='w-full'>
      {isDesktop ? (
        <div className='relative mx-auto flex w-full flex-col justify-between gap-x-10 gap-y-0 bg-surface px-4 lg:flex-row'>
          <div className='mx-auto flex w-full max-w-7xl flex-col justify-between gap-x-10 gap-y-0 px-4 lg:flex-row'>
            <div className='sticky top-0 mx-auto flex h-screen w-full flex-col items-center justify-center px-4 py-4 md:px-6 md:py-12'>
              <div className='h-24 w-full'>
                <H5 weight='bold' marginBottom='2xs'>
                  {activeSlide.vizContent.title}
                </H5>
                <P size='sm' className='text-content-tertiary' marginBottom='none'>
                  {activeSlide.vizContent.subTitle}
                </P>
              </div>
              <Spacer size='base' />
              <div className='flex h-[calc(100vh-6rem)] w-full items-center'>
                <motion.svg viewBox='0 0 620 590' className='mx-auto h-full w-full'>
                  <NeighborhoodVizDef />
                  <IconClusterDef />
                  <motion.g
                    initial={{
                      opacity: 1,
                    }}
                    animate={{
                      opacity: activeSlideIndex === 0 ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <NeighborhoodViz />
                  </motion.g>
                  <motion.g
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: activeSlideIndex === 0 ? 0 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <g>
                      <IconCluster
                        populationGroup='roma'
                        value={activeSlide.vizContent.romaHighlighted}
                        positions={DESKTOP_POSITIONS}
                        activeSlideIndex={activeSlideIndex}
                        animatedNumber={romaCount}
                      />
                    </g>
                    <g transform='translate(0,300)'>
                      <IconCluster
                        populationGroup='non-roma'
                        value={activeSlide.vizContent.nonRomaHighlighted}
                        positions={DESKTOP_POSITIONS}
                        activeSlideIndex={activeSlideIndex}
                        animatedNumber={nonRomaCount}
                      />
                    </g>
                  </motion.g>
                </motion.svg>
              </div>
            </div>
            <div className='mx-auto w-full max-w-100 shrink-0'>
              {slides.map((slide, index) => (
                <div
                  className='flex min-h-screen items-center px-4 md:px-0'
                  // biome-ignore lint/suspicious/noArrayIndexKey:index can be used because key is static
                  key={index}
                >
                  <motion.div
                    className='my-6 w-full bg-background'
                    onViewportEnter={() => setActiveSlideIndex(index)}
                    viewport={{ amount: 0.5 }}
                  >
                    {slide.slideContent}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='mx-auto flex w-full max-w-125 flex-col gap-16 bg-surface px-4 py-8'>
          <svg width='0' height='0' className='absolute' aria-hidden='true'>
            <IconClusterDef />
          </svg>

          {data.map((section, index) => (
            <section
              className='flex flex-col gap-6'
              // biome-ignore lint/suspicious/noArrayIndexKey: section order is static
              key={index}
            >
              {index === 0 ? (
                <svg viewBox='0 0 620 500' className='w-full' aria-hidden='true'>
                  <NeighborhoodVizDef />
                  <NeighborhoodViz />
                </svg>
              ) : (
                <ClusterFigure
                  title={section.vizContent.title}
                  subTitle={section.vizContent.subTitle}
                  roma={section.vizContent.romaHighlighted}
                  nonRoma={section.vizContent.nonRomaHighlighted}
                  activeSlideIndex={index}
                />
              )}
              <NarrativeCard text={section.text} />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
