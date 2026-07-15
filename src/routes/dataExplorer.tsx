import type { AnyRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { Button } from '@undp/design-system-react/Button';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H1, H4, P } from '@undp/design-system-react/Typography';
import { DownloadIcon } from 'lucide-react';

export function dataExplorer() {
  return (
    <div className='mx-auto my-8 w-full'>
      <section id='data-explorer' className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
        <H1 size='sm'>Data Explorer</H1>
        <Spacer size='2xl' />
        <div className='h-[70vh] w-full bg-primary-gray-200 p-6 md:p-10' />
      </section>
      <Spacer size='2xl' />
      <section id='download-data' className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
        <button
          type='button'
          className='flex w-full flex-col bg-primary-gray-200 p-6 hover:bg-primary-gray-300 md:p-10'
        >
          <H4 weight='bold'>Download Data</H4>
          <P size='lg' marginBottom='none'>
            Lorem ipsum dolor sit amet consectetur. Consequat tempus.
          </P>
          <Spacer size='2xl' />
          <Button variant='link-without-icon' padding='none' className='w-fit'>
            Download <DownloadIcon className='text-accent-red' />
          </Button>
        </button>
      </section>
      <Spacer size='8xl' />
    </div>
  );
}

export default function createDataExplorer(parentRoute: AnyRoute) {
  return createRoute({
    path: '/data-explorer',
    component: dataExplorer,
    getParentRoute: () => parentRoute,
  });
}
