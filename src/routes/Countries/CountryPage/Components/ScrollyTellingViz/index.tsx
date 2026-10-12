import { Spacer } from '@undp/design-system-react/Spacer';
import { H5, P } from '@undp/design-system-react/Typography';
import { animate, motion, useMotionValue } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CardEl } from '@/components/CardEl';
import type { ScrollySectionDataType, SlideContent } from '@/types';
import { IconCluster } from './iconCluster';
import { MethodologyEl } from './methodologyEl';
import { NeighborhoodViz, NeighborhoodVizDef } from './neighborhoodViz';

function generateSlides(data: ScrollySectionDataType[]) {
  const badgeRegex = /<Badge>(.*?)<\/Badge>/g;
  const badgeClasses: Record<string, string> = {
    education: 'bg-education-light text-education',
    employment: 'bg-employment-light text-employment',
    housing: 'bg-housing-light text-housing',
    health: 'bg-health-light text-health',
    discrimination: 'bg-discrimination-light text-discrimination',
  };
  const slides: SlideContent[] = data.map((item) => ({
    vizContent: item.vizContent,
    slideContent: (
      <CardEl variant={item.text.theme}>
        <P weight='bold' size='xl'>
          {item.text.title}
        </P>
        {item.text.content.split('\n\n').map((paragraph, i) => {
          const containsBadge = badgeRegex.test(paragraph);
          if (!containsBadge)
            return (
              <P
                // biome-ignore lint/suspicious/noArrayIndexKey: index is unique in this context
                key={i}
                marginBottom={i === item.text.content.split('\n\n').length - 1 ? 'none' : 'base'}
                leading='xl'
              >
                {paragraph}
              </P>
            );
          return (
            <P
              // biome-ignore lint/suspicious/noArrayIndexKey: index is unique in this context
              key={i}
              marginBottom={
                i === item.text.content.split('\n\n').length - 1 && !item.text.methodology
                  ? 'none'
                  : 'base'
              }
              leading='xl'
            >
              {paragraph.split(badgeRegex).map((text, j) =>
                j % 2 === 1 ? (
                  <span
                    key={text}
                    className={`rounded-full px-2.5 py-0.5 font-semibold ${
                      badgeClasses[text.toLowerCase()] ?? 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {text}
                  </span>
                ) : (
                  text
                ),
              )}
            </P>
          );
        })}
        {item.text.methodology && <MethodologyEl text={item.text.methodology} />}
      </CardEl>
    ),
  }));
  return slides;
}

export default function ScrollyTellingViz({ data }: { data: ScrollySectionDataType[] }) {
  const [graphWidth, setGraphWidth] = useState(0);
  const [graphHeight, setGraphHeight] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const romaCount = useMotionValue(0);
  const nonRomaCount = useMotionValue(0);

  const graphDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0].target.clientWidth || 620;
      const height = entries[0].target.clientHeight || 520;
      setGraphWidth(width);
      setGraphHeight(height);
    });
    if (graphDiv.current) {
      resizeObserver.observe(graphDiv.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  const slides = useMemo(() => generateSlides(data), [data]);

  const activeSlide = slides[activeSlideIndex] ?? slides[0];

  useEffect(() => {
    animate(romaCount, activeSlide.vizContent.romaHighlighted, { duration: 0.5, ease: 'easeOut' });
    animate(nonRomaCount, activeSlide.vizContent.nonRomaHighlighted, {
      duration: 0.5,
      ease: 'easeOut',
    });
  }, [activeSlide, romaCount, nonRomaCount]);
  return (
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
          <div className='flex h-[calc(100vh-6rem)] w-full items-center' ref={graphDiv}>
            <motion.svg
              width={`${graphWidth}px`}
              height={`${graphHeight}px`}
              viewBox={`0 0 620 590`}
              className='mx-auto'
            >
              <NeighborhoodVizDef />
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
                <g id='roma-section'>
                  <IconCluster
                    activeSlideIndex={activeSlideIndex}
                    populationGroup='roma'
                    animatedNumber={romaCount}
                    value={activeSlide.vizContent.romaHighlighted}
                  />
                </g>
                <g id='non-roma-section' transform='translate(0,300)'>
                  <IconCluster
                    activeSlideIndex={activeSlideIndex}
                    populationGroup='non-roma'
                    animatedNumber={nonRomaCount}
                    value={activeSlide.vizContent.nonRomaHighlighted}
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
  );
}
