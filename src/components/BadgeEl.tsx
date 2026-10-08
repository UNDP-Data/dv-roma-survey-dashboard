import { Badge } from '@undp/design-system-react/Badge';
import type { Themes } from '@/types';

export function BadgeEl({
  variant,
  className,
}: React.ComponentProps<'div'> & {
  variant: Themes;
}) {
  return (
    <Badge
      className={className}
      style={{
        backgroundColor: `var(--${variant.toLowerCase()}-light)`,
        color: `var(--${variant.toLowerCase()})`,
      }}
    >
      {variant}
    </Badge>
  );
}
