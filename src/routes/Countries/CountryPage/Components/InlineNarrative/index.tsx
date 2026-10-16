import { Spacer } from '@undp/design-system-react/Spacer';
import { H5, P } from '@undp/design-system-react/Typography';
import { NarrativeCard } from '@/components/NarrativeCard';
import type { ScrollySectionDataType } from '@/types';
import { NeighborhoodViz, NeighborhoodVizDef } from '../ScrollyTellingViz/neighborhoodViz';
import { InlineCluster, InlineClusterDef } from './inlineCluster';

function ClusterFigure({
  title,
  subTitle,
  roma,
  nonRoma,
  showCount = true,
}: {
  title?: string;
  subTitle?: string;
  roma: number;
  nonRoma: number;
  showCount?: boolean;
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
        <g id='roma-section'>
          <InlineCluster populationGroup='roma' value={roma} showCount={showCount} />
        </g>
        <g id='non-roma-section' transform='translate(0,340)'>
          <InlineCluster populationGroup='non-roma' value={nonRoma} showCount={showCount} />
        </g>
      </svg>
    </div>
  );
}

export default function InlineNarrative({ data }: { data: ScrollySectionDataType[] }) {
  const [intro, overview, education, employment, housing, health, discrimination] = data;
  return (
    <div className='mx-auto flex w-full max-w-125 flex-col gap-16 bg-surface px-4 py-8'>
      <svg width='0' height='0' className='absolute' aria-hidden='true'>
        <InlineClusterDef />
      </svg>

      <section className='flex flex-col gap-6'>
        <svg viewBox='0 0 620 500' className='w-full' aria-hidden='true'>
          <NeighborhoodVizDef />
          <NeighborhoodViz />
        </svg>
        <NarrativeCard text={intro.text} />
      </section>

      <section className='flex flex-col gap-6'>
        <ClusterFigure roma={100} nonRoma={100} showCount={false} />
        <NarrativeCard text={overview.text} />
      </section>

      <section className='flex flex-col gap-6'>
        <ClusterFigure
          title='Have not completed secondary education'
          subTitle='Adults aged 18 to 65. Only 11 in 100 Roma have completed secondary education, against 60 in 100 non-Roma.'
          roma={89}
          nonRoma={40}
        />
        <NarrativeCard text={education.text} />
      </section>

      <section className='flex flex-col gap-6'>
        <ClusterFigure
          title='Have informal jobs'
          subTitle='Employed people aged 15 to 64.'
          roma={73}
          nonRoma={33}
        />
        <NarrativeCard text={employment.text} />
      </section>

      <section className='flex flex-col gap-6'>
        <ClusterFigure
          title='Live in overcrowded homes'
          subTitle='Too few rooms for the household'
          roma={62}
          nonRoma={40}
        />
        <NarrativeCard text={housing.text} />
      </section>

      <section className='flex flex-col gap-6'>
        <ClusterFigure
          title='Have no medical insurance'
          subTitle='All ages'
          roma={42}
          nonRoma={19}
        />
        <NarrativeCard text={health.text} />
      </section>

      <section className='flex flex-col gap-6'>
        <ClusterFigure
          title='Experienced discrimination in the past year'
          subTitle='Because of ethnicity, skin colour or language.'
          roma={62}
          nonRoma={5}
        />
        <NarrativeCard text={discrimination.text} />
      </section>
    </div>
  );
}
