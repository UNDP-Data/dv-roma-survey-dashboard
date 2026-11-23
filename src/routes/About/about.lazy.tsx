import { createLazyRoute } from '@tanstack/react-router';
import { PageSection } from '@undp/design-system-react/PageSection';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H1, H4, P } from '@undp/design-system-react/Typography';

export function About() {
  return (
    <PageSection className='max-w-5xl'>
      <H1 size='sm'>About the Roma Socio-economic Scoreboard</H1>
      <Spacer size='2xl' />
      <P>
        The Roma Socio-economic Scoreboard offers a deep and granular view of the socio-economic
        conditions and multidimensional vulnerabilities of Roma communities across EU enlargement
        countries, launching with comprehensive and harmonized evidence from Georgia, Moldova and
        Ukraine. Presented through an exploratory dashboard and country-specific data stories, the
        evidence can identify priorities for Roma-inclusive policies, direct resources where they
        are most needed and establish baselines for measuring progress.
      </P>
      <Spacer size='2xl' />
      <H4 weight='bold'>The Roma Well-being Assessment</H4>
      <P>
        The data displayed on the Scoreboard was collected through an assessment that combines a
        household survey, qualitative (micro-narrative) research, and geospatial analysis of access
        to services.{' '}
        <strong>The 2025 Multi-country Survey on Socio-economic Vulnerabilities of Roma</strong> is
        a household survey harmonized across the surveyed countries with a common methodological
        framework, collecting data on vulnerable Roma, as well as non-Roma living in their vicinity
        to illustrate the disparities across key socio-economic dimension: education, employment and
        economic security, living conditions, health, and discrimination.
      </P>
      <P>
        The Data Explorer presents indicators calculated from household survey responses using
        common definitions across the three countries. Where available, breakdowns by sex, age and
        other individual and household characteristics allow users to see differences that
        country-level figures can obscure.
      </P>
      <P>
        The Country Snapshots for Georgia, Moldova and Ukraine examine how vulnerabilities across
        these areas relate to one another. Personal accounts describe circumstances behind the
        survey findings, while geospatial analysis examines access to schools, health facilities,
        transport and other services.
      </P>
      <P>
        Each Snapshot draws on this evidence to present policy recommendations that address both the
        immediate pressures households face and the longstanding barriers identified in each
        country.
      </P>
      <Spacer size='2xl' />
      <H4 weight='bold'>Supporting Roma-inclusive policies</H4>
      <P>
        Roma inclusion is integral part of the path to EU enlargement. Accession negotiations assess
        progress on fundamental rights, including the protection of minorities. The European Pillar
        of Social Rights provides a reference for social inclusion, while the EU Roma Strategic
        Framework for Equality, Inclusion and Participation 2020–2030 calls on enlargement countries
        to align their national strategies with its objectives.
      </P>
      <P>
        The Scoreboard helps translate these commitments into evidence-driven policy cycles. Its
        findings can inform national Roma inclusion strategies and wider policies on education,
        employment, health, housing, discrimination and access to services. Granular data enables
        identifying priorities, design measures suited to circumstances of Roma households and set
        measurable targets. The assessment provides baselines against which subsequent data can be
        compared, supporting governments and their partners in monitoring outcomes, reporting on
        commitments and adjusting policies as evidence develops.
      </P>
      <Spacer size='2xl' />
      <H4 weight='bold'>Partners and contributions</H4>
      <P>
        The assessment was conducted as part of the EU-funded project, Multi-Country Survey on the
        Socio-Economic Vulnerabilities of Roma, co-implemented by UNDP and the World Bank. The
        Scoreboard was developed by UNDP and funded by the European Union. The indicators presented
        on the Data Explorer are generated based on the survey questionnaires and data and
        harmonized with international definitions and methodologies.
      </P>
      <P>
        The Assessment was designed with contributions from the European Union Agency for
        Fundamental Rights and the World Bank. It also benefited from contributions of national
        institutions, statistical offices, civil society and advocacy organizations, Roma community
        mediators, and on the experiences of participating Roma and neighboring non-Roma households.
      </P>
      <div className='flex flex-wrap items-center gap-x-6'>
        <img src='/imgs/logos/logo-eu-en.png' alt='European Union' className='h-32' />
        <img
          src='/imgs/logos/undp.svg'
          alt='United Nations Development Programme'
          className='h-32'
        />
      </div>
    </PageSection>
  );
}

export const Route = createLazyRoute('/about')({
  component: About,
});
