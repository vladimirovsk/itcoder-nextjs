'use client';

import React, { useEffect, useState } from 'react';
import {
    Alert, Box, Button, Checkbox, Chip, CircularProgress,
    FormControlLabel, Grid, TextField, Typography,
} from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WebIcon from '@mui/icons-material/Web';
import BusinessIcon from '@mui/icons-material/Business';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import SettingsIcon from '@mui/icons-material/Settings';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PaymentIcon from '@mui/icons-material/Payment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BarChartIcon from '@mui/icons-material/BarChart';
import ApiIcon from '@mui/icons-material/Api';
import SearchIcon from '@mui/icons-material/Search';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SensorsIcon from '@mui/icons-material/Sensors';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import LanguageIcon from '@mui/icons-material/Language';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { palette } from '@/app/theme/tokens';

// ── Types ────────────────────────────────────────────────────────────────────

interface BuilderOption {
    id: string;
    label: string;
    description: string | null;
    icon: string | null;
    order: number;
    active: boolean;
    forProjectTypes: string[];
    group: string | null;
}

interface BuilderStep {
    step: number;
    title: string;
    subtitle: string | null;
    selectionType: string;
    options: BuilderOption[];
}

interface ContactForm {
    name: string;
    email: string;
    phone: string;
    company: string;
    note: string;
    privacy: boolean;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
    web: WebIcon,
    business: BusinessIcon,
    storefront: StorefrontIcon,
    phone_iphone: PhoneIphoneIcon,
    settings: SettingsIcon,
    sync_alt: SyncAltIcon,
    help_outline: HelpOutlineIcon,
    person: PersonIcon,
    admin_panel_settings: AdminPanelSettingsIcon,
    payment: PaymentIcon,
    notifications: NotificationsIcon,
    location_on: LocationOnIcon,
    bar_chart: BarChartIcon,
    api: ApiIcon,
    search: SearchIcon,
    edit_note: EditNoteIcon,
    sensors: SensorsIcon,
    wifi_off: WifiOffIcon,
    language: LanguageIcon,
};

const GROUP_LABELS: Record<string, string> = {
    scale: 'How many users do you expect at launch?',
    timeline: 'When would you like to launch?',
    readiness: 'Do you already have a brief or mockups?',
};

const STEP_LABELS = ['Project Type', 'Features', 'Details', 'Contact'];

// ── Small components ──────────────────────────────────────────────────────────

function StepIndicator({ active }: { active: number }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
            {STEP_LABELS.map((label, idx) => (
                <React.Fragment key={idx}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                        <Box sx={{
                            width: 36, height: 36, borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: idx <= active ? palette.brand[500] : 'surfaceAlt',
                            color: idx <= active ? 'white' : 'muted',
                            fontWeight: 700, fontSize: 14, transition: 'all 0.25s',
                        }}>
                            {idx < active ? '✓' : idx + 1}
                        </Box>
                        <Typography variant="caption" sx={{
                            display: { xs: 'none', sm: 'block' },
                            color: idx === active ? palette.brand[500] : idx < active ? 'bodyText' : 'muted',
                            fontWeight: idx === active ? 700 : 400,
                            whiteSpace: 'nowrap',
                        }}>
                            {label}
                        </Typography>
                    </Box>
                    {idx < STEP_LABELS.length - 1 && (
                        <Box sx={{
                            height: 2, flexShrink: 0,
                            width: { xs: 24, sm: 48, md: 72 },
                            mx: { xs: 0.5, sm: 1 },
                            mb: { xs: 0, sm: 2.5 },
                            backgroundColor: idx < active ? palette.brand[500] : 'hairline',
                            transition: 'background-color 0.25s',
                        }} />
                    )}
                </React.Fragment>
            ))}
        </Box>
    );
}

