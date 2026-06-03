import { Box, Grid, Typography } from '@mui/material';
import testimonials from './testimonials.json';

const reviewsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Client Reviews — IT CODER",
  "itemListElement": testimonials.map((t, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "item": {
      "@type": "Review",
      "reviewBody": t.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": t.rating,
        "bestRating": 5,
        "worstRating": 1,
      },
      "author": {
        "@type": "Person",
        "name": t.name,
      },
      "itemReviewed": {
        "@type": "ProfessionalService",
        "@id": "https://www.itcoder.ca/#organization",
        "name": "IT CODER",
        "url": "https://www.itcoder.ca",
      },
    },
  })),
};

export default function Testimonials() {
    return (
        <section id="testimonials" className="containerPage">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
            />
            <h2 className="titlePage">What Clients Say</h2>
            <Grid container spacing={3}>
                {testimonials.map((t, i) => (
                    <Grid key={i} size={{ xs: 12, md: 4 }}>
                        <Box
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '14px',
                                p: 3,
                                boxShadow: '0px 2px 12px rgba(0,0,0,0.06)',
                                border: '1px solid #F1F5F9',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box sx={{ display: 'flex', gap: 0.25, mb: 2 }}>
                                {Array.from({ length: t.rating }).map((_, j) => (
                                    <Typography key={j} component="span" sx={{ color: '#FBBF24', fontSize: '1.1rem', lineHeight: 1 }}>
                                        ★
                                    </Typography>
                                ))}
                            </Box>
                            <Typography
                                variant="body1"
                                sx={{ color: '#444', lineHeight: 1.75, flexGrow: 1, mb: 2.5 }}
                            >
                                &ldquo;{t.text}&rdquo;
                            </Typography>
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f1724' }}>
                                    {t.name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#64748b' }}>
                                    {t.role}, {t.company}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </section>
    );
}
