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
			default: "_blank"
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
			cliendId: blockData.clientId,
			parentBlockAttributes: select( 'core/block-editor' ).getBlockAttributes( parentClientId ),
		};
	} )( props => {
		const {
			attributes,
			setAttributes,
			parentClientId,
			cliendId,
			parentBlockAttributes,
			className,
		} = props;

		const { buttonColor, buttonSize, content, placeholder, linkHref } = attributes;
		const curCliendId = cliendId;
		const inspectorControls = getInspectorControls(parentClientId, parentBlockAttributes);

		const btnColors = [
			{name: 'Black', slug: 'black', color: '#000000'},
			{name: 'Yellow', slug: 'yellow',  color: '#FFBF06'},
			{name: 'Silver', slug: 'silver',  color: '#DDE1E6'},
			{name: 'White', slug: 'white',  color: '#FFFFFF'},
		];

		let classBtn = ['btn'];

		if (buttonSize === 'large') {
			classBtn.push('btn--large');
		}

		if (buttonColor) {
			classBtn.push('btn--' + buttonColor);
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
						title={'Secondary button'}
						isActive={ false }
						onClick={ () => {
							const block = wp.blocks.createBlock( 'lettera/button-link', { content } );
							wp.data.dispatch( 'core/block-editor' ).updateBlock(curCliendId, block);
						} }
					/>
				</ToolbarGroup>
				<ToolbarButtonLinkHref
					linkHref={ linkHref }
					onChange={( value ) => setAttributes( { linkHref: value.url } )}
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

		console.log(2222, content, linkHref);

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
					/>
				</ButtonMain>
			</>
		);
	}),
	save: ( props ) => {
		const {
			attributes: { buttonColor, buttonSize, linkTarget, linkRel, content, linkTitle, linkHref }
		} = props;

		let classBtn = ['btn', 'btn--shadow'];

		if (buttonSize === 'large') {
			classBtn.push('btn--large');
		}

		if (buttonColor !== 'black') {
			classBtn.push('btn--' + buttonColor);
		}

		console.log(linkHref);

		return (
			(
				content && <ButtonMain
					color={ "black" }
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