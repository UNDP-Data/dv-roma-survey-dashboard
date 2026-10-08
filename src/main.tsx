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
