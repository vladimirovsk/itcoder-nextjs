import type { Metadata } from 'next';
import Link from 'next/link';
import { Box, Container, Divider, Typography, Grid } from '@mui/material';
import AuthorCard from '@/app/components/AuthorCard';
import SchemaOrgAbout from '@/app/components/SchemaOrgAbout';

export const metadata: Metadata = {
  title: 'About — IT CODER | Full-Stack Developer in Calgary, Canada',
  description:
    'Learn about Serhii Vladimirov, a Full-Stack Developer and IT Consultant based in Calgary, AB. Specializing in Next.js, NestJS, REST APIs, and AI-driven backend solutions for Canadian businesses.',
  alternates: { canonical: 'https://itcoder.ca/about' },
  openGraph: {
    title: 'About — IT CODER | Full-Stack Developer in Calgary, Canada',
    description:
      'Full-Stack Developer based in Calgary, AB — building scalable web applications, REST APIs, and AI-driven solutions for businesses across Canada.',
    url: 'https://itcoder.ca/about',
    siteName: 'IT CODER',
    images: [{ url: 'https://itcoder.ca/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_CA',
    type: 'profile',
  },
};

const EXPERIENCE_ITEMS = [
  {
    period: '2022 — Present',
    role: 'Full-Stack Developer & IT Consultant',
    company: 'IT CODER · Calgary, AB, Canada',
    description:
      'Building scalable web applications, REST APIs, and backend systems for Canadian SMBs. Delivering end-to-end solutions with Next.js, NestJS, PostgreSQL, and Linux server infrastructure.',
  },
  {
    period: '2015 — 2022',
    role: 'Software Engineer',
    company: 'Various IT Companies · Ukraine & Remote',
    description:
      'Developed enterprise software, database-driven systems, and embedded solutions across industries including finance, logistics, and manufacturing.',
  },
];

const SKILLS_GROUPS = [
  {
    category: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'Material UI', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'NestJS', 'REST API', 'GraphQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    category: 'Infrastructure',
    items: ['Linux', 'Proxmox', 'VMware', 'Docker', 'Nginx'],
  },
  {
    category: 'Mobile & Other',
    items: ['Flutter', 'Dart', 'Delphi', 'C/C++ (Embedded)'],
  },
];

export default function AboutPage() {
  return (
    <>
      <SchemaOrgAbout />

      {/* Hero */}
      <Box
        sx={{
          backgroundColor: '#0f1724',
          py: { xs: 8, md: 10 },
          px: 2,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="overline"
            sx={{ color: '#4f8ef7', letterSpacing: 4, fontWeight: 700 }}
          >
            About
          </Typography>
          <Typography
            variant="h3"
            component="h1"
            sx={{ color: '#fff', fontWeight: 800, mt: 1, mb: 2, lineHeight: 1.2 }}
          >
            Canadian IT Professional<br />Building What Works
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400, lineHeight: 1.7 }}
          >
            Full-Stack Developer & IT Consultant based in Calgary, AB — helping businesses across
            Canada build reliable, scalable software.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>

        {/* AuthorCard */}
        <Box sx={{ mb: 8 }}>
          <AuthorCard
            name="Serhii Vladimirov"
            role="Full-Stack Developer & IT Consultant"
            location="Calgary, AB, Canada"
            bio="I build web applications, REST APIs, and database-driven systems for businesses across Canada. With 10+ years of experience spanning enterprise software, embedded systems, and modern cloud-native architectures, I bring both depth and pragmatism to every project — from a startup MVP to a production-grade backend serving thousands of users."
            skills={['Next.js', 'NestJS', 'Node.js', 'React', 'Flutter', 'PostgreSQL', 'Linux', 'Docker']}
            linkedIn="https://www.linkedin.com/in/serhii-vladimirov" // TODO: update
            github="https://github.com/svladimirov" // TODO: update
          />
        </Box>

        <Divider sx={{ mb: 8 }} />

        {/* Experience */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            className="titlePage"
            sx={{ mb: 4 }}
          >
            Experience in Canadian IT
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: '780px', mx: 'auto' }}>
            {EXPERIENCE_ITEMS.map((item) => (
              <Box
                key={item.period}
                itemScope
                itemType="https://schema.org/OrganizationRole"
                sx={{
                  borderLeft: '3px solid #1e41da',
                  pl: 3,
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: '#4f8ef7', fontWeight: 700, letterSpacing: 2 }}
                >
                  {item.period}
                </Typography>
                <Typography
                  variant="h6"
                  component="h3"
                  itemProp="roleName"
                  sx={{ fontWeight: 700, color: '#0f1724', mt: 0.5, mb: 0.5 }}
                >
                  {item.role}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#1e41da', fontWeight: 600, mb: 1 }}
                >
                  {item.company}
                </Typography>
                <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.7 }}>
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ mb: 8 }} />

        {/* Skills */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            className="titlePage"
            sx={{ mb: 4 }}
          >
            Technical Skills
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {SKILLS_GROUPS.map((group) => (
              <Grid key={group.category} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box
                  sx={{
                    backgroundColor: '#f7f9ff',
                    borderRadius: '10px',
                    p: 3,
                    height: '100%',
                    border: '1px solid #e3eafc',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ color: '#1e41da', fontWeight: 700, mb: 1.5, letterSpacing: 1, textTransform: 'uppercase' }}
                  >
                    {group.category}
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2 }}>
                    {group.items.map((item) => (
                      <Box
                        component="li"
                        key={item}
                        sx={{ color: '#333', fontSize: '0.9rem', mb: 0.5, lineHeight: 1.6 }}
                      >
                        {item}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ mb: 8 }} />

        {/* Why Canada */}
        <Box sx={{ maxWidth: '780px', mx: 'auto', mb: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            className="titlePage"
            sx={{ mb: 3 }}
          >
            Working with Canadian Businesses
          </Typography>
          <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.8, mb: 2 }}>
            Based in Calgary, AB, I work with startups, small businesses, and established companies
            across Canada — from British Columbia to Ontario. I understand the Canadian market:
            bilingual requirements, provincial data residency considerations, and the pace of the
            local tech ecosystem.
          </Typography>
          <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.8, mb: 2 }}>
            Whether you need a production-ready web application, a custom REST API, or a reliable
            server setup, I deliver clean, maintainable solutions with clear communication and
            predictable timelines.
          </Typography>
          <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.8 }}>
            Available for project-based engagements, ongoing contracts, and technical consulting.{' '}
            <Link href="/#contact" style={{ color: '#1e41da', fontWeight: 600 }}>
              Get in touch
            </Link>{' '}
            to discuss your project.
          </Typography>
        </Box>

      </Container>
    </>
  );
}
