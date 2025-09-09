import { ReactNode, JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type RichTextContent = Block[];

interface Block {
	type: string;
	children?: Block[];
	text?: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	code?: boolean;
	url?: string;
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	format?: 'ordered' | 'unordered';
	image?: {
		url: string;
		alternativeText?: string | null;
		width?: number;
		height?: number;
		formats?: Record<string, unknown>;
	};
}

interface CSSModuleClasses {
	[key: string]: string;
}

interface RichTextRendererProps {
	content: RichTextContent;
	styles?: CSSModuleClasses;
	classNames?: {
		paragraph?: string;
		heading1?: string;
		heading2?: string;
		heading3?: string;
		heading4?: string;
		heading5?: string;
		heading6?: string;
		list?: string;
		listItem?: string;
		orderedList?: string;
		unorderedList?: string;
		image?: string;
		link?: string;
		bold?: string;
		italic?: string;
		underline?: string;
		code?: string;
		strikethrough?: string;
		hr?: string;
		blockquote?: string;
	};
	imageSizes?: string;
}

const isInternalLink = (url: string): boolean => {
	if (!url) return false;
	return url.startsWith('/') && !url.startsWith('//');
};

const getClassName = (
	styles?: CSSModuleClasses,
	regularClassName?: string,
	styleKey?: string
): string | undefined => {
	if (styles && styleKey && styles[styleKey]) {
		return styles[styleKey];
	}
	return regularClassName;
};

const renderTextNode = (
	node: Block,
	index: number,
	styles?: CSSModuleClasses,
	classNames?: RichTextRendererProps['classNames']
): ReactNode => {
	if (!node.text) return null;

	let content: ReactNode = node.text
		.split('\n')
		.reduce((acc, part, partIndex, array) => {
			if (partIndex > 0 && (part !== '' || array[partIndex - 1] !== '')) {
				acc.push(<br key={`br-${index}-${partIndex}`} />);
			}
			if (part !== '') acc.push(part);
			return acc;
		}, [] as ReactNode[]);

	if (node.bold) {
		content = (
			<strong
				key={`bold-${index}`}
				className={getClassName(styles, classNames?.bold, 'bold')}
			>
				{content}
			</strong>
		);
	}

	if (node.italic) {
		content = (
			<em
				key={`italic-${index}`}
				className={getClassName(styles, classNames?.italic, 'italic')}
			>
				{content}
			</em>
		);
	}

	if (node.underline) {
		content = (
			<u
				key={`underline-${index}`}
				className={getClassName(styles, classNames?.underline, 'underline')}
			>
				{content}
			</u>
		);
	}

	if (node.strikethrough) {
		content = (
			<s
				key={`strikethrough-${index}`}
				className={getClassName(
					styles,
					classNames?.strikethrough,
					'strikethrough'
				)}
			>
				{content}
			</s>
		);
	}

	if (node.code) {
		content = (
			<code
				key={`code-${index}`}
				className={getClassName(styles, classNames?.code, 'code')}
			>
				{content}
			</code>
		);
	}

	return content;
};

const renderBlockChildren = (
	block: Block,
	styles?: CSSModuleClasses,
	classNames?: RichTextRendererProps['classNames']
): ReactNode => {
	if (!block.children || !Array.isArray(block.children)) {
		return null;
	}

	return block.children.map((child, index) => {
		if (child.type === 'text') {
			return renderTextNode(child, index, styles, classNames);
		}

		if (child.type === 'link') {
			const linkClassName = getClassName(styles, classNames?.link, 'link');

			if (isInternalLink(child.url!)) {
				return (
					<Link
						key={`link-${index}`}
						href={child.url!}
						className={linkClassName}
					>
						{child.children?.map((linkChild, linkChildIndex) =>
							renderTextNode(linkChild, linkChildIndex, styles, classNames)
						)}
					</Link>
				);
			}

			return (
				<a
					key={`link-${index}`}
					href={child.url!}
					target='_blank'
					rel='noopener noreferrer'
					className={linkClassName}
				>
					{child.children?.map((linkChild, linkChildIndex) =>
						renderTextNode(linkChild, linkChildIndex, styles, classNames)
					)}
				</a>
			);
		}

		return renderBlock(child, `child-${index}`, styles, classNames);
	});
};

const renderBlock = (
	block: Block,
	key: string,
	styles?: CSSModuleClasses,
	classNames?: RichTextRendererProps['classNames'],
	imageSizes?: string | undefined
): ReactNode => {
	switch (block.type) {
		case 'paragraph':
			// Check if paragraph is empty
			if (
				!block.children ||
				block.children.length === 0 ||
				(block.children.length === 1 &&
					block.children[0].type === 'text' &&
					(!block.children[0].text || block.children[0].text.trim() === ''))
			) {
				return <br key={key} />;
			}
			return (
				<p
					key={key}
					className={getClassName(styles, classNames?.paragraph, 'paragraph')}
				>
					{renderBlockChildren(block, styles, classNames)}
				</p>
			);

		case 'heading':
			const level = block.level || 1;
			const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
			const headingClassName = getClassName(
				styles,
				classNames?.[`heading${level}` as keyof typeof classNames],
				`heading${level}`
			);

			return (
				<HeadingTag key={key} className={headingClassName}>
					{renderBlockChildren(block, styles, classNames)}
				</HeadingTag>
			);

		case 'list':
			if (block.format === 'ordered') {
				const orderedListClass = `${getClassName(
					styles,
					classNames?.list,
					'list'
				)} ${getClassName(styles, classNames?.orderedList, 'orderedList')}`;

				return (
					<ol key={key} className={orderedListClass}>
						{block.children?.map((item, itemIndex) => (
							<li
								key={`item-${itemIndex}`}
								className={getClassName(
									styles,
									classNames?.listItem,
									'listItem'
								)}
							>
								{renderBlockChildren(item, styles, classNames)}
							</li>
						))}
					</ol>
				);
			}

			const unorderedListClass = `${getClassName(
				styles,
				classNames?.list,
				'list'
			)} ${getClassName(styles, classNames?.unorderedList, 'unorderedList')}`;

			return (
				<ul key={key} className={unorderedListClass}>
					{block.children?.map((item, itemIndex) => (
						<li
							key={`item-${itemIndex}`}
							className={getClassName(styles, classNames?.listItem, 'listItem')}
						>
							{renderBlockChildren(item, styles, classNames)}
						</li>
					))}
				</ul>
			);

		case 'image':
			if (!block.image) return null;

			const { url, alternativeText } = block.image;
			return (
				<Image
					key={key}
					src={url}
					alt={alternativeText || ''}
					// width={width || 800}
					// height={height || 600}
					className={getClassName(styles, classNames?.image, 'image')}
					sizes={imageSizes}
				/>
			);

		case 'quote':
			return (
				<blockquote
					key={key}
					className={getClassName(styles, classNames?.blockquote, 'blockquote')}
				>
					{renderBlockChildren(block, styles, classNames)}
				</blockquote>
			);

		case 'code':
			return (
				<pre key={key} className={getClassName(styles, undefined, 'pre')}>
					<code className={getClassName(styles, undefined, 'codeBlock')}>
						{renderBlockChildren(block, styles, classNames)}
					</code>
				</pre>
			);

		case 'link':
			const linkClassName = getClassName(styles, classNames?.link, 'link');
			const currentTitle =
				block?.children?.find((child) => child.type === 'text')?.text ?? '';
			if (isInternalLink(block.url!)) {
				return (
					<Link
						key={key}
						href={block.url!}
						className={linkClassName}
						title={currentTitle}
					>
						{renderBlockChildren(block, styles, classNames)}
					</Link>
				);
			}

			return (
				<a
					key={key}
					href={block.url!}
					target='_blank'
					rel='noopener noreferrer'
					className={linkClassName}
				>
					{renderBlockChildren(block, styles, classNames)}
				</a>
			);

		case 'thematic-break':
			return (
				<hr key={key} className={getClassName(styles, classNames?.hr, 'hr')} />
			);

		default:
			if (block.text) {
				return renderTextNode(
					block,
					parseInt(key.split('-')[1] || '0'),
					styles,
					classNames
				);
			}
			return null;
	}
};

const RichTextRenderer = ({
	content,
	styles,
	classNames,
	imageSizes,
}: RichTextRendererProps) => {
	if (!content || !Array.isArray(content)) {
		return null;
	}

	return (
		<>
			{content.map((block, index) =>
				renderBlock(block, `block-${index}`, styles, classNames, imageSizes)
			)}
		</>
	);
};

export default RichTextRenderer;
