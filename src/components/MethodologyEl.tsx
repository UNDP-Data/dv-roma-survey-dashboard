import { Separator } from '@undp/design-system-react/Separator';
import { Spacer } from '@undp/design-system-react/Spacer';
import { P } from '@undp/design-system-react/Typography';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useState } from 'react';

export const MethodologyEl = ({ text }: { text: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Spacer size='xl' />
      <Separator color='surface-md' />
      <Spacer size='xl' />
      <button
        type='button'
        onClick={() => setOpen(!open)}
        className='mb-2.5 flex items-center gap-0.5'
      >
        <P size='base' weight='bold' marginBottom='none'>
          Methodology
        </P>
        {open ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
      </button>
      {open && (
        <P size='base' className='text-content-secondary' marginBottom='none'>
          {text}
        </P>
      )}
    </>
  );
};
