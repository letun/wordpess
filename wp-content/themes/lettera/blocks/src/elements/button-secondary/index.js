import { withSelect } from '@wordpress/data';
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

export const name = 'lettera/button-secondary';

export const settings = {
	title: 'Button',
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
			content,
			placeholder,
			linkHref,
			textAlign,
		} = attributes;
		const curClientId = clientId;
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

		const toolbar = (
			<>
				<ToolbarGroup label="Button style">
					<ToolbarButton
						icon={ primaryButtonIcon }
						title={ 'Primary button' }
						isActive={ false }
						onClick={ () => {
							const block = wp.blocks.createBlock(
								'lettera/button-main',
								{ content, textAlign }
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
				<BlockControls>{ toolbar }</BlockControls>
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
					/>
				</ButtonSecondary>
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
		} = attributes;

		return (
			content && (
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
			)
		);
	},
};
