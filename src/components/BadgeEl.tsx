import { Badge } from '@undp/design-system-react/Badge';
import { cn } from '@undp/design-system-react/cn';
import { THEME_LABELS } from '@/Constants';
import type { Themes } from '@/types';

export function BadgeEl({
  variant,
  className,
  reverse = false,
}: React.ComponentProps<'div'> & {
  variant: Themes;
  reverse?: boolean;
}) {
  return (
    <Badge
      className={cn('px-2.5 py-0.5 font-semibold', className)}
      style={{
        backgroundColor: reverse
          ? `var(--${variant.toLowerCase()})`
          : `var(--${variant.toLowerCase()}-light)`,
        color: reverse ? 'var(--content-reverse)' : `var(--${variant.toLowerCase()})`,
      }}
    >
      {THEME_LABELS[variant]}
    </Badge>
  );
}
