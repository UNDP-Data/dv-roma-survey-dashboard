import { cn } from '@undp/design-system-react/cn';
import { Separator } from '@undp/design-system-react/Separator';
import { Spacer } from '@undp/design-system-react/Spacer';
import { P } from '@undp/design-system-react/Typography';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useState } from 'react';
import { THEMES } from '@/Constants';
import { CardEl } from '@/components/CardEl';
import type { ScrollySectionDataType } from '@/types';

export function NarrativeCard({ text }: { text: ScrollySectionDataType['text'] }) {
  const [methodologyOpen, setMethodologyOpen] = useState(false);
  const paragraphs = text.content.split('\n\n');
  return (
    <CardEl variant={text.theme} className='bg-background'>
      <P weight='bold' size='xl'>
        {text.title}
      </P>
      {paragraphs.map((paragraph, i) => (
        <P
          // biome-ignore lint/suspicious/noArrayIndexKey: paragraph order is static
          key={i}
          marginBottom={i === paragraphs.length - 1 && !text.methodology ? 'none' : 'base'}
          leading='xl'
        >
          {paragraph.split(/<Badge>(.*?)<\/Badge>/g).map((part, j) => {
            if (j % 2 === 0) return part;
            const theme = part.toLowerCase();
            const themed = THEMES.some((t) => t.toLowerCase() === theme);
            return (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: a label can repeat, position cannot
                key={j}
                className={cn(
                  'rounded-full px-2.5 py-0.5 font-semibold',
                  !themed && 'bg-gray-100 text-gray-700',
                )}
                style={
                  themed
                    ? { backgroundColor: `var(--${theme}-light)`, color: `var(--${theme})` }
                    : undefined
                }
              >
                {part}
              </span>
            );
          })}
        </P>
      ))}
      {text.methodology && (
        <>
          <Spacer size='xl' />
          <Separator color='surface-md' />
          <Spacer size='xl' />
          <button
            type='button'
            onClick={() => setMethodologyOpen(!methodologyOpen)}
            className='mb-2.5 flex items-center gap-0.5'
          >
            <P size='base' weight='bold' marginBottom='none'>
              Methodology
            </P>
            {methodologyOpen ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          </button>
          {methodologyOpen && (
            <P size='base' className='text-content-secondary' marginBottom='none'>
              {text.methodology}
            </P>
          )}
        </>
      )}
    </CardEl>
  );
}
