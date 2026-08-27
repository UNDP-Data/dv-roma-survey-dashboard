import type { AnyRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { Button } from '@undp/design-system-react/Button';
import { DropdownSelect } from '@undp/design-system-react/DropdownSelect';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H1, H4, P } from '@undp/design-system-react/Typography';
import { DownloadIcon } from 'lucide-react';
import { useState } from 'react';
import { DataExplorerEl } from './dataExplorerEl';

export const dataExplorer = () => {
  const [selectedCountry, setSelectedCountry] = useState({
    label: 'Moldova',
    value: 'moldova',
  });
  return (
    <div className='mx-auto my-8 w-full antialiased'>
      <section id='data-explorer' className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
        <DropdownSelect
          color='primary'
          value={selectedCountry}
          // biome-ignore lint/suspicious/noExplicitAny: Need to fix in the DS
          onChange={(d: any) => setSelectedCountry(d)}
          options={[
            {
              label: 'Moldova',
              value: 'moldova',
            },
            {
              label: 'Georgia',
              value: 'georgia',
            },
            {
              label: 'Ukraine',
              value: 'ukraine',
            },
          ]}
          showCheck
          size='base'
          variant='light'
        />
        <Spacer size='4xl' />
        <H1 size='sm'>Data Explorer for {selectedCountry.label}</H1>
        <Spacer size='2xl' />
        <DataExplorerEl country={selectedCountry.value} />
      </section>
      <Spacer size='2xl' />
      <section id='download-data' className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
        <button
          type='button'
          className='flex w-full flex-col bg-surface p-6 hover:bg-surface-hover md:p-10'
        >
          <H4 weight='bold'>Download Data</H4>
          <P size='lg' marginBottom='none'>
            Lorem ipsum dolor sit amet consectetur. Consequat tempus.
          </P>
          <Spacer size='2xl' />
          <Button variant='link' arrow={false} padding='none' className='w-fit'>
            Download <DownloadIcon className='text-accent-red' />
          </Button>
        </button>
      </section>
      <Spacer size='8xl' />
    </div>
  );
};

export default function createDataExplorer(parentRoute: AnyRoute) {
  return createRoute({
    path: '/data-explorer',
    component: dataExplorer,
    getParentRoute: () => parentRoute,
  });
}
