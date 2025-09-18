import styles from './socials.module.scss';
import {
	Telegram,
	Whatsapp,
	Instagram,
	Phone,
	Mail,
} from '@/components/icons/Socials';
import { LinkIcon } from '../linkIcon/LinkIcon';
const icons = [
	{
		title: 'Telegram',
		href: 'https://t.me/ligninby',
		icon: <Telegram />,
	},
	{
		title: 'Whatsaap',
		href: 'https://wa.me/375297290243',
		icon: <Whatsapp />,
	},
	{
		title: 'Instagram',
		href: 'https://instagram.com/lignin.by?igshid=YmMyMTA2M2Y=',
		icon: <Instagram />,
	},
	{
		title: 'Phone',
		href: 'tel:+375297290243',
		icon: <Phone />,
	},
	{
		title: 'Mail',
		href: 'mailto:alex.bizby@gmail.com',
		icon: <Mail />,
	},
];
export const Socials = () => {
	return (
		<div className={styles.panel}>
			{icons.map((iconEl) => {
				return (
					<LinkIcon key={iconEl.title} href={iconEl.href}>
						{iconEl.icon}
					</LinkIcon>
				);
			})}
		</div>
	);
};
