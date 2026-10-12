import { cn } from '@undp/design-system-react/cn';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H4, H6, P } from '@undp/design-system-react/Typography';
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
      childrenClassName='p-12'
    >
      <H6 marginBottom='none' style={{ color: `var(--${theme.toLowerCase()})` }}>
        Stories behind statistics
      </H6>
      <Spacer size='xl' />
      <H4 weight='medium' marginBottom='none'>
        {quote}
      </H4>
      <Spacer size='4xl' />
      <P size='base' className='text-content-secondary' marginBottom='none'>
        {author}
      </P>
    </CardEl>
  );
}
