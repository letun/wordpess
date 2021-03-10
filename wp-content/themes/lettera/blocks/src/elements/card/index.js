import { withSelect } from '@wordpress/data';
import { MediaUpload, RichText, BlockControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import classnames from 'classnames';

import Column from '../../layout/column';

import ToolbarButtonLinkHref from '../../controls/toolbarButtonLinkHref';
import getInspectorControls from '../../controls/getInspectorControls';

import LetteraConfig from '../../global/config';

import { ReactComponent as elementIcon } from '../../../../svg/components/features.svg';

export const name = 'lettera/card';

export const settings = {
	title: 'Card',
	icon: elementIcon,
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
	attributes: {
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		mediaAlt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
			default: 'Lettera: Card element',
		},
		mediaWidth: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'width',
			default: 223,
		},
		mediaHeight: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'height',
			default: 142,
		},
		content: {
			type: 'string',
			source: 'text',
			selector: 'p.card__text',
		},
		linkContent: {
			type: 'string',
			source: 'text',
			default: 'Learn more…',
			selector: 'p.card__link span',
		},
		linkHref: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
			default: 'https://www.letun.dev/lettera',
		},
		linkTitle: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'title',
		},
		linkTarget: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'target',
		},
		linkRel: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'rel',
			defauld: 'noopener',
		},
		placeholder: {
			type: 'string',
			default: 'Card text…',
		},
	},
	edit: withSelect( ( select, blockData ) => {
		const parentClientId = select(
			'core/block-editor'
		).getBlockHierarchyRootClientId( blockData.clientId );
		return {
			innerBlocks: select( 'core/block-editor' ).getBlocks(
				blockData.clientId
			),
			parentClientId,
			clientId: blockData.clientId,
			parentBlockAttributes: select(
				'core/block-editor'
			).getBlockAttributes( parentClientId ),
		};
	} )( ( props ) => {
		const {
			attributes,
			setAttributes,
			clientId,
			parentClientId,
			parentBlockAttributes,
			className,
		} = props;

		const {
			mediaID,
			mediaURL,
			content,
			placeholder,
			linkHref,
			linkTarget,
			textAlign,
			linkContent,
		} = attributes;

		wp.element.useEffect( () => {
			if (
				parentBlockAttributes.blockAttributes &&
				parentBlockAttributes.blockAttributes.btnAlign
			) {
				if (
					parentBlockAttributes.blockAttributes.btnAlign === 'center'
				) {
					setAttributes( { textAlign: 'center' } );
				}
			}
		} );

		const inspectorControls = getInspectorControls(
			parentClientId,
			parentBlockAttributes
		);

		const toolbar = (
			<>
				<ToolbarButtonLinkHref
					linkHref={ linkHref }
					linkTarget={ linkTarget }
					onChange={ ( value ) =>
						setAttributes( { linkHref: value.url } )
					}
				/>
			</>
		);

		return (
			<>
				<BlockControls>
					<Toolbar
						className={
							'components-toolbar-group--no-right-border'
						}
					>
						<ToolbarButton
							icon={ 'trash' }
							title={ 'Remove block' }
							onClick={ () =>
								wp.data
									.dispatch( 'core/block-editor' )
									.removeBlock( clientId )
							}
						/>
					</Toolbar>
					{ toolbar }
				</BlockControls>
				{ inspectorControls }
				<Column
					className={ classnames( className, 'card' ) }
					textAlign={ textAlign }
				>
					<MediaUpload
						onSelect={ ( media ) => {
							const width = 223;
							const height = Math.ceil(
								( width / media.width ) * media.height
							);
							setAttributes( {
								mediaURL: media.url,
								mediaID: media.id,
								mediaAlt: media.alt ? media.alt : media.title,
								mediaWidth: width,
								mediaHeight: height,
							} );
						} }
						allowedTypes={ [ 'image' ] }
						value={ mediaID }
						render={ ( { open } ) => (
							<img
								alt={ '' }
								src={
									! mediaID
										? '/wp-content/themes/lettera/images/components/hero.png'
										: mediaURL
								}
								className={ 'card__image' }
								onClick={ open }
							/>
						) }
					/>
					<RichText
						tagName={ 'p' }
						className={ 'card__text' }
						identifier={ 'content' }
						onChange={ ( value ) =>
							setAttributes( { content: value } )
						}
						value={ content }
						placeholder={ placeholder }
						allowedFormats={ [] }
						unstableOnSplit={ () => false }
					/>
					<p
						className={ classnames(
							'card__link',
							'card__link--admin'
						) }
					>
						<RichText
							tagName={ 'span' }
							onChange={ ( value ) =>
								setAttributes( { linkContent: value } )
							}
							value={ linkContent }
							placeholder={ 'Learn more' }
							allowedFormats={ [] }
							unstableOnSplit={ () => false }
							multiline={ false }
						/>
						&nbsp;&rarr;
					</p>
				</Column>
			</>
		);
	} ),
	save: ( props ) => {
		const { attributes } = props;

		const {
			content,
			linkTarget,
			linkRel,
			linkTitle,
			linkHref,
			linkContent,
			mediaURL,
			mediaWidth,
			mediaHeight,
			mediaAlt,
		} = attributes;

		return (
			content && (
				<Column>
					<a
						href={ linkHref }
						target={ linkTarget }
						rel={ linkRel }
						title={ linkTitle }
						className={ 'card' }
					>
						<img
							src={
								! mediaURL
									? '/wp-content/themes/lettera/images/components/hero.png'
									: mediaURL
							}
							className={ 'card__image' }
							alt={ mediaAlt }
							width={ mediaWidth }
							height={ mediaHeight }
						/>
						<RichText.Content
							tagName={ 'p' }
							value={ content }
							className={ 'card__text' }
						/>
						<p className={ classnames( 'card__link', 'link' ) }>
							<span>{ linkContent }</span>&nbsp;&rarr;
						</p>
					</a>
				</Column>
			)
		);
	},
};
