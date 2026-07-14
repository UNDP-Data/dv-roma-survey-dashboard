import { Link } from '@tanstack/react-router';
import {
  Header,
  HeaderLogoUnit,
  HeaderMainNavUnit,
  HeaderMenuUnit,
} from '@undp/design-system-react/Header';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@undp/design-system-react/HoverCard';
import { P } from '@undp/design-system-react/Typography';
import { COUNTRIES } from '@/Constants';

export default function HeaderEl() {
  return (
    <Header>
      <HeaderLogoUnit hyperlink='/' siteName='Roma Survey Dashboard' />
      <HeaderMainNavUnit>
        <HeaderMenuUnit>
          <Link to='/'>Home</Link>
          <Link to='/data-explorer'>Data explorer</Link>
          <HoverCard openDelay={0} closeDelay={60}>
            <HoverCardTrigger>Countries</HoverCardTrigger>
            <HoverCardContent side='bottom' align='center' className='p-0'>
              <div className='flex flex-col px-0 py-2'>
                {COUNTRIES.map((country) => (
                  <Link
                    to='/countries/$countryId'
                    params={{ countryId: country.id }}
                    key={country.id}
                    className='w-full p-3 hover:bg-primary-gray-300 hover:text-primary-blue-600'
                  >
                    <P size='sm' marginBottom='none'>
                      {country.name}
                    </P>
                  </Link>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>
          <Link to='/resources'>Resources</Link>
          <Link to='/about'>About</Link>
        </HeaderMenuUnit>
      </HeaderMainNavUnit>
    </Header>
  );
}
