'use client';
import {Grid, Link, TextField, Button, Checkbox, FormControlLabel, Box, Typography, Alert} from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useState, FormEvent, ChangeEvent } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  agreeToPrivacy: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  agreeToPrivacy?: string;
}

export default function Contact() {
	const [formData, setFormData] = useState<FormData>({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		message: '',
		agreeToPrivacy: false
	});
	const [formErrors, setFormErrors] = useState<FormErrors>({});
	const [submitStatus, setSubmitStatus] = useState({ success: false, error: false });

	// Check if form is valid (all fields filled and checkbox checked)
	const isFormValid = (): boolean => {
		return (
			formData.firstName.trim() !== '' &&
			formData.lastName.trim() !== '' &&
			formData.email.trim() !== '' &&
			/\S+@\S+\.\S+/.test(formData.email) &&
			formData.message.trim() !== '' &&
			formData.agreeToPrivacy
		);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value
		});
	};

	const validateForm = (): boolean => {
		const errors: FormErrors = {};
		if (!formData.firstName.trim()) errors.firstName = 'First name is required';
		if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
		if (!formData.email.trim()) errors.email = 'Email is required';
		else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
		// Phone is optional, no validation required
		if (!formData.message.trim()) errors.message = 'Message is required';
		if (!formData.agreeToPrivacy) errors.agreeToPrivacy = 'You must agree to the privacy policy';

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateForm()) return;

		try {
			// Send the form data to our API endpoint
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to send email');
			}

			console.log('Email sent successfully');
			setSubmitStatus({ success: true, error: false });
			setFormData({
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				message: '',
				agreeToPrivacy: false
			});
		} catch (error) {
			console.error('Error submitting form:', error);
			setSubmitStatus({ success: false, error: true });
		}
	};

	return (
		<div id="contact">
			<h1 className={'titlePage'}>Contact</h1>
			<Grid container spacing={0} columns={12} style={{
				borderRadius: '20px',
				display: 'flex',
				flexDirection: 'row',
				boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)',
				backgroundColor: 'white',
			}}>
				<Grid  id='column1' size={{xl:4, md:4, sm:12}} style={{
					borderRadius: '20px',
					padding: '2rem',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'left',
					backgroundColor: '#436AE5',
					fontWeight: 600,
					color: 'white',
				}}>
					<div style={{fontSize: '1.3rem', fontWeight:800, marginTop: '20px', textAlign: 'center'}}>
						Contact
					</div>
					<div style={{fontSize: '0.8rem', marginTop: '20px'}}>
						Please contact me and I will answer all your questions as soon as possible.
					</div>
					<div style={{fontSize: '0.8rem', marginTop: '2rem', alignSelf: 'flex-start', width: '100%'}}>
						<Link
							href="https://wa.me/15879689089"
							target="_blank"
							rel="noopener noreferrer"
							className="footer-link"
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-start',
								color: 'inherit'
							}}
						>
							<WhatsAppIcon style={{ marginRight: '5px' }} />
							5879689089
						</Link>
					</div>
					<div style={{fontSize: '0.8rem', marginTop: '2rem', alignSelf: 'flex-start', width: '100%'}}>
						<Link
							href="mailto:support@itcoder.ca"
							target="_blank"
							rel="noopener noreferrer"
							className="footer-link"
							style={{
								display: 'flex',
								alignItems: 'center',
								color: 'inherit'
							}}
						>
							<EmailIcon style={{ marginRight: '5px' }} />
							support@itcoder.ca
						</Link>
					</div>
					<div style={{fontSize: '0.8rem', marginTop: '2rem', alignSelf: 'flex-start', width: '100%'}}>
						<Link
							href="https://www.facebook.com/61575213251739"
							target="_blank"
							rel="noopener noreferrer"
							className="footer-link"
							style={{
								display: 'flex',
								alignItems: 'center',
								color: 'inherit'
							}}
						>
							<FacebookIcon style={{ marginRight: '5px' }} />
							itcoder
						</Link>
					</div>
				</Grid>
				<Grid id='column2' size={{xl:8, md:8, sm:12}} style={{
					borderRadius: '20px',
					padding: '2rem',
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: 'white',
				}}>
					<Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
						{submitStatus.success && (
							<Alert severity="success" sx={{ mb: 2 }}>
								Your message has been sent successfully!
							</Alert>
						)}
						{submitStatus.error && (
							<Alert severity="error" sx={{ mb: 2 }}>
								There was an error sending your message. Please try again.
							</Alert>
						)}

						<Grid container spacing={2}>
							{/* First row: First Name and Last Name */}
							<Grid size={{xl:6, sm:12}}>
								<TextField
									fullWidth
									margin="normal"
									label="First Name *"
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									error={!!formErrors.firstName}
									helperText={formErrors.firstName}
									size="small"
								/>
							</Grid>
							<Grid size={{xl:6, sm:12}}>
								<TextField
									fullWidth
									margin="normal"
									label="Last Name *"
									name="lastName"
									value={formData.lastName}
									onChange={handleChange}
									error={!!formErrors.lastName}
									helperText={formErrors.lastName}
									size="small"
								/>
							</Grid>

							{/* Second row: Email and Phone */}
							<Grid size={{xl:6, sm:12}}>
								<TextField
									fullWidth
									margin="normal"
									label="Email *"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleChange}
									error={!!formErrors.email}
									helperText={formErrors.email}
									size="small"
								/>
							</Grid>
							<Grid size={{xl:6, sm:12}}>
								<TextField
									fullWidth
									margin="normal"
									label="Phone"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									error={!!formErrors.phone}
									helperText={formErrors.phone}
									size="small"
								/>
							</Grid>

							{/* Third row: Message (full width) */}
							<Grid size={{xl:12, sm:12}}>
								<TextField
									fullWidth
									margin="normal"
									label="Message *"
									name="message"
									multiline
									rows={4}
									value={formData.message}
									onChange={handleChange}
									error={!!formErrors.message}
									helperText={formErrors.message ? formErrors.message : `${formData.message.length}/500 characters`}
									inputProps={{ maxLength: 500 }}
								/>
							</Grid>

							{/* Fourth row: Checkbox and Button */}
							<Grid size={{xl:8}} container alignItems="center">
								<Grid size={{xl:8}}>
									<FormControlLabel
										control={
											<Checkbox
												name="agreeToPrivacy"
												checked={formData.agreeToPrivacy}
												onChange={handleChange}
												color="primary"
											/>
										}
										label={
											<Typography variant="body2" color={formErrors.agreeToPrivacy ? "error" : "inherit"}>
												By submitting this form, you agree to our privacy policy.
											</Typography>
										}
									/>
									{formErrors.agreeToPrivacy && (
										<Typography variant="caption" color="error" display="block">
											{formErrors.agreeToPrivacy}
										</Typography>
									)}
								</Grid>
								<Grid size={{xl:4}}>
									<Button
										type="submit"
										variant="contained"
										fullWidth
										disabled={!isFormValid()}
										sx={{
											backgroundColor: '#F97316',
											'&:hover': {
												backgroundColor: '#e86206',
											},
											'&.Mui-disabled': {
												backgroundColor: '#ccc',
												color: '#666'
											}
										}}
									>
										Send message
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</div>
	)
}
