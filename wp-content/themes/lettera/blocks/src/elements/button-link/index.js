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
	Toolbar, ToolbarButton, ToolbarGroup,
	ToggleControl, PanelBody, PanelRow, CheckboxControl, SelectControl, ColorPicker,
	IconButton, Popover,
	Tooltip, TextControl,
	Dropdown, Button, ColorIndicator, Icon
} from '@wordpress/components';
import classnames from "classnames";

import Icons from '../../global/icons';
import LetteraConfig from '../../global/config';
import getInspectorControls from "../../core/getInspectorControls";
import ToolbarButtonLinkHref from '../../core/toolbarButtonLinkHref';
import ToolbarButtonColor from '../../core/toolbarButtonColor';

export const name = 'lettera/button-link';

export const settings = {
	title: 'Button',
	icon: Icons.button,
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
	attributes: {
		content: {
			type: "string",
			source: "html",
			selector: "span.btn-link__content",
		},
		linkHref: {
			type: "string",
			source: "attribute",
			selector: "a.btn-link",
			attribute: "href",
			default: "https://my.ecwid.com/cp#register",
		},
		title: {
			type: "string",
			source: "attribute",
			selector: "a.btn-link",
			attribute: "title"
		},
		linkTarget: {
			type: "string",
			source: "attribute",
			selector: "a.btn-link",
			attribute: "target"
		},
		rel: {
			type: "string",
			source: "attribute",
			selector: "a.btn-link",
			attribute: "rel"
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
			default: "yellow"
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
			attributes: { buttonColor, buttonSize, linkTarget, rel, content, title, linkHref }
		} = props;

		let classBtn = ['btn-link'];

		if (buttonSize === 'small') {
			classBtn.push('btn-link--small');
		}

		if (buttonColor !== 'yellow') {
			classBtn.push('btn-link--' + buttonColor);
		}

		return (
			content && ( <a
				className={ classnames(classBtn, className) }
				href={ linkHref }
				title={ title }
				target={ linkTarget }
				rel={ rel }
				>
					<span className={ classnames('btn-link__content') }>
						<RichText.Content
							value={content}/>
					</span>
				</a>
			)
		);
	},
};