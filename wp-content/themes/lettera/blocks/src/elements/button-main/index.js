import { withSelect } from '@wordpress/data';
import {
	URLPopover,
	URLInputButton,
	URLInput,
	RichText,
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	ColorPalette,
	getColorObjectByColorValue,
	getColorObjectByAttributeValues,
} from '@wordpress/block-editor';
import {
	ToolbarButton, ToolbarGroup,
} from '@wordpress/components';
import classnames from "classnames";

import ButtonMain from '../../layout/button-main';

import ToolbarButtonLinkHref from '../../controls/toolbarButtonLinkHref';
import ToolbarButtonColor from '../../controls/toolbarButtonColor';
import getInspectorControls from "../../controls/getInspectorControls";
import Icons from '../../global/icons';
import LetteraConfig from '../../global/config';

export const name = 'lettera/button-main';

export const settings = {
	title: 'Button',
	icon: Icons.button,
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
	attributes: {
		content: {
			type: "string",
			source: "text",
			selector: "a",
		},
		linkHref: {
			type: "string",
			source: "attribute",
			selector: "a",
			attribute: "href",
			default: "https://my.ecwid.com/cp#register",
		},
		linkTitle: {
			type: "string",
			source: "attribute",
			selector: "a",
			attribute: "title"
		},
		linkTarget: {
			type: "string",
			source: "attribute",
			selector: "a",
			attribute: "target",
		},
		linkRel: {
			type: "string",
			source: "attribute",
			selector: "a",
			attribute: "rel",
			defauld: "noopener"
		},
		placeholder: {
			type: "string",
			default: 'Button text…',
		},
		buttonSize: {
			type: "string",
			default: 'normal', /* small, medium, large */
		},
		buttonColor: {
			type: "string",
			default: "black",
		}
	},
	edit: withSelect( ( select, blockData ) => {
		const parentClientId = select( 'core/block-editor' ).getBlockHierarchyRootClientId( blockData.clientId );
		return {
			innerBlocks: select( 'core/block-editor' ).getBlocks( blockData.clientId ),
			parentClientId: parentClientId,
			clientId: blockData.clientId,
			parentBlockAttributes: select( 'core/block-editor' ).getBlockAttributes( parentClientId ),
		};
	} )( props => {
		const {
			attributes,
			setAttributes,
			parentClientId,
			clientId,
			parentBlockAttributes,
			className,
		} = props;

		const { buttonColor, buttonSize, content, placeholder, linkHref } = attributes;
		const curClientId = clientId;
		const inspectorControls = getInspectorControls(parentClientId, parentBlockAttributes);

		const btnColors = [
			{name: 'Black', slug: 'black', color: '#000000'},
			{name: 'Yellow', slug: 'yellow',  color: '#FFBF06'},
			{name: 'Silver', slug: 'silver',  color: '#DDE1E6'},
			{name: 'White', slug: 'white',  color: '#FFFFFF'},
		];

		let classBtn = ['button-main'];

		if (buttonSize === 'large') {
			classBtn.push('button-main--large');
		}

		if (buttonColor && buttonColor !== 'black') {
			classBtn.push('button-main--' + buttonColor);
		}

		const toolbar = (
			<>
				<ToolbarGroup label="Button style">
					<ToolbarButton
						icon={ Icons._button['typeButton'] }
						title={'Primary button'}
						isActive={ true }
						onClick={ () => setAttributes( { buttonColor: 'black' } ) }
					/>
					<ToolbarButton
						icon={ Icons._button['typeLink'] }
						title={ 'Secondary button' }
						isActive={ false }
						onClick={ () => {
							const block = wp.blocks.createBlock( 'lettera/button-secondary', { content } );
							wp.data.dispatch( 'core/block-editor' ).updateBlock(curClientId, block);
							const buttonBlockClientId = wp.data.select( 'core/block-editor' ).getBlockParentsByBlockName(clientId, 'lettera/block-btn')[0];
							if (buttonBlockClientId) {
								wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes(buttonBlockClientId, {buttonType: 'button-secondary'});
							}
						} }
					/>
				</ToolbarGroup>
				<ToolbarButtonLinkHref
					linkHref={ linkHref }
					onChange={ ( value ) => setAttributes( { linkHref: value.url } ) }
				/>
				<ToolbarButtonColor
					buttonColor={ buttonColor }
					btnColors={ btnColors }
					onChange={
						( value ) => {
							setAttributes( {
								buttonColor: value ? (getColorObjectByColorValue(btnColors, value)?.slug) : 'black'
							} );
						}
					}
				/>
			</>
		);

		return (
			<>
				<BlockControls>
					{toolbar}
				</BlockControls>
				{ inspectorControls }
				<ButtonMain
					className={ classnames(classBtn, className) }>
					<RichText
						identifier="content"
						onChange={ ( value ) => setAttributes( { content: value } ) }
						value={ content }
						placeholder={ placeholder }
						allowedFormats={[]}
						unstableOnSplit={ () => false }
					/>
				</ButtonMain>
			</>
		);
	}),
	save: ( props ) => {
		const {
			attributes
		} = props;

		const { content, buttonColor, buttonSize, linkTarget, linkRel, linkTitle, linkHref } = attributes;

		return (
			(
				content && <ButtonMain
					buttonColor={ buttonColor }
					buttonSize={ buttonSize }
					align={ "center" }
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