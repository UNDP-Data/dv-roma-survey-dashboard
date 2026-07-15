import { Grid, GridItem } from '@undp/design-system-react/Grid';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@undp/design-system-react/Tooltip';
import { H5, P } from '@undp/design-system-react/Typography';
import { UserRound } from 'lucide-react';

export function KeyFindings({
  index,
  title,
  description,
  persona,
  viz = <div className='h-full w-full bg-primary-gray-200' />,
  reverse = false,
}: {
  index: number;
  title: string;
  description: React.ReactNode;
  persona: { name: string; description: string };
  viz?: React.ReactNode;
  reverse?: boolean;
}) {
  const keyFindingContent = (
    <div className='flex flex-col gap-2'>
      <P className='uppercase' size='xs' marginBottom='none'>
        Key finding {index}
      </P>
      <H5 weight='bold' marginBottom='none'>
        {title}
      </H5>
      {description}
      <div className='mt-4'>
        <div className='relative left-4 z-2 h-8 w-8 rounded-full bg-primary-gray-700 p-1'>
          <UserRound size={24} strokeWidth={2} stroke='#fff' />
        </div>
        <div className='relative -mt-4 rounded-[2px] border border-primary-gray-400 bg-primary-gray-200 px-6 pt-8 pb-4'>
          <P size='base' marginBottom='xs'>
            {persona.description}
          </P>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className='cursor-help font-sans text-base text-primary-gray-550 underline decoration-dotted underline-offset-4'>
                  {persona.name}
                </span>
              </TooltipTrigger>
              <TooltipContent className='m-0 p-0' inPortal>
                <P
                  size='sm'
                  marginBottom='none'
                  className='m-0 max-w-64 border-none bg-primary-white p-2 text-primary-black md:m-0 md:p-2'
                >
                  This is not a real person; his story represents experiences documented across
                  multiple household accounts.
                </P>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
  return (
    <div className='w-full antialiased'>
      <Grid noOfCol={{ base: 1, md: 2 }} gap='32px'>
        <GridItem>{reverse ? viz : keyFindingContent}</GridItem>
        <GridItem>{reverse ? keyFindingContent : viz}</GridItem>
      </Grid>
    </div>
  );
}