function TypeCard({ option, selected, onSelect }: {
    option: BuilderOption; selected: boolean; onSelect: (id: string) => void;
}) {
    const Icon = ICON_MAP[option.icon ?? ''] ?? HelpOutlineIcon;
    const muiTheme = useMuiTheme();
    return (
        <Box onClick={() => onSelect(option.id)} sx={{
            cursor: 'pointer',
            border: selected ? `2px solid ${palette.brand[500]}` : '2px solid transparent',
            outline: `1px solid ${selected ? palette.brand[500] : muiTheme.palette.hairline}`,
            backgroundColor: selected ? palette.brand[50] : 'background.paper',
            borderRadius: '14px', p: 2.5,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            textAlign: 'center', gap: 1,
            transition: 'all 0.2s',
            boxShadow: selected ? '0 0 0 3px rgba(59,91,219,0.12)' : '0px 2px 8px rgba(0,0,0,0.06)',
            '&:hover': { borderColor: palette.brand[500], boxShadow: '0px 4px 16px rgba(59,91,219,0.15)' },
        }}>
            <Box sx={{
                width: 52, height: 52, borderRadius: '50%',
                backgroundColor: selected ? palette.brand[500] : palette.brand[100],
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background-color 0.2s',
            }}>
                <Icon sx={{ color: selected ? 'white' : palette.brand[500], fontSize: 26 }} />
            </Box>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: selected ? palette.brand[500] : 'heading', lineHeight: 1.3 }}>
                {option.label}
            </Typography>
            {option.description && (
                <Typography variant="caption" sx={{ color: 'muted', lineHeight: 1.4 }}>
                    {option.description}
                </Typography>
            )}
        </Box>
    );
}

