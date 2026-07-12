import type { AnyRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { H1 } from '@undp/design-system-react/Typography';

export function dataExplorer() {
  return (
    <div className='mx-auto my-8 w-full max-w-[1920px] px-4'>
      <H1 size='sm'>Data Explorer</H1>
    </div>
  );
}

export default function createDataExplorer(parentRoute: AnyRoute) {
  return createRoute({
    path: '/data-explorer',
    component: dataExplorer,
    getParentRoute: () => parentRoute,
  });
}
