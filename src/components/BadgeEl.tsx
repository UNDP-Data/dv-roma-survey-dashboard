import { Badge } from '@undp/design-system-react/Badge';
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
      className={className}
      style={{
        backgroundColor: reverse
          ? `var(--${variant.toLowerCase()})`
          : `var(--${variant.toLowerCase()}-light)`,
        color: reverse ? 'var(--content-reverse)' : `var(--${variant.toLowerCase()})`,
      }}
    >
      {variant}
    </Badge>
  );
}
