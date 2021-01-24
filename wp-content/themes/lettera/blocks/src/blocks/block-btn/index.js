import { withSelect } from '@wordpress/data';
import {
	InnerBlocks,
} from '@wordpress/block-editor';
import Icon from '../../global/icons';
import Config from '../../global/config';
import getInspectorControls from "../../controls/getInspectorControls";

export const name = 'lettera/block-btn';

export const settings = {
	title: 'Block: Button',
	icon: Icon.button,
	category: Config.category,
	parent: Config.childElemets.mainBlocks,
	attributes: {
		content: {
			type: 'string'
		},
		button_type: {
			type: "string",
			default: "button-main",
		},
		button_text: {
			type: "string",
			default: "none",
		},
		addClass: {
			type: 'string'
		},
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
			cliendId,
			parentClientId,
			parentBlockAttributes,
			className,
		} = props;
		const {button_type, button_text, addClass} = attributes;

		const inspectorControls = getInspectorControls(parentClientId, parentBlockAttributes);

		let classBtn = 'btn-block';
		if ( addClass ) {
			classBtn += ' ' + addClass;
		}

		let MY_TEMPLATE = [];
		if (button_type === 'button-main') {
			MY_TEMPLATE.push([ 'lettera/button-main', { placeholder: 'Button text' } ]);
		} else {
			MY_TEMPLATE.push([ 'lettera/button-link', { placeholder: 'Button text' } ]);
		}

		if (button_text !== 'none') {
			MY_TEMPLATE.push([ 'lettera/text-small', { placeholder: 'Text bellow button', addClass: 'text-gray' } ]);
		}

		const ALLOWED_BLOCKS = [
			'lettera/button-main',
			'lettera/button-link',
			'lettera/text-small'
		];

		return (
			<>
				{inspectorControls}
				<div className={ classBtn }>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ MY_TEMPLATE }
						templateLock="all"
					/>
				</div>
			</>
		);
	}),
	save: ( props ) => {
		const {
			attributes: { addClass }
		} = props;

		let classBtn = 'btn-block';
		if ( addClass ) {
			classBtn += ' ' + addClass;
		}

		return (
			<div className={ classBtn }>
				<InnerBlocks.Content />
			</div>
		);
	},
};