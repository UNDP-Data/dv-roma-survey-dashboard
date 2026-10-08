import { cn } from '@undp/design-system-react/cn';
import { Spacer } from '@undp/design-system-react/Spacer';
import type { Themes } from '@/types';
import { BadgeEl } from './BadgeEl';

export function CardEl({
  className,
  variant,
  showBadge = true,
  children,
}: React.ComponentProps<'div'> & {
  variant?: Themes;
  showBadge?: boolean;
}) {
  const bgColorClass =
    variant === 'Education'
      ? 'bg-education'
      : variant === 'Health'
        ? 'bg-health'
        : variant === 'Employment'
          ? 'bg-employment'
          : variant === 'Housing'
            ? 'bg-housing'
            : variant === 'Discrimination'
              ? 'bg-discrimination'
              : 'bg-secondary';
  return (
    <div className={cn('flex h-full w-full flex-col border border-stroke p-0', className)}>
      <div className={`h-1.5 w-full ${bgColorClass}`} />
      <Spacer size='2xl' />
      {variant && showBadge && (
        <>
          <div className='flex justify-start px-5'>
            <BadgeEl variant={variant} />
          </div>
          <Spacer size='xl' />
        </>
      )}
      <div className='flex w-full grow flex-col px-5 pb-5'>{children}</div>
    </div>
  );
}
