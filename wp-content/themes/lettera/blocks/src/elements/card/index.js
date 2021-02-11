import { withSelect } from '@wordpress/data';
import { MediaUpload, RichText, BlockControls } from '@wordpress/block-editor';
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
		content: {
			type: 'string',
			source: 'text',
			default: 'Card N',
			selector: 'p.card__text',
		},
		linkContent: {
			type: 'string',
			source: 'text',
			default: 'Learn more',
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
				<BlockControls>{ toolbar }</BlockControls>
				{ inspectorControls }
				<Column
					className={ classnames( className ) }
					textAlign={ textAlign }
				>
					<MediaUpload
						onSelect={ ( media ) => {
							setAttributes( {
								mediaURL: media.url,
								mediaID: media.id,
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
								className={ 'calypso-promo__image' }
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
					<p className={ 'card__link' }>
						<span>{ linkContent }</span>&nbsp;&rarr;
					</p>
					<div className={ 'card__link--admin' }>
						<input
							type="text"
							placeholder={ 'Learn more' }
							value={ linkContent }
							onChange={ ( e ) =>
								setAttributes( { linkContent: e.target.value } )
							}
						/>
						&nbsp;&rarr;
					</div>
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
		} = attributes;

		return (
			content && (
				<Column>
					<a
						href={ linkHref }
						target={ linkTarget }
						rel={ linkRel }
						title={ linkTitle }
					>
						{ mediaURL ? (
							<img
								className="card__image"
								src={ mediaURL }
								alt="Promo"
							/>
						) : (
							<img
								src="/wp-content/themes/lettera/images/components/hero.png"
								alt={ 'Promo' }
								className={ 'card__image' }
							/>
						) }
						<RichText.Content
							tagName={ 'p' }
							value={ content }
							className={ 'card__text' }
						/>
						<p className={ 'card__link' }>
							<span>{ linkContent }</span>&nbsp;&rarr;
						</p>
					</a>
				</Column>
			)
		);
	},
};
