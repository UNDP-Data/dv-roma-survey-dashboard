import { cn } from '@undp/design-system-react/cn';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H5, P } from '@undp/design-system-react/Typography';
import { CardEl } from '@/components/CardEl';
import type { Themes } from '@/types';

export function QuoteBlock({
  theme,
  className,
  quote,
  author,
}: {
  theme: Themes;
  className?: string;
  quote: string;
  author: string;
}) {
  return (
    <CardEl
      className={cn('border-0 bg-surface', className)}
      showBadge={false}
      variant={theme}
      childrenClassName='pt-2 pr-16 pb-10 pl-12'
    >
      <P
        size='sm'
        weight='bold'
        marginBottom='none'
        className='uppercase tracking-wider'
        style={{ color: `var(--${theme.toLowerCase()})` }}
      >
        Stories behind statistics
      </P>
      <Spacer size='xl' />
      <H5 weight='semibold' marginBottom='none'>
        {quote}
      </H5>
      <Spacer size='xl' />
      <P size='base' className='text-content-tertiary' marginBottom='none'>
        {author}
      </P>
    </CardEl>
  );
}
