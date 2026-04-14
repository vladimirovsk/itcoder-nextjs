import { Box, Avatar, Typography, Chip, Divider, Link } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface AuthorCardProps {
  name: string;
  role: string;
  location: string;
  bio: string;
  skills: string[];
  linkedIn: string;
  github: string;
  avatarUrl?: string;
}

export default function AuthorCard({
  name,
  role,
  location,
  bio,
  skills,
  linkedIn,
  github,
  avatarUrl,
}: AuthorCardProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Box
      component="article"
      itemScope
      itemType="https://schema.org/Person"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
        alignItems: { xs: 'center', md: 'flex-start' },
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0px 4px 20px rgba(34, 35, 58, 0.12)',
        p: { xs: 3, md: 4 },
        maxWidth: '780px',
        mx: 'auto',
      }}
    >
      {/* Avatar */}
      <Avatar
        src={avatarUrl}
        alt={name}
        itemProp="image"
        sx={{
          width: { xs: 100, md: 120 },
          height: { xs: 100, md: 120 },
          fontSize: '2.5rem',
          fontWeight: 700,
          backgroundColor: '#1e41da',
          color: '#fff',
          flexShrink: 0,
        }}
      >
        {!avatarUrl && initials}
      </Avatar>

      {/* Info */}
      <Box sx={{ width: '100%' }}>
        <Typography
          variant="h5"
          component="h2"
          itemProp="name"
          sx={{ fontWeight: 700, color: '#0f1724', mb: 0.5 }}
        >
          {name}
        </Typography>

        <Typography
          variant="subtitle1"
          itemProp="jobTitle"
          sx={{ color: '#1e41da', fontWeight: 600, mb: 1 }}
        >
          {role}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
          <LocationOnIcon sx={{ fontSize: '1rem', color: '#888' }} />
          <Typography
            variant="body2"
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress"
            sx={{ color: '#666' }}
          >
            <span itemProp="addressLocality">{location.split(',')[0]?.trim()}</span>
            {location.includes(',') && (
              <>
                ,&nbsp;
                <span itemProp="addressRegion">{location.split(',')[1]?.trim()}</span>
              </>
            )}
            {location.includes(',') && location.split(',').length > 2 && (
              <>
                ,&nbsp;
                <span itemProp="addressCountry">{location.split(',')[2]?.trim()}</span>
              </>
            )}
          </Typography>
        </Box>

        <Typography
          variant="body1"
          itemProp="description"
          sx={{ color: '#444', mb: 2, lineHeight: 1.7 }}
        >
          {bio}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Skills */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              size="small"
              sx={{
                backgroundColor: '#eef2ff',
                color: '#1e41da',
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            />
          ))}
        </Box>

        {/* Social Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer me"
            itemProp="sameAs"
            aria-label="LinkedIn profile"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: '#0a66c2',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            <LinkedInIcon fontSize="small" />
            LinkedIn
          </Link>
          <Link
            href={github}
            target="_blank"
            rel="noopener noreferrer me"
            itemProp="sameAs"
            aria-label="GitHub profile"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: '#24292f',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            <GitHubIcon fontSize="small" />
            GitHub
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
