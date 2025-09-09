// import { z } from 'zod';

// export const feedbackSchema = z.object({
// 	email: z
// 		.string()
// 		.nonempty('Email не может быть пустым')
// 		.email('Введите корректный email'),
// 	name: z
// 		.string()
// 		.min(3, 'Имя должно содержать минимум 3 символа')
// 		.max(100, 'Имя не может быть длиннее 100 символов')
// 		.refine(
// 			(value) => (value.match(/\s/g) || []).length <= 2,
// 			'Имя не может содержать больше двух пробелов'
// 		),

// 	// Телефон: российский формат (например, +7 (XXX) XXX-XX-XX или 8XXXXXXXXXX)
// 	phone: z
// 		.string()
// 		.regex(
// 			/^(?:\+7|8)\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/,
// 			'Телефон должен соответствовать российскому формату (например, +7 (XXX) XXX-XX-XX)'
// 		),

// 	message: z
// 		.string()
// 		.min(10, 'Сообщение должно содержать минимум 10 символов')
// 		.max(1000, 'Сообщение не может быть длиннее 1000 символов'),
// });

// export type FeedbackSchema = z.infer<typeof feedbackSchema>;
