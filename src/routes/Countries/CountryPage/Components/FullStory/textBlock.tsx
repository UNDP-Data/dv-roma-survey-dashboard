import { MarkdownRenderer } from '@undp/design-system-react/MarkdownRenderer';
import { P } from '@undp/design-system-react/Typography';

export function TextBlock({ className, text }: { className?: string; text: string }) {
  return (
    <div className={className}>
      <MarkdownRenderer
        text={text}
        size='base-responsive'
        components={{
          p: ({ children }) => (
            <P size='base-responsive' marginBottom='none'>
              {children}
            </P>
          ),
        }}
      />
    </div>
  );
}
