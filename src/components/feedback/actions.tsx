'use server';
import { getTranslations } from 'next-intl/server';
// import { feedbackSchema } from './schema';
const badRequest = 400;

// const initErrors = {
//   email: '',
//   phone: '',
//   name: '',
//   message: ''
// }
type ErrorMessages = {
	email: string;
	phone: string;
	name: string;
	message: string;
};
type ValidationBody = {
	errors: ErrorMessages;
	errorFields: string[];
};
export async function submitFeedback(formData: FormData) {
	const tStatuses = await getTranslations('feedback.statuses');

	const rawPhone = formData.get('phone')?.toString() ?? '';
	const cleanedPhone = (rawPhone.match(/[+0-9]/g) || []).join('');
	const data = {
		email: formData.get('email')?.toString() ?? '',
		phone: cleanedPhone,
		name: formData.get('name')?.toString() ?? '',
		message: formData.get('message')?.toString() ?? '',
	};

	try {
		const response: Response = await fetch('http://localhost:1337/api/form', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		if (response.ok) {
			return {
				success: true,
				message: tStatuses('success'),
			};
		} else if (response.status === badRequest) {
			const { errors, errorFields }: ValidationBody = await response.json();
			return {
				success: false,
				errors: errors,
				errorFields: errorFields,
				message: tStatuses('validationError'),
				formData: data,
			};
		} else {
			return {
				success: false,
				message: `${tStatuses('sendingNotificationError')} - ${
					response.status
				}`,
			};
		}
	} catch (err) {
		console.error(err);
		return {
			success: false,
			message: tStatuses('networkError'),
		};
	}
}
