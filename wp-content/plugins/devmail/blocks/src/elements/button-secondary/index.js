import { withSelect } from '@wordpress/data';
import { compose, withState } from '@wordpress/compose';
import {
	RichText,
	BlockControls,
	getColorObjectByColorValue,
} from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import classnames from 'classnames';

import ButtonSecondary from '../../layout/button-secondary';

import ToolbarButtonLinkHref from '../../controls/toolbarButtonLinkHref';
import ToolbarButtonColor from '../../controls/toolbarButtonColor';
import getInspectorControls from '../../controls/getInspectorControls';
import LetteraConfig from '../../global/config';
import { ReactComponent as elementIcon } from '../../../../svg/elements/button.svg';
import { ReactComponent as primaryButtonIcon } from '../../../../svg/buttons/primaryButton.svg';
import { ReactComponent as secondaryButtonIcon } from '../../../../svg/buttons/secondaryButton.svg';

export const name = 'devmail/button-secondary';

export const settings = {
	title: 'Secondary Button',
	icon: elementIcon,
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'span',
		},
		linkHref: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
			default: 'https://www.letun.dev/',
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
			default: 'Button text…',
		},
		buttonColor: {
			type: 'string',
			default: null, //black, yellow, blue, green
		},
		buttonBlockClientId: {
			type: 'string',
			default: null,
		},
		textAlign: {
			type: 'string',
			default: 'left',
		},
		isTextBellowButton: {
			type: 'boolean',
			default: false,
		},
		textBellowButton: {
			type: 'string',
			source: 'html',
			selector: 'p.text-small',
		},
	},
	edit: compose( [
		withState( { isBtnActive: false } ),
		withSelect( ( select, blockData ) => {
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
		} ),
	] )( ( props ) => {
		const {
			attributes,
			setAttributes,
			parentClientId,
			clientId,
			parentBlockAttributes,
			className,
			isBtnActive,
			setState,
		} = props;

		const {
			buttonColor,
			content,
			placeholder,
			linkHref,
			textAlign,
			textBellowButton,
			isTextBellowButton,
		} = attributes;
		const curClientId = clientId;

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

		const btnColors = [
			{ name: 'None', slug: 'none', color: '#FFFFFF' },
			{ name: 'Orange', slug: 'yellow', color: '#FAE053' },
			{ name: 'Green', slug: 'black', color: '#000000' },
			{ name: 'Blue', slug: 'blue', color: '#6A8DD4' },
			{ name: 'Green', slug: 'green', color: '#31CC8F' },
		];

		const classBtn = [ 'button-secondary' ];

		if ( buttonColor ) {
			classBtn.push( 'button-secondary--' + buttonColor );
		}

		const btnToolBar = isBtnActive && (
			<>
				<ToolbarGroup label="Button style">
					<ToolbarButton
						icon={ primaryButtonIcon }
						title={ 'Primary button' }
						isActive={ false }
						onClick={ () => {
							const block = wp.blocks.createBlock(
								'devmail/button-main',
								{
									content,
									textAlign,
									isTextBellowButton,
									textBellowButton,
								}
							);
							wp.data
								.dispatch( 'core/block-editor' )
								.updateBlock( curClientId, block );
						} }
					/>
					<ToolbarButton
						icon={ secondaryButtonIcon }
						title={ 'Secondary button' }
						isActive={ true }
						onClick={ () =>
							setAttributes( { buttonColor: 'yellow' } )
						}
					/>
				</ToolbarGroup>
				<ToolbarButtonLinkHref
					linkHref={ linkHref }
					onChange={ ( value ) =>
						setAttributes( { linkHref: value.url } )
					}
				/>
				<ToolbarButtonColor
					buttonColor={ buttonColor }
					btnColors={ btnColors }
					onChange={ ( value ) => {
						setAttributes( {
							buttonColor:
								value && value !== 'none'
									? getColorObjectByColorValue(
											btnColors,
											value
									  )?.slug
									: null,
						} );
					} }
				/>
			</>
		);

		return (
			<>
				<BlockControls>{ btnToolBar }</BlockControls>
				{ inspectorControls }
				<ButtonSecondary
					className={ classnames( classBtn, className ) }
					textAlign={ textAlign }
				>
					<RichText
						identifier="content"
						onChange={ ( value ) =>
							setAttributes( { content: value } )
						}
						value={ content }
						placeholder={ placeholder }
						allowedFormats={ [] }
						unstableOnSplit={ false }
						unstableOnFocus={ () => {
							setState( { isBtnActive: true } );
						} }
					/>
				</ButtonSecondary>
				{ isTextBellowButton && (
					<RichText
						identifier={ 'text-bellow-button' }
						onChange={ ( value ) => {
							setAttributes( { textBellowButton: value } );
						} }
						value={ textBellowButton }
						placeholder={ placeholder }
						className={ 'text-small' }
						allowedFormats={ [
							'core/bold',
							'core/italic',
							'core/link',
						] }
						unstableOnSplit={ () => false }
						unstableOnFocus={ () => {
							setState( { isBtnActive: false } );
						} }
					/>
				) }
			</>
		);
	} ),
	save: ( props ) => {
		const { attributes } = props;

		const {
			content,
			buttonColor,
			linkTarget,
			linkRel,
			linkTitle,
			linkHref,
			textAlign,
			textBellowButton,
			isTextBellowButton,
		} = attributes;

		const elmClasses = textAlign === 'center' ? [ 'text-center' ] : [];

		return (
			<>
				{ content && (
					<ButtonSecondary
						buttonColor={ buttonColor }
						linkHref={ linkHref }
						linkTarget={ linkTarget }
						linkRel={ linkRel }
						linkTitle={ linkTitle }
						textAlign={ textAlign }
					>
						<RichText.Content value={ content } />
					</ButtonSecondary>
				) }
				{ isTextBellowButton && textBellowButton && (
					<RichText.Content
						tagName={ 'p' }
						className={ classnames( 'text-small', elmClasses ) }
						value={ textBellowButton }
					/>
				) }
			</>
		);
	},
};
