import { Box, Grid, Typography } from '@mui/material';
import testimonials from './testimonials.json';

export default function Testimonials() {
    return (
        <section id="testimonials" className="containerPage">
            <h2 className="titlePage">What Clients Say</h2>
            <Grid container spacing={3}>
                {testimonials.map((t, i) => (
                    <Grid key={i} size={{ xs: 12, md: 4 }}>
                        <Box
                            itemScope
                            itemType="https://schema.org/Review"
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
                                itemProp="reviewBody"
                                variant="body1"
                                sx={{ color: '#444', lineHeight: 1.75, flexGrow: 1, mb: 2.5 }}
                            >
                                &ldquo;{t.text}&rdquo;
                            </Typography>
                            <Box>
                                <Typography itemProp="author" variant="subtitle2" sx={{ fontWeight: 700, color: '#0f1724' }}>
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
