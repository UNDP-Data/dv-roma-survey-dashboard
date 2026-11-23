import { createLazyRoute } from '@tanstack/react-router';
// import { Button } from '@undp/design-system-react/Button';
// import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { PageSection } from '@undp/design-system-react/PageSection';
/* 
import {
  ResourceCard,
  ResourceCardContent,
  ResourceCardDescription,
  ResourceCardFooter,
  ResourceCardImage,
  ResourceCardTitle,
} from '@undp/design-system-react/ResourceCard';
*/
import { Spacer } from '@undp/design-system-react/Spacer';
import { H1, P } from '@undp/design-system-react/Typography';

export function Resource() {
  /*
  const resourceCards = [
    {
      title: 'Resource 1',
      text: 'Pdf (830kbs)',
      image: '/imgs/resource-01.webp',
      url: 'https://www.undp.org/',
    },
    {
      title: 'Resource 2',
      text: 'Pdf (830kbs)',
      image: '/imgs/resource-01.webp',
      url: 'https://www.undp.org/',
    },
    {
      title: 'Resource 3',
      text: 'Pdf (830kbs)',
      image: '/imgs/resource-01.webp',
      url: 'https://www.undp.org/',
    },
    {
      title: 'Resource 4',
      text: 'Pdf (830kbs)',
      image: '/imgs/resource-01.webp',
      url: 'https://www.undp.org/',
    },
  ];
  */
  return (
    <PageSection>
      <H1 size='sm'>Resources</H1>
      <Spacer size='2xl' />
      <P>Coming soon</P>
      {/*
        
      <Grid noOfCol={{ base: 1, sm: 2, md: 4 }} gap='32px'>
        {resourceCards.map((card) => (
          <GridItem key={card.title}>
            <ResourceCard href={card.url}>
              <ResourceCardImage imageSrc={card.image} aspectRatio='portrait' />
              <ResourceCardContent>
                <ResourceCardTitle>{card.title}</ResourceCardTitle>
                <ResourceCardDescription>{card.text}</ResourceCardDescription>
              </ResourceCardContent>
              <ResourceCardFooter>
                <Button variant='link' endIcon='download'>
                  Download
                </Button>
              </ResourceCardFooter>
            </ResourceCard>
          </GridItem>
        ))}
      </Grid
      */}
    </PageSection>
  );
}

export const Route = createLazyRoute('/resources')({
  component: Resource,
});
