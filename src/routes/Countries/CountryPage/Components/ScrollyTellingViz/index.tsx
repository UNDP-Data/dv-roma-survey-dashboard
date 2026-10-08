import { Spacer } from '@undp/design-system-react/Spacer';
import { H5, P } from '@undp/design-system-react/Typography';
import { animate, motion, useMotionValue } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { CardEl } from '@/components/CardEl';
import type { SlideContent } from '@/types';
import { IconCluster } from './iconCluster';
import { NeighborhoodViz, NeighborhoodVizDef } from './neighborhoodViz';

const SLIDES: SlideContent[] = [
  {
    vizContent: {
      title: '',
      subTitle: '',
      romaHighlighted: 0,
      nonRomaHighlighted: 0,
    },
    slideContent: (
      <CardEl>
        <P weight='bold' size='xl'>
          Same localities, different realities
        </P>
        <P size='base'>
          Roma and non-Roma people live side by side in the same localities. Yet their experiences
          can be very different. To better understand these disparities and bring to light the
          vulnerabilities experienced by Roma, households from both groups were surveyed across the
          same localities.
        </P>
        <P size='base' marginBottom='none'>
          The results show significant disparities between Roma and non-Roma populations across a
          wide range of issues, including housing, education, employment, health, and experience of
          discrimination and violence. These differences often reflect systemic inequalities and
          disadvantages faced by Roma communities.
        </P>
      </CardEl>
    ),
  },
  {
    vizContent: {
      romaHighlighted: 100,
      nonRomaHighlighted: 100,
      title: '',
      subTitle: '',
    },
    slideContent: (
      <CardEl>
        <P weight='bold' size='xl'>
          Disparities that carry through life
        </P>
        <P size='base' leading='xl'>
          These disparities begin in{' '}
          <span className='rounded-full bg-education-light px-2 py-1 font-bold text-education'>
            education
          </span>
          , continue into{' '}
          <span className='rounded-full bg-employment-light px-2 py-1 font-bold text-employment'>
            employment
          </span>
          , and shape adult life through
          <span className='rounded-full bg-housing-light px-2 py-1 font-bold text-housing'>
            housing
          </span>
          and{' '}
          <span className='rounded-full bg-health-light px-2 py-1 font-bold text-health'>
            health
          </span>
          , while{' '}
          <span className='rounded-full bg-discrimination-light px-2 py-1 font-bold text-discrimination'>
            discrimination
          </span>{' '}
          cuts across all these areas.
        </P>
        <P size='base' marginBottom='none'>
          To make these differences easier to see and compare across areas, each result is shown out
          of 100 people.
        </P>
      </CardEl>
    ),
  },
  {
    vizContent: {
      romaHighlighted: 89,
      nonRomaHighlighted: 40,
      title: 'Have not completed secondary education',
      subTitle:
        'Adults aged 18 to 65. Only 11 in 100 Roma have completed secondary education, against 60 in 100 non-Roma.',
    },
    slideContent: (
      <CardEl variant='Education'>
        <P weight='bold' size='xl'>
          Gaps in education span the learning cycle and adulthood
        </P>
        <P size='base' marginBottom='none'>
          Roma children are less likely to be enrolled at every stage, from preschool to university,
          and the gap carries into adult life.
        </P>
      </CardEl>
    ),
  },
  {
    vizContent: {
      romaHighlighted: 73,
      nonRomaHighlighted: 33,
      title: 'Have informal jobs',
      subTitle: 'Employed people aged 15 to 64.',
    },
    slideContent: (
      <CardEl variant='Employment'>
        <P weight='bold' size='xl'>
          Finding work does not ensure a secure livelihood
        </P>
        <P size='base' marginBottom='none'>
          Roma women have fewer openings into work, and men more often work without contracts or
          protection.
        </P>
      </CardEl>
    ),
  },
  {
    vizContent: {
      romaHighlighted: 62,
      nonRomaHighlighted: 40,
      title: 'Live in overcrowded homes',
      subTitle: 'Too few rooms for the household',
    },
    slideContent: (
      <CardEl variant='Housing'>
        <P weight='bold' size='xl'>
          Having a roof does not ensure adequate space, sanitation or warmthFinding work does not
          ensure a secure livelihood
        </P>
        <P size='base' marginBottom='none'>
          Roma homes are more often overcrowded, damp or without indoor sanitation. Insecure renting
          forces families to move.
        </P>
      </CardEl>
    ),
  },
  {
    vizContent: {
      romaHighlighted: 42,
      nonRomaHighlighted: 19,
      title: 'Have no medical insurance',
      subTitle: 'All ages',
    },
    slideContent: (
      <CardEl variant='Health'>
        <P weight='bold' size='xl'>
          Poor health constrains opportunities for many Roma during their working years
        </P>
        <P size='base' marginBottom='none'>
          Roma adults report poor health more often, and many lack insurance. Caring for relatives
          often means giving up paid work.
        </P>
      </CardEl>
    ),
  },
  {
    vizContent: {
      romaHighlighted: 62,
      nonRomaHighlighted: 5,
      title: 'Experienced discrimination in the past year',
      subTitle: 'Because of ethnicity, skin colour or language.',
    },
    slideContent: (
      <CardEl variant='Discrimination'>
        <P weight='bold' size='xl'>
          Unequal treatment and administrative barriers restrict access to opportunities and support
        </P>
        <P size='base' marginBottom='none'>
          A third of Roma faced discrimination in the past year. Services are nearby, but paperwork
          and repeated visits keep them out of reach.
        </P>
      </CardEl>
    ),
  },
];

export default function ScrollyTellingViz() {
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
  const activeSlide = SLIDES[activeSlideIndex] ?? SLIDES[0];

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
            <H5 weight='bold' marginBottom='xs'>
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
          {SLIDES.map((slide, index) => (
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
