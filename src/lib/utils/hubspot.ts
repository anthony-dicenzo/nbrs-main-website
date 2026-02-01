/**
 * HubSpot Forms API v3 Integration
 *
 * Submits form data to HubSpot using the unauthenticated Forms API endpoint.
 * No API keys needed - just Portal ID and Form GUID.
 *
 * @see https://developers.hubspot.com/docs/api/marketing/forms
 */

// HubSpot configuration
// These should be set as environment variables in production
// For static sites, use PUBLIC_ prefix in .env file
const HUBSPOT_PORTAL_ID = import.meta.env.PUBLIC_HUBSPOT_PORTAL_ID || '';
const HUBSPOT_PARTNER_FORM_ID = import.meta.env.PUBLIC_HUBSPOT_PARTNER_FORM_ID || '';
const HUBSPOT_WAITLIST_FORM_ID = import.meta.env.PUBLIC_HUBSPOT_WAITLIST_FORM_ID || '';

const HUBSPOT_API_URL = 'https://api.hsforms.com/submissions/v3/integration/submit';

/**
 * Field mapping for HubSpot submission
 * Maps form field names to HubSpot property names
 */
interface HubSpotField {
	name: string;
	value: string;
}

interface HubSpotContext {
	hutk?: string;
	pageUri: string;
	pageName: string;
}

interface HubSpotSubmission {
	fields: HubSpotField[];
	context: HubSpotContext;
}

/**
 * Get the HubSpot tracking cookie (hutk) if available
 * This associates the submission with the visitor's session
 */
function getHubSpotCookie(): string | undefined {
	if (typeof document === 'undefined') return undefined;

	const cookies = document.cookie.split(';');
	for (const cookie of cookies) {
		const [name, value] = cookie.trim().split('=');
		if (name === 'hubspotutk') {
			return value;
		}
	}
	return undefined;
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Validate phone format (basic validation)
 */
function isValidPhone(phone: string): boolean {
	// Remove common formatting characters and check for reasonable length
	const cleaned = phone.replace(/[\s\-\(\)\+\.]/g, '');
	return cleaned.length >= 10 && /^\d+$/.test(cleaned);
}

/**
 * Form validation errors
 */
export interface ValidationErrors {
	[key: string]: string;
}

/**
 * Submission result
 */
export interface SubmissionResult {
	success: boolean;
	errors?: ValidationErrors;
	message?: string;
}

/**
 * Partner form data structure
 */
export interface PartnerFormData {
	name: string;
	email: string;
	organization?: string;
	partnerType: string;
	message?: string;
}

/**
 * Waitlist form data structure
 */
export interface WaitlistFormData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	householdSize: string;
	neighbourhood: string;
	unitType: string;
}

/**
 * Validate partner form data
 */
export function validatePartnerForm(data: PartnerFormData): ValidationErrors {
	const errors: ValidationErrors = {};

	if (!data.name || data.name.trim().length < 2) {
		errors.name = 'Please enter your name';
	}

	if (!data.email || !isValidEmail(data.email)) {
		errors.email = 'Please enter a valid email address';
	}

	if (!data.partnerType) {
		errors.partnerType = 'Please select a partnership type';
	}

	return errors;
}

/**
 * Validate waitlist form data
 */
export function validateWaitlistForm(data: WaitlistFormData): ValidationErrors {
	const errors: ValidationErrors = {};

	if (!data.firstName || data.firstName.trim().length < 1) {
		errors.firstName = 'Please enter your first name';
	}

	if (!data.lastName || data.lastName.trim().length < 1) {
		errors.lastName = 'Please enter your last name';
	}

	if (!data.email || !isValidEmail(data.email)) {
		errors.email = 'Please enter a valid email address';
	}

	if (!data.phone || !isValidPhone(data.phone)) {
		errors.phone = 'Please enter a valid phone number';
	}

	if (!data.householdSize) {
		errors.householdSize = 'Please select your household size';
	}

	if (!data.neighbourhood) {
		errors.neighbourhood = 'Please select your neighbourhood';
	}

	if (!data.unitType) {
		errors.unitType = 'Please select your preferred unit type';
	}

	return errors;
}

/**
 * Submit form data to HubSpot
 */
