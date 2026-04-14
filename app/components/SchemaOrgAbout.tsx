// JSON-LD structured data for the About page
// Includes Person and Organization schemas with sameAs links to LinkedIn and GitHub

const LINKEDIN_URL = 'https://www.linkedin.com/in/serhii-vladimirov'; // TODO: update to your actual LinkedIn URL
const GITHUB_URL = 'https://github.com/svladimirov'; // TODO: update to your actual GitHub URL

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://itcoder.ca/#person',
  name: 'Serhii Vladimirov',
  jobTitle: 'Full-Stack Developer & IT Consultant',
  url: 'https://itcoder.ca/about',
  image: 'https://itcoder.ca/og-image.jpg',
  description:
    'Full-Stack Developer based in Calgary, Canada, specializing in scalable web applications, REST APIs, database architecture, and AI-driven backend solutions.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Calgary',
    addressRegion: 'AB',
    addressCountry: 'CA',
    addressCountryFull: 'Canada',
  },
  knowsAbout: [
    'Next.js',
    'React',
    'Node.js',
    'NestJS',
    'Flutter',
    'REST API Development',
    'Database Architecture',
    'PostgreSQL',
    'MongoDB',
    'Linux Server Administration',
    'Proxmox',
    'VMware',
    'AI Integration',
    'Full-Stack Web Development',
    'Software Architecture',
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
    'IT CODER is a Canadian software development company specializing in web applications, REST APIs, database management, server infrastructure, and AI-driven solutions for businesses across Canada.',
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
    'Web Development',
    'API Development',
    'Database Architecture',
    'Server Configuration',
    'AI Integration',
    'Software Consulting',
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