function FeatureCard({ option, selected, onToggle }: {
    option: BuilderOption; selected: boolean; onToggle: (id: string) => void;
}) {
    const Icon = ICON_MAP[option.icon ?? ''] ?? HelpOutlineIcon;
    const muiTheme = useMuiTheme();
    return (
        <Box onClick={() => onToggle(option.id)} sx={{
            cursor: 'pointer',
            border: selected ? `2px solid ${palette.brand[500]}` : `1px solid ${muiTheme.palette.hairline}`,
            backgroundColor: selected ? palette.brand[50] : 'background.paper',
            borderRadius: '10px', p: 2,
            display: 'flex', alignItems: 'flex-start', gap: 1.5,
            transition: 'all 0.2s',
            '&:hover': { borderColor: palette.brand[500] },
        }}>
            <Box sx={{
                width: 38, height: 38, flexShrink: 0,
                borderRadius: '8px',
                backgroundColor: selected ? palette.brand[500] : palette.brand[100],
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background-color 0.2s',
            }}>
                <Icon sx={{ color: selected ? 'white' : palette.brand[500], fontSize: 20 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={600} sx={{ color: selected ? palette.brand[500] : 'heading', lineHeight: 1.3 }}>
                    {option.label}
                </Typography>
                {option.description && (
                    <Typography variant="caption" sx={{ color: 'muted', lineHeight: 1.4 }}>
                        {option.description}
                    </Typography>
                )}
            </Box>
            {selected && <CheckCircleIcon sx={{ color: palette.brand[500], fontSize: 20, flexShrink: 0, mt: 0.25 }} />}
        </Box>
    );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function ProjectBuilder() {
    const [steps, setSteps] = useState<BuilderStep[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    const [activeStep, setActiveStep] = useState(0);
    const [selectedType, setSelectedType] = useState('');
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [groupSelections, setGroupSelections] = useState<Record<string, string>>({});
    const [form, setForm] = useState<ContactForm>({ name: '', email: '', phone: '', company: '', note: '', privacy: false });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [existingLead, setExistingLead] = useState(false);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API}/api/project-builder/steps`)
            .then(r => r.json())
            .then((data: unknown) => {
                if (Array.isArray(data)) {
                    setSteps(data as BuilderStep[]);
                } else {
                    setFetchError(true);
                }
                setLoading(false);
            })
            .catch(() => { setFetchError(true); setLoading(false); });
    }, []);

    const step1 = steps.find(s => s.step === 1);
    const step2 = steps.find(s => s.step === 2);
    const step3 = steps.find(s => s.step === 3);

    const filteredFeatures = (step2?.options ?? []).filter(
        o => o.active && (o.forProjectTypes.length === 0 || o.forProjectTypes.includes(selectedType)),
    );

    const step3Options = step3?.options ?? [];
    const groups = [...new Set(step3Options.map(o => o.group).filter(Boolean) as string[])];

    const canProceed = (): boolean => {
        if (activeStep === 0) return !!selectedType;
        if (activeStep === 1) return selectedFeatures.length > 0;
        if (activeStep === 2) return groups.every(g => !!groupSelections[g]);
        return false;
    };

    const handleTypeSelect = (id: string) => {
        if (selectedType !== id) setSelectedFeatures([]);
        setSelectedType(id);
    };

    const handleFeatureToggle = (id: string) => {
        setSelectedFeatures(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id],
        );
    };

    const handleGroupSelect = (group: string, id: string) => {
        setGroupSelections(prev => ({ ...prev, [group]: id }));
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};
        if (!form.name.trim()) errors.name = 'Name is required';
        if (!form.email.trim()) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Email is invalid';
        if (!form.privacy) errors.privacy = 'Please agree to continue';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const buildBriefPayload = () => ({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        source: 'itcoder-project-builder',
        note: form.note.trim() || undefined,
        projectBrief: {
            projectType: selectedType,
            features: selectedFeatures,
            scale: groupSelections['scale'] ?? '',
            timeline: groupSelections['timeline'] ?? '',
            readiness: groupSelections['readiness'] ?? '',
            company: form.company.trim() || undefined,
        },
    });

    const handleSubmit = async () => {
        if (!validateForm()) return;
        setSubmitting(true);
        setSubmitError('');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/leads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.NEXT_PUBLIC_LEADS_API_KEY ?? '',
                },
                body: JSON.stringify(buildBriefPayload()),
            });

            if (res.status === 409) {
                setExistingLead(true);
                return;
            }

            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? 'Submission failed');
            setSubmitted(true);
        } catch (err: unknown) {
            setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdate = async () => {
        setSubmitting(true);
        setSubmitError('');

        try {
            const payload = buildBriefPayload();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/leads/project-brief`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.NEXT_PUBLIC_LEADS_API_KEY ?? '',
                },
                body: JSON.stringify({
                    email: payload.email,
                    projectBrief: payload.projectBrief,
                    note: payload.note,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? 'Update failed');
            setExistingLead(false);
            setSubmitted(true);
        } catch (err: unknown) {
            setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    // ── Render ───────────────────────────────────────────────────────────────

    if (loading) {
        return (
            <section id="project-builder">
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress sx={{ color: palette.brand[500] }} />
                </Box>
            </section>
        );
    }

    if (fetchError) {
        return (
            <section id="project-builder">
                <Alert severity="error" sx={{ mt: 2 }}>
                    Failed to load the project builder. Please refresh the page.
                </Alert>
            </section>
        );
    }

    if (existingLead) {
        return (
            <section id="project-builder">
                <h2 className="titlePage">Build Your Project</h2>
                <Box sx={{
                    backgroundColor: 'background.paper', borderRadius: '16px',
                    boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
                    p: { xs: 3, sm: 5 }, maxWidth: 560, mx: 'auto', textAlign: 'center',
                }}>
                    <Box sx={{
                        width: 64, height: 64, borderRadius: '50%',
                        backgroundColor: palette.accent.tint, mx: 'auto', mb: 2,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Typography sx={{ fontSize: 32 }}>📋</Typography>
                    </Box>
                    <Typography variant="h6" fontWeight={800} sx={{ color: 'heading', mb: 1.5 }}>
                        We already have your inquiry
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'muted', lineHeight: 1.7, mb: 3 }}>
                        An inquiry from <strong>{form.email}</strong> is already on file.
                        Would you like to update it with the project description you just configured?
                    </Typography>

                    {submitError && <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>{submitError}</Alert>}

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            onClick={() => setExistingLead(false)}
                            variant="outlined"
                            sx={{
                                textTransform: 'none', borderColor: 'hairline', color: 'muted',
                                borderRadius: '8px', px: 3,
                                '&:hover': { borderColor: palette.brand[500], color: palette.brand[500] },
                            }}
                        >
                            Go back
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            variant="contained"
                            disabled={submitting}
                            endIcon={submitting
                                ? <CircularProgress size={16} sx={{ color: 'white' }} />
                                : <ArrowForwardIcon />}
                            sx={{
                                backgroundColor: palette.brand[500], color: 'white',
                                textTransform: 'none', fontWeight: 700,
                                borderRadius: '8px', px: 3,
                                '&:hover': { backgroundColor: palette.brand[600] },
                                '&.Mui-disabled': { backgroundColor: '#C5D0F5', color: 'white' },
                            }}
                        >
                            {submitting ? 'Updating…' : 'Yes, update my project'}
                        </Button>
                    </Box>
                </Box>
            </section>
        );
    }

    if (submitted) {
        return (
            <section id="project-builder">
                <h2 className="titlePage">Build Your Project</h2>
                <Box sx={{
                    textAlign: 'center', py: 6, px: 2,
                    backgroundColor: 'background.paper', borderRadius: '16px',
                    boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
                    maxWidth: 560, mx: 'auto',
                }}>
                    <TaskAltIcon sx={{ fontSize: 64, color: palette.brand[500], mb: 2 }} />
                    <Typography variant="h5" fontWeight={800} sx={{ color: 'heading', mb: 1.5 }}>
                        Got it, {form.name.split(' ')[0]}!
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'bodyText', lineHeight: 1.7, mb: 3 }}>
                        I&apos;ve received your project description and will get back to you
                        within 24 hours with a preliminary plan.
                    </Typography>
                    <Button
                        variant="contained" href="#cases" component="a"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            backgroundColor: palette.brand[500], color: 'white',
                            textTransform: 'none', fontWeight: 600,
                            borderRadius: '8px', px: 3, py: 1.25,
                            '&:hover': { backgroundColor: palette.brand[600] },
                        }}
                    >
                        See recent work
                    </Button>
                </Box>
            </section>
        );
    }

    return (
        <section id="project-builder">
            <h2 className="titlePage">Build Your Project</h2>
            <Box component="p" sx={{
                textAlign: 'center', color: 'bodyText', fontSize: '1.1rem',
                mt: 0.5, mb: 2, maxWidth: 600, mx: 'auto',
            }}>
                Tell me what you need — I&apos;ll handle the rest.
            </Box>

            {/* Step indicator */}
            <StepIndicator active={activeStep} />

            {/* Step content card */}
            <Box sx={{
                backgroundColor: 'background.paper', borderRadius: '16px',
                boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
                p: { xs: 2.5, sm: 4 }, mb: 2,
            }}>
                {/* Step title */}
                {[step1, step2, step3].filter(Boolean)[activeStep] && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" fontWeight={700} sx={{ color: 'heading' }}>
                            {[step1, step2, step3][activeStep]?.title}
                        </Typography>
                        {[step1, step2, step3][activeStep]?.subtitle && (
                            <Typography variant="body2" sx={{ color: 'muted', mt: 0.5 }}>
                                {[step1, step2, step3][activeStep]?.subtitle}
                            </Typography>
                        )}
                    </Box>
                )}

                {/* ── Step 0: Project type ── */}
                {activeStep === 0 && (
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
                        gap: 2,
                    }}>
                        {(step1?.options ?? []).filter(o => o.active).map(opt => (
                            <TypeCard key={opt.id} option={opt} selected={selectedType === opt.id} onSelect={handleTypeSelect} />
                        ))}
                    </Box>
                )}

                {/* ── Step 1: Features ── */}
                {activeStep === 1 && (
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                        gap: 1.5,
                    }}>
                        {filteredFeatures.map(opt => (
                            <FeatureCard
                                key={opt.id} option={opt}
                                selected={selectedFeatures.includes(opt.id)}
                                onToggle={handleFeatureToggle}
                            />
                        ))}
                    </Box>
                )}

                {/* ── Step 2: Scale / Timeline / Readiness ── */}
                {activeStep === 2 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                        {groups.map(groupId => {
                            const groupOptions = step3Options.filter(o => o.group === groupId && o.active);
                            return (
                                <Box key={groupId}>
                                    <Typography variant="subtitle1" fontWeight={700} sx={{ color: 'heading', mb: 1.5 }}>
                                        {GROUP_LABELS[groupId] ?? groupId}
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {groupOptions.map(opt => {
                                            const sel = groupSelections[groupId] === opt.id;
                                            return (
                                                <Chip
                                                    key={opt.id} label={opt.label}
                                                    onClick={() => handleGroupSelect(groupId, opt.id)}
                                                    sx={{
                                                        borderColor: sel ? palette.brand[500] : 'hairline',
                                                        border: '1.5px solid',
                                                        backgroundColor: sel ? palette.brand[500] : 'background.paper',
                                                        color: sel ? 'white' : 'bodyText',
                                                        fontWeight: sel ? 600 : 400,
                                                        fontSize: '0.85rem',
                                                        height: 38,
                                                        '&:hover': { borderColor: palette.brand[500], backgroundColor: sel ? palette.brand[600] : palette.brand[50] },
                                                        transition: 'all 0.2s',
                                                    }}
                                                />
                                            );
                                        })}
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                )}

                {/* ── Step 3: Contact form ── */}
                {activeStep === 3 && (
                    <Box>
                        <Typography variant="h6" fontWeight={700} sx={{ color: 'heading', mb: 0.5 }}>
                            How can I reach you?
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'muted', mb: 3 }}>
                            I&apos;ll get back to you within 24 hours.
                        </Typography>

                        {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth label="Full Name *" name="name"
                                    value={form.name} onChange={handleFormChange}
                                    error={!!formErrors.name} helperText={formErrors.name} size="small" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth label="Email *" name="email" type="email"
                                    value={form.email} onChange={handleFormChange}
                                    error={!!formErrors.email} helperText={formErrors.email} size="small" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth label="Phone" name="phone"
                                    value={form.phone} onChange={handleFormChange} size="small" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth label="Company" name="company"
                                    value={form.company} onChange={handleFormChange} size="small" />
                            </Grid>
                            <Grid size={12}>
                                <TextField fullWidth label="Tell me about your project (optional)" name="note"
                                    multiline rows={3} value={form.note} onChange={handleFormChange}
                                    inputProps={{ maxLength: 500 }}
                                    helperText={`${form.note.length}/500`} size="small" />
                            </Grid>
                            <Grid size={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox name="privacy" checked={form.privacy}
                                            onChange={handleFormChange} size="small"
                                            sx={{ color: formErrors.privacy ? 'error.main' : undefined }} />
                                    }
                                    label={
                                        <Typography variant="body2" color={formErrors.privacy ? 'error' : 'inherit'}>
                                            By submitting this form, you agree to our privacy policy.
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Box>

            {/* Navigation */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Button
                    onClick={() => setActiveStep(s => s - 1)}
                    disabled={activeStep === 0}
                    startIcon={<ArrowBackIcon />}
                    sx={{ textTransform: 'none', color: 'muted', '&:hover': { color: palette.brand[500] } }}
                >
                    Back
                </Button>

                {activeStep < 3 ? (
                    <Button
                        variant="contained"
                        onClick={() => setActiveStep(s => s + 1)}
                        disabled={!canProceed()}
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            backgroundColor: palette.brand[500], color: 'white',
                            textTransform: 'none', fontWeight: 600,
                            borderRadius: '8px', px: 3, py: 1.25,
                            '&:hover': { backgroundColor: palette.brand[600] },
                            '&.Mui-disabled': { backgroundColor: '#C5D0F5', color: 'white' },
                        }}
                    >
                        Next
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={submitting}
                        endIcon={submitting ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <ArrowForwardIcon />}
                        sx={{
                            backgroundColor: palette.accent[500], color: 'white',
                            textTransform: 'none', fontWeight: 700,
                            borderRadius: '8px', px: 3, py: 1.25,
                            '&:hover': { backgroundColor: palette.accent[600] },
                            '&.Mui-disabled': { backgroundColor: '#f5c6a0', color: 'white' },
                        }}
                    >
                        {submitting ? 'Sending…' : 'Submit My Project'}
                    </Button>
                )}
            </Box>
        </section>
    );
}
