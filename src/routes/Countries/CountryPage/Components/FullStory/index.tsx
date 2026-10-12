/** biome-ignore-all lint/suspicious/noArrayIndexKey: index doesn't changes */
/** biome-ignore-all lint/suspicious/noExplicitAny: Data is custom*/

import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { cn } from '@undp/design-system-react/cn';
import { DrawerBody, DrawerFooter, DrawerHeader } from '@undp/design-system-react/Drawer';
import { Separator } from '@undp/design-system-react/Separator';
import { Spacer } from '@undp/design-system-react/Spacer';
import { Spinner } from '@undp/design-system-react/Spinner';
import { H2, H4, H6, P } from '@undp/design-system-react/Typography';
import { BadgeEl } from '@/components/BadgeEl';
import type { RecommendationDataType, Themes } from '@/types';
import { GraphBlock, MultiGraphBlock } from './graphBlock';
import { MicroVizBlock } from './microVizBlock';
import { QuoteBlock } from './QuoteBlock';
import { TextBlock } from './textBlock';
import { TitleBlock } from './titleBlock';

function Footer({ section, setOpenDrawer }: { section: string; setOpenDrawer?: () => void }) {
  return (
    <button
      type='button'
      className='flex w-full cursor-pointer justify-between bg-secondary text-content-reverse'
      onClick={setOpenDrawer}
    >
      <div className='py-16 pl-32'>
        <P size='xs' weight='bold' className='uppercase opacity-70' marginBottom='xs'>
          Next
        </P>
        <H2 weight='bold' marginBottom='none'>
          {section}
        </H2>
      </div>
      <img
        src={`/imgs/drawerFooter/${section}.png`}
        alt='Theme banner'
        className='hidden h-55 md:block'
      />
    </button>
  );
}

function useFullStoryData(isoCode: string, theme: Themes) {
  return useQuery({
    queryKey: ['fullStory', isoCode, theme],
    queryFn: () => fetchAndParseJSON(`/countryContent/${isoCode}/fullStories/${theme}.json`),
  });
}
export function FullStory({
  isoCode,
  theme,
  recommendation,
  setOpenDrawer,
}: {
  isoCode: string;
  theme: Themes;
  recommendation: RecommendationDataType;
  setOpenDrawer: (open: string) => void;
}) {
  const { data, isLoading, isError } = useFullStoryData(isoCode, theme);
  const bgColorClass =
    theme === 'Education'
      ? 'bg-education-light'
      : theme === 'Health'
        ? 'bg-health-light'
        : theme === 'Employment'
          ? 'bg-employment-light'
          : theme === 'Housing'
            ? 'bg-housing-light'
            : theme === 'Discrimination'
              ? 'bg-discrimination-light'
              : 'bg-surface';
  const textColorClass =
    theme === 'Education'
      ? 'text-education'
      : theme === 'Health'
        ? 'text-health'
        : theme === 'Employment'
          ? 'text-employment'
          : theme === 'Housing'
            ? 'text-housing'
            : theme === 'Discrimination'
              ? 'text-discrimination'
              : 'text-content-primary';
  const next =
    theme === 'Education'
      ? 'Employment'
      : theme === 'Employment'
        ? 'Health'
        : theme === 'Health'
          ? 'Housing'
          : theme === 'Housing'
            ? 'Discrimination'
            : theme === 'Discrimination'
              ? 'Data explorer'
              : 'Education';
  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <P>Error loading recommendations</P>;
  if (!data) return <P>No data found</P>;
  return (
    <>
      <DrawerHeader className='flex flex-row items-center justify-between bg-secondary py-33.5! pr-32! pl-32! text-content-reverse'>
        <div className='flex w-full flex-col gap-4 md:w-1/2'>
          <BadgeEl variant={theme} reverse className='w-fit' />
          <H2 marginBottom='none' weight='bold'>
            {data.title}
          </H2>
        </div>
        <div className='hidden w-1/2 max-w-100! md:block'>
          <img src={`/imgs/drawerBanners/${theme}.png`} alt='Theme banner' className='w-full' />
        </div>
      </DrawerHeader>
      <DrawerBody className='flex-col gap-5 pl-32'>
        <Spacer size='6xl' />
        <div>
          {data.sections.map((section: any, i: number) => (
            <div key={i} className={cn('flex w-full flex-col gap-8', section.className)}>
              <TitleBlock text={section.title} />
              <div className='flex'>
                <div className='flex w-full flex-col gap-8 md:w-3/4'>
                  {section.content.map((content: any, j: number) => (
                    <div className={cn('pr-0 md:pr-12')} key={j}>
                      {content.type === 'text' && (
                        <TextBlock text={content.content} className={content.className} />
                      )}
                      {content.type === 'separator' && (
                        <Separator
                          className={cn('mt-3 mb-3', content.className)}
                          color='foreground-soft'
                        />
                      )}
                      {content.type === 'quote' && (
                        <QuoteBlock
                          className={content.className}
                          quote={content.content}
                          author={content.author}
                          theme={theme}
                        />
                      )}
                      {content.type === 'graph' && (
                        <GraphBlock
                          className={content.className}
                          data={content.data}
                          source={content.source}
                          value={content.value}
                          populationGroup={content.populationGroup}
                          settings={content.settings}
                          title={content.title}
                          subTitle={content.subTitle}
                          graphType={content.graphType}
                        />
                      )}
                      {content.type === 'multiGraph' && (
                        <MultiGraphBlock
                          className={content.className}
                          options={content.options}
                          data={content.data}
                          source={content.source}
                          value={content.value}
                          populationGroup={content.populationGroup}
                          settings={content.settings}
                          title={content.title}
                          subTitle={content.subTitle}
                          graphType={content.graphType}
                        />
                      )}
                      {content.type === 'spacer' && <Spacer size={content.size} />}
                    </div>
                  ))}
                </div>
                {section.microViz && (
                  <MicroVizBlock value={section.microViz.value} text={section.microViz.text} />
                )}
              </div>
              <Separator color='surface-md' className='mt-7 mb-10' />
            </div>
          ))}
        </div>
        <P size='sm' className='text-content-secondary'>
          {data.source}
        </P>
        <Spacer size='xl' />
        <div className={cn('w-full p-12', bgColorClass)}>
          <div className='w-full max-w-3xl'>
            <H6 marginBottom='xs' className={textColorClass}>
              Policy options
            </H6>
            <H4 weight='bold' marginBottom='none' className={textColorClass}>
              {recommendation.mainRecommendation}
            </H4>
            <div className='pt-5'>
              {recommendation.detailedRecommendations.map((d, i) => (
                <P
                  key={d}
                  marginBottom='none'
                  className={
                    i < recommendation.detailedRecommendations.length - 1
                      ? 'border-stroke border-b py-3'
                      : 'pt-3'
                  }
                >
                  {d}
                </P>
              ))}
            </div>
          </div>
        </div>
        <Spacer size='4xl' />
      </DrawerBody>
      <DrawerFooter className='relative w-full'>
        {next === 'Data explorer' ? (
          <Link to='/data-explorer'>
            <Footer section={next} />
          </Link>
        ) : (
          <Footer
            section={next}
            setOpenDrawer={() => {
              setOpenDrawer(next);
            }}
          />
        )}
      </DrawerFooter>
    </>
  );
}
