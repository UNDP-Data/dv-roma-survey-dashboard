import { useEffect, useState } from 'react';
import type { ScrollySectionDataType } from '@/types';
import DesktopViz from './DesktopViz';
import MobileViz from './mobileViz';

export default function ScrollyTellingViz({ data }: { data: ScrollySectionDataType[] }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.onresize = () => {
      setWindowWidth(window.innerWidth);
    };
  }, []);
  if (windowWidth > 600) return <DesktopViz data={data} />;
  else return <MobileViz data={data} />;
}
