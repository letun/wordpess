import { withSelect } from '@wordpress/data';
import {
	RichText,
	BlockControls,
	getColorObjectByColorValue,
} from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import classnames from 'classnames';

import ButtonMain from '../../layout/button-main';

import ToolbarButtonLinkHref from '../../controls/toolbarButtonLinkHref';
import ToolbarButtonColor from '../../controls/toolbarButtonColor';
import getInspectorControls from '../../controls/getInspectorControls';

import LetteraConfig from '../../global/config';

import { ReactComponent as elementIcon } from '../../../../svg/elements/button.svg';
import { ReactComponent as primaryButtonIcon } from '../../../../svg/buttons/primaryButton.svg';
import { ReactComponent as secondaryButtonIcon } from '../../../../svg/buttons/secondaryButton.svg';

export const name = 'lettera/button-main';

export const settings = {
	title: 'Button',
	icon: elementIcon,
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
	attributes: {
		content: {
			type: 'string',
			source: 'text',
			selector: 'a',
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
			default: 'Button text…',
		},
		buttonSize: {
			type: 'string',
			default: 'normal' /* small, medium, large */,
		},
		buttonColor: {
			type: 'string',
			default: 'black',
		},
		textAlign: {
			type: 'string',
			default: 'left',
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
			clientId,
			parentBlockAttributes,
			className,
		} = props;

		const {
			buttonColor,
			buttonSize,
			content,
			placeholder,
			linkHref,
			linkTarget,
			textAlign,
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

		const curClientId = clientId;
		const inspectorControls = getInspectorControls(
			parentClientId,
			parentBlockAttributes
		);

		const btnColors = [
			{ name: 'Black', slug: 'black', color: '#000000' },
			{ name: 'Yellow', slug: 'yellow', color: '#FFBF06' },
			{ name: 'Silver', slug: 'silver', color: '#DDE1E6' },
			{ name: 'White', slug: 'white', color: '#FFFFFF' },
		];

		const classBtn = [ 'button-main' ];

		if ( buttonSize === 'large' ) {
			classBtn.push( 'button-main--large' );
		}

		if ( buttonColor && buttonColor !== 'black' ) {
			classBtn.push( 'button-main--' + buttonColor );
		}

		const toolbar = (
			<>
				<ToolbarGroup label="Button style">
					<ToolbarButton
						icon={ primaryButtonIcon }
						title={ 'Primary button' }
						isActive={ true }
						onClick={ () =>
							setAttributes( { buttonColor: 'black' } )
						}
					/>
					<ToolbarButton
						icon={ secondaryButtonIcon }
						title={ 'Secondary button' }
						isActive={ false }
						onClick={ () => {
							const block = wp.blocks.createBlock(
								'lettera/button-secondary',
								{ content, textAlign }
							);
							wp.data
								.dispatch( 'core/block-editor' )
								.updateBlock( curClientId, block );
						} }
					/>
				</ToolbarGroup>
				<ToolbarButtonLinkHref
					linkHref={ linkHref }
					linkTarget={ linkTarget }
					onChange={ ( value ) =>
						setAttributes( { linkHref: value.url } )
					}
				/>
				<ToolbarButtonColor
					buttonColor={ buttonColor }
					btnColors={ btnColors }
					onChange={ ( value ) => {
						setAttributes( {
							buttonColor: value
								? getColorObjectByColorValue( btnColors, value )
										?.slug
								: 'black',
						} );
					} }
				/>
			</>
		);

		return (
			<>
				<BlockControls>{ toolbar }</BlockControls>
				{ inspectorControls }
				<ButtonMain
					className={ classnames( classBtn, className ) }
					textAlign={ textAlign }
				>
					<RichText
						identifier={ 'content' }
						onChange={ ( value ) =>
							setAttributes( { content: value } )
						}
						value={ content }
						placeholder={ placeholder }
						allowedFormats={ [] }
						unstableOnSplit={ () => false }
					/>
				</ButtonMain>
			</>
		);
	} ),
	save: ( props ) => {
		const { attributes } = props;

		const {
			content,
			buttonColor,
			buttonSize,
			linkTarget,
			linkRel,
			linkTitle,
			linkHref,
			textAlign,
		} = attributes;

		return (
			content && (
				<ButtonMain
					buttonColor={ buttonColor }
					buttonSize={ buttonSize }
					textAlign={ textAlign }
					linkHref={ linkHref }
					linkTarget={ linkTarget }
					linkRel={ linkRel }
					linkTitle={ linkTitle }
				>
					<RichText.Content value={ content } />
				</ButtonMain>
			)
		);
	},
};