async function submitToHubSpot(
	portalId: string,
	formId: string,
	fields: HubSpotField[],
	pageName: string
): Promise<Response> {
	const hutk = getHubSpotCookie();

	const submission: HubSpotSubmission = {
		fields,
		context: {
			hutk,
			pageUri: typeof window !== 'undefined' ? window.location.href : '',
			pageName
		}
	};

	const response = await fetch(`${HUBSPOT_API_URL}/${portalId}/${formId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(submission)
	});

	return response;
}

/**
 * Submit partner inquiry form to HubSpot
 */
export async function submitPartnerForm(data: PartnerFormData): Promise<SubmissionResult> {
	// Validate first
	const errors = validatePartnerForm(data);
	if (Object.keys(errors).length > 0) {
		return { success: false, errors };
	}

	// Check for HubSpot configuration
	if (!HUBSPOT_PORTAL_ID || !HUBSPOT_PARTNER_FORM_ID) {
		console.warn('HubSpot not configured - form submission simulated');
		// In development/demo mode, simulate success
		await new Promise(resolve => setTimeout(resolve, 800));
		return { success: true, message: 'Form submitted (demo mode)' };
	}

	try {
		// Map form fields to HubSpot property names
		// Note: These property names must match your HubSpot form configuration
		const fields: HubSpotField[] = [
			{ name: 'firstname', value: data.name.split(' ')[0] || data.name },
			{ name: 'lastname', value: data.name.split(' ').slice(1).join(' ') || '' },
			{ name: 'email', value: data.email },
			{ name: 'company', value: data.organization || '' },
			{ name: 'partner_type', value: data.partnerType },
			{ name: 'message', value: data.message || '' }
		];

		const response = await submitToHubSpot(
			HUBSPOT_PORTAL_ID,
			HUBSPOT_PARTNER_FORM_ID,
			fields,
			'Partner Inquiry'
		);

		if (response.ok) {
			return { success: true, message: 'Form submitted successfully' };
		} else {
			const errorData = await response.json().catch(() => ({}));
			console.error('HubSpot submission error:', errorData);
			return {
				success: false,
				message: 'Failed to submit form. Please try again or email us directly.'
			};
		}
	} catch (error) {
		console.error('HubSpot submission error:', error);
		return {
			success: false,
			message: 'Network error. Please check your connection and try again.'
		};
	}
}

/**
 * Submit waitlist form to HubSpot
 */
export async function submitWaitlistForm(data: WaitlistFormData): Promise<SubmissionResult> {
	// Validate first
	const errors = validateWaitlistForm(data);
	if (Object.keys(errors).length > 0) {
		return { success: false, errors };
	}

	// Check for HubSpot configuration
	if (!HUBSPOT_PORTAL_ID || !HUBSPOT_WAITLIST_FORM_ID) {
		console.warn('HubSpot not configured - form submission simulated');
		// In development/demo mode, simulate success
		await new Promise(resolve => setTimeout(resolve, 800));
		return { success: true, message: 'Form submitted (demo mode)' };
	}

	try {
		// Map form fields to HubSpot property names
		// Note: These property names must match your HubSpot form configuration
		const fields: HubSpotField[] = [
			{ name: 'firstname', value: data.firstName },
			{ name: 'lastname', value: data.lastName },
			{ name: 'email', value: data.email },
			{ name: 'phone', value: data.phone },
			{ name: 'household_size', value: data.householdSize },
			{ name: 'neighbourhood', value: data.neighbourhood },
			{ name: 'unit_type_preference', value: data.unitType }
		];

		const response = await submitToHubSpot(
			HUBSPOT_PORTAL_ID,
			HUBSPOT_WAITLIST_FORM_ID,
			fields,
			'FAMILY 1 Waitlist'
		);

		if (response.ok) {
			return { success: true, message: 'Form submitted successfully' };
		} else {
			const errorData = await response.json().catch(() => ({}));
			console.error('HubSpot submission error:', errorData);
			return {
				success: false,
				message: 'Failed to submit form. Please try again or email us directly.'
			};
		}
	} catch (error) {
		console.error('HubSpot submission error:', error);
		return {
			success: false,
			message: 'Network error. Please check your connection and try again.'
		};
	}
}
