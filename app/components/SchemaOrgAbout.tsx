// JSON-LD structured data for the About page
// Includes Person and Organization schemas with sameAs links to LinkedIn and GitHub

const LINKEDIN_URL = 'https://www.linkedin.com/in/serhii-vladimirov'; // TODO: update to your actual LinkedIn URL
const GITHUB_URL = 'https://github.com/svladimirov'; // TODO: update to your actual GitHub URL

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://itcoder.ca/#person',
  name: 'Serhii Vladimirov',
  jobTitle: 'Senior Backend & AI Engineer',
  url: 'https://itcoder.ca/about',
  image: 'https://itcoder.ca/og-image.jpg',
  description:
    'Senior Backend & AI Engineer based in Calgary, Canada, specializing in NestJS microservices, AI/LLM integrations, payment systems, and event-driven architectures for SaaS, fintech and crypto products.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Calgary',
    addressRegion: 'AB',
    addressCountry: 'CA',
    addressCountryFull: 'Canada',
  },
  knowsAbout: [
    'NestJS',
    'Node.js',
    'TypeScript',
    'Microservices Architecture',
    'REST API Development',
    'GraphQL',
    'AI Integration',
    'LLM Integration',
    'Claude API',
    'OpenAI',
    'GCP Pub/Sub',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'Payment Systems',
    'Stripe',
    'Web3 & Blockchain',
    'Software Architecture',
    'Docker',
    'Canadian IT Industry',
  ],
  memberOf: {
    '@type': 'Organization',
    '@id': 'https://itcoder.ca/#organization',
    name: 'IT CODER',
    url: 'https://itcoder.ca',
  },
  worksFor: {
    '@id': 'https://itcoder.ca/#organization',
  },
  sameAs: [
    LINKEDIN_URL,
    GITHUB_URL,
    'https://www.facebook.com/61575213251739',
  ],
  nationality: {
    '@type': 'Country',
    name: 'Canada',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'Organization'],
  '@id': 'https://itcoder.ca/#organization',
  name: 'IT CODER',
  url: 'https://itcoder.ca',
  logo: 'https://itcoder.ca/og-image.jpg',
  image: 'https://itcoder.ca/og-image.jpg',
  description:
    'IT CODER is a Canadian software development company specializing in NestJS microservices, AI/LLM integrations, payment and fintech APIs, crypto/Web3 backends, and event-driven architectures for SaaS products.',
  foundingLocation: {
    '@type': 'Place',
    name: 'Calgary, Alberta, Canada',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Calgary',
    addressRegion: 'AB',
    addressCountry: 'CA',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-587-968-9089',
    contactType: 'customer service',
    email: 'support@itcoder.ca',
    availableLanguage: ['English'],
    areaServed: 'CA',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Canada',
  },
  knowsAbout: [
    'Backend Development',
    'Microservices Architecture',
    'API Development',
    'AI & LLM Integration',
    'Payment Systems',
    'Fintech Backend',
    'Web3 & Blockchain',
    'Software Architecture',
  ],
  member: {
    '@id': 'https://itcoder.ca/#person',
  },
  sameAs: [
    LINKEDIN_URL,
    GITHUB_URL,
    'https://www.facebook.com/61575213251739',
  ],
};

export default function SchemaOrgAbout() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
