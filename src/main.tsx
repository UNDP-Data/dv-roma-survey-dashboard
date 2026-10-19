import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import { ConfigProvider } from '@undp/design-system-react/ConfigProvider';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FooterEl from './components/Footer';
import HeaderEl from './components/Header';
import * as TanStackQueryProvider from './integration/tanstack-query';
import createAboutRoute from './routes/About/about.route';
import createProjectPageRoute from './routes/Countries/CountryPage/countryPage.route';
import createCountriesRoute from './routes/Countries/countriesListing.route';
import createDataExplorerRoute from './routes/DataExplorer/dataExplorer.route';
import createResourceRoute from './routes/Resources/resources.routes';

import './styles/fonts.css';
import './styles/style.css';

const rootRoute = createRootRoute({
  component: () => (
    <div className='flex min-h-screen flex-col gap-0'>
      <HeaderEl />
      <main className='flex grow flex-col justify-center'>
        <div className='flex flex-col justify-center'>
          <svg width='0' height='0' className='hidden' aria-hidden='true'>
            <defs>
              <g id='person-icon'>
                <path d='M14.3594 13.8594C19.0938 13.8595 22.9315 17.6973 22.9316 22.4317V30.1475C22.9316 32.9882 20.6288 35.291 17.7881 35.291H6.64355C3.80293 35.291 1.50009 32.9881 1.5 30.1475V22.4317C1.50012 17.6972 5.33875 13.8594 10.0732 13.8594H14.3594ZM12.2158 1.85745C15.2933 1.85745 17.7881 4.35225 17.7881 7.42972C17.7881 10.5072 15.2933 13.002 12.2158 13.002C9.13842 13.0019 6.64356 10.5071 6.64355 7.42972C6.64355 4.35229 9.13841 1.85753 12.2158 1.85745Z' />
                <path
                  d='M22.9316 22.4317C22.9315 17.6973 19.0938 13.8595 14.3594 13.8594H10.0732C5.33875 13.8594 1.50012 17.6972 1.5 22.4317V30.1475C1.50009 32.9881 3.80293 35.291 6.64355 35.291H17.7881C20.6288 35.291 22.9316 32.9882 22.9316 30.1475V22.4317ZM17.7881 7.42972C17.7881 4.35225 15.2933 1.85745 12.2158 1.85745C9.13841 1.85753 6.64355 4.35229 6.64355 7.42972C6.64356 10.5071 9.13842 13.0019 12.2158 13.002C15.2933 13.002 17.7881 10.5072 17.7881 7.42972ZM19.2881 7.42972C19.2881 9.52084 18.3793 11.3986 16.9365 12.6934C21.09 13.7897 24.1936 17.4711 24.4189 21.9131L24.4316 22.4317V30.1475C24.4315 33.8165 21.4572 36.791 17.7881 36.791H6.64355C2.97453 36.7909 0.000112534 33.8165 0 30.1475V22.4317C0.000118523 17.7602 3.18079 13.8326 7.49414 12.6934C6.05171 11.3986 5.14356 9.52057 5.14355 7.42972C5.14355 3.52383 8.31005 0.357548 12.2158 0.357452L12.5801 0.366241C16.3167 0.555809 19.2881 3.64598 19.2881 7.42972Z'
                  fill='#F8F7F3'
                />
              </g>
              <filter
                id='neighborhoodFilter'
                x='-1'
                y='0'
                width='602'
                height='494'
                filterUnits='userSpaceOnUse'
                color-interpolation-filters='sRGB'
              >
                <feFlood flood-opacity='0' result='BackgroundImageFix' />
                <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                  result='hardAlpha'
                />
                <feMorphology
                  radius='1'
                  operator='erode'
                  in='SourceAlpha'
                  result='effect1_dropShadow_7223_14821'
                />
                <feOffset dy='1' />
                <feGaussianBlur stdDeviation='1' />
                <feComposite in2='hardAlpha' operator='out' />
                <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0' />
                <feBlend
                  mode='normal'
                  in2='BackgroundImageFix'
                  result='effect1_dropShadow_7223_14821'
                />
                <feBlend
                  mode='normal'
                  in='SourceGraphic'
                  in2='effect1_dropShadow_7223_14821'
                  result='shape'
                />
              </filter>
            </defs>
          </svg>
          <Outlet />
        </div>
      </main>
      <FooterEl />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  createAboutRoute(rootRoute),
  createDataExplorerRoute(rootRoute),
  createResourceRoute(rootRoute),
  createCountriesRoute(rootRoute),
  createProjectPageRoute(rootRoute),
]);

const TanStackQueryProviderContext = TanStackQueryProvider.getContext();
const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ConfigProvider
        config={{
          foreground: '#141d25',
          stroke: { base: '#edeff0' },
          violet: { 600: '#6F3FA0' },
          customColors: {
            education: '#10917d',
            'education-hover': '#14ae99',
            'education-light': '#e8f5f3',
            employment: '#c98b32',
            'employment-hover': '#d89b3a',
            'employment-light': '#f7ecdd',
            housing: '#8a6647',
            'housing-hover': '#af8c5a',
            'housing-light': '#f3ece6',
            health: '#7a3fe0',
            'health-hover': '#9854e9',
            'health-light': '#efe9fa',
            discrimination: '#c45f1a',
            'discrimination-hover': '#eb7325',
            'discrimination-light': '#f7ebe3',
            roma: '#da5d38',
            'non-roma': '#0076c1',
          },
        }}
      >
        <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
          <RouterProvider router={router} />
        </TanStackQueryProvider.Provider>
      </ConfigProvider>
    </StrictMode>,
  );
}
