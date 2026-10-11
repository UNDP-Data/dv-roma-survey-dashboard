import { H4 } from '@undp/design-system-react/Typography';

export function TitleBlock({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <H4 weight='bold' marginBottom='none' className='w-full pr-0 md:w-3/4 md:pr-12'>
      {text}
    </H4>
  );
}
