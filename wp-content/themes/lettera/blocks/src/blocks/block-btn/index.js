import { withSelect } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';
import classnames from "classnames";

import Spacer from '../../layout/spacer';

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
		hasContent: {
			type: 'boolean',
			default: false,
		},
		buttonType: {
			type: "string",
			default: "button-main",
		},
		buttonAltText: {
			type: "string",
			default: null,
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
			clientId: blockData.clientId,
			parentBlockAttributes: select( 'core/block-editor' ).getBlockAttributes( parentClientId ),
		};
	} )( props => {
		const {
			attributes,
			setAttributes,
			clientId,
			parentClientId,
			parentBlockAttributes,
			className,
			innerBlocks
		} = props;
		const {buttonType, buttonAltText, addClass, hasContent} = attributes;

		wp.element.useEffect(() => {
			let isEmpty = true;
			if (innerBlocks) {
				for (let i = 0; i < innerBlocks.length; i++) {
					if (innerBlocks[i].attributes.content) {
						isEmpty = false;
						break;
					}
				}
			}
			setAttributes({ hasContent: !isEmpty });
		});

		const inspectorControls = getInspectorControls(parentClientId, parentBlockAttributes);

		let classBtn = 'btn-block';
		if ( addClass ) {
			classBtn += ' ' + addClass;
		}

		let MY_TEMPLATE = [];
		if (buttonType === 'button-secondary') {
			MY_TEMPLATE.push([ 'lettera/button-secondary', { placeholder: 'Button text' } ]);
		} else {
			MY_TEMPLATE.push([ 'lettera/button-main', { placeholder: 'Button text' } ]);
		}

		if (buttonAltText) {
			MY_TEMPLATE.push([ 'lettera/text-small', { placeholder: 'Text bellow button', addClass: 'text-gray' } ]);
		}

		const ALLOWED_BLOCKS = [
			'lettera/button-main',
			'lettera/button-secondary',
			'lettera/text-small'
		];

		return (
			<>
				{inspectorControls}
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ MY_TEMPLATE }
					templateLock="all"
				/>
			</>
		);
	}),
	save: ( props ) => {
		const {
			attributes,
			className
		} = props;

		const { addClass, hasContent } = attributes;

		let classElement = ["btn-block", addClass];

		return (
			hasContent && (
				<>
					<Spacer height="8" />
					<InnerBlocks.Content className={ classnames(classElement, className) } />
				</>
			)
		);
	},
};