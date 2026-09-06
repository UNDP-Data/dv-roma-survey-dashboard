import type { AnyRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { Button } from '@undp/design-system-react/Button';
import { DropdownSelect } from '@undp/design-system-react/DropdownSelect';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H3, H4, P } from '@undp/design-system-react/Typography';
import { DownloadIcon } from 'lucide-react';
import { useState } from 'react';
import { DataExplorerEl } from './dataExplorerEl';

export const dataExplorer = () => {
  const [selectedCountry, setSelectedCountry] = useState({
    label: 'Moldova',
    value: 'moldova',
  });
  return (
    <div className='mx-auto my-8 w-full px-4 antialiased md:px-16'>
      <Spacer size='2xl' />
      <section id='data-explorer' className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-48'>
        <P marginBottom='2xs' size='sm'>
          Select country
        </P>
        <div className='max-w-75 md:max-w-100'>
          <DropdownSelect
            color='blue'
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
            isSearchable={false}
          />
        </div>
        <Spacer size='4xl' />
        <H3 className='font-heading uppercase'>Data Explorer for {selectedCountry.label}</H3>
        <Spacer size='2xl' />
        <DataExplorerEl country={selectedCountry.value} />
      </section>
      <Spacer size='2xl' />
      <section id='download-data' className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-48'>
        <div className='flex w-full flex-col bg-surface p-6 md:p-10'>
          <H4 weight='bold'>Download Data</H4>
          <P size='lg' marginBottom='none'>
            Lorem ipsum dolor sit amet consectetur. Consequat tempus.
          </P>
          <Spacer size='2xl' />
          <Button variant='link' arrow={false} padding='none' className='w-fit'>
            Download <DownloadIcon className='text-accent-blue' />
          </Button>
        </div>
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
