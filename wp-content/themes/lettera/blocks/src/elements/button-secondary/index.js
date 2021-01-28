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
	ToolbarButton, ToolbarGroup
} from '@wordpress/components';
import classnames from "classnames";

import Icons from '../../global/icons';
import LetteraConfig from '../../global/config';
import getInspectorControls from "../../controls/getInspectorControls";
import ToolbarButtonLinkHref from '../../controls/toolbarButtonLinkHref';
import ToolbarButtonColor from '../../controls/toolbarButtonColor';
import ButtonSecondary from "../../layout/button-secondary";

export const name = 'lettera/button-secondary';

export const settings = {
	title: 'Button',
	icon: Icons.button,
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
	attributes: {
		content: {
			type: "string",
			source: "html",
			selector: "span",
		},
		linkHref: {
			type: "string",
			source: "attribute",
			selector: "a",
			attribute: "href",
			default: "https://my.ecwid.com/cp#register",
		},
		title: {
			type: "string",
			source: "attribute",
			selector: "a",
			attribute: "title"
		},
		linkTarget: {
			type: "string",
			source: "attribute",
			selector: "a",
			attribute: "target"
		},
		linkRel: {
			type: "string",
			source: "attribute",
			selector: "a",
			attribute: "rel"
		},
		placeholder: {
			type: "string",
			default: 'Button text…',
		},
		buttonColor: {
			type: "string",
			default: null
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
			attributes: { buttonColor, buttonSize, content, placeholder, linkHref },
			setAttributes,
			parentClientId,
			cliendId,
			parentBlockAttributes,
			className,
		} = props;

		const curCliendId = cliendId;

		const inspectorControls = getInspectorControls(parentClientId, parentBlockAttributes);

		const btnColors = [
			{name: 'Yellow', slug: 'yellow', color: '#FDDE00'},
			{name: 'Orange', slug: 'dark-orange',  color: '#d29d38'},
			{name: 'Green', slug: 'rest-green',  color: '#4cb178'},
			{name: 'Blue', slug: 'facebook-blue',  color: '#6A8DD4'},
		];

		let classBtn = ['btn-link'];

		if (buttonSize === 'small') {
			classBtn.push('btn-link--small');
		}

		if (buttonColor) {
			classBtn.push('btn-link--' + buttonColor);
			classBtn.push('btn-link--active');
		}

		const toolbar = (
			<>
				<ToolbarGroup label="Button style">
					<ToolbarButton
						icon={ Icons._button['typeButton'] }
						title={'Primary button'}
						isActive={ false }
						onClick={ () => {
							const block = wp.blocks.createBlock( 'lettera/button-main', { content } );
							wp.data.dispatch( 'core/block-editor' ).updateBlock(curCliendId, block);
						} }
					/>
					<ToolbarButton
						icon={ Icons._button['typeLink'] }
						title={'Secondary button'}
						isActive={ true }
						onClick={ () => setAttributes( { buttonColor: 'yellow' } ) }
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
								buttonColor: value? ( getColorObjectByColorValue(btnColors, value)?.slug) : 'yellow'
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
				<div className={ classnames(className, classBtn) }>
					<span className={ classnames('btn-link__content') }>
						<RichText
							identifier="content"
							onChange={ ( value ) => setAttributes( { content: value } ) }
							value={ content }
							placeholder={ placeholder }
							allowedFormats={[]}
						/>
					</span>
				</div>
			</>
		);
	}),
	save: ( props ) => {
		const {
			attributes
		} = props;

		const { content, buttonColor, linkTarget, linkRel, linkTitle, linkHref } = attributes;

		return (
			content && <ButtonSecondary
				buttonColor={ buttonColor }
				align={ "center" }
				linkHref={ linkHref }
				linkTarget={ linkTarget }
				linkRel={ linkRel }
				linkTitle={ linkTitle }
			>
				<RichText.Content value={ content } />
			</ButtonSecondary>
		);
	},
};