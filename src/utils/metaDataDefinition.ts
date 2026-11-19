const SITE_URL = 'SITE_URL';
const SITE_NAME = 'Roma Socio-Economic Scoreboard';
const DEFAULT_DESC =
  'The Roma Socio-Economic Scoreboard is a snapshot of key social and economic indicators based on harmonized, comparable data from household surveys across Georgia, Moldova and Ukraine.';

interface Arg {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  locale?: string;
}

export function metaDataDefinition({
  title,
  description = DEFAULT_DESC,
  path = '/',
  image = `${SITE_URL}/imgs/og-image.jpg`,
  imageAlt = SITE_NAME,
  imageHeight = 483,
  imageWidth = 862,
}: Arg = {}) {
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title: title ?? SITE_NAME },
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: title ?? SITE_NAME },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: `${imageWidth}` },
      { property: 'og:image:height', content: `${imageHeight}` },
      { property: 'og:image:alt', content: imageAlt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { httpEquiv: 'content-language', content: 'en_US' },
      { property: 'og:locale', content: 'en_US' },
    ],
    links: [{ rel: 'canonical', href: url }],
  };
}
