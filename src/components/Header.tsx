import {
  Header,
  HeaderLogoUnit,
  HeaderMainNavUnit,
  HeaderMenuDropdown,
  HeaderMenuLink,
  HeaderMenuUnit,
} from '@undp/design-system-react/Header';
import { COUNTRIES } from '@/Constants';

export default function HeaderEl() {
  return (
    <Header>
      <HeaderLogoUnit
        hyperlink='/'
        siteName='Roma Socio-Economic Scoreboard'
        siteSubName='Europe and Central Asia'
        siteSubNameUrl='https://www.undp.org/eurasia'
      />
      <HeaderMainNavUnit>
        <HeaderMenuUnit align='end'>
          <HeaderMenuLink href='/'>Home</HeaderMenuLink>
          <HeaderMenuLink href='/data-explorer'>Data explorer</HeaderMenuLink>
          <HeaderMenuDropdown
            label='Countries'
            items={COUNTRIES.map((country) => ({
              label: country.name,
              href: `/countries/${country.isoCode}`,
            }))}
          />
          <HeaderMenuLink href='/resources'>Resources</HeaderMenuLink>
          <HeaderMenuLink href='/about'>About</HeaderMenuLink>
        </HeaderMenuUnit>
      </HeaderMainNavUnit>
    </Header>
  );
}
