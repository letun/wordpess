import { withSelect } from '@wordpress/data';
import { RichText } from '@wordpress/block-editor';
import {
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	ColorPalette,
	getColorObjectByColorValue,
	getColorObjectByAttributeValues,
} from '@wordpress/block-editor';
import classnames from "classnames";

import Icon from '../../global/icons';
import getInspectorControls from '../../controls/getInspectorControls';
import LetteraConfig from "../../global/config";

export const name = 'lettera/preheader';

export const settings = {
	title: 'Preheader',
	icon: Icon.preheader,
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'h4',
		},
		placeholder: {
			type: 'string',
			default: 'Write preheading…',
		},
		addClass: {
			type: 'array',
			source: 'attribute',
			default: ''
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
			parentClientId,
			parentBlockAttributes,
			cliendId,
			className,
		} = props;

		const { content, placeholder, addClass } = attributes;

		if (parentBlockAttributes.textColor === 'white') {
			//setAttributes( { addClass: 'text-white' } );
		} else {
			//setAttributes( { addClass: 'text-gray' } );
		}

		let classElement = ["text-normal", addClass];

		//classElement.push(parentBlockAttributes.textColor === 'white' ? "text-white" : "text-gray");

		const inspectorControls = getInspectorControls(parentClientId, parentBlockAttributes);

		return (
			<>
				{ inspectorControls }
				<RichText
					identifier="content"
					tagName='h4'
					className={ classnames(className, classElement) }
					onChange={ ( value ) => setAttributes( { content: value } ) }
					value={ content }
					placeholder={ placeholder }
					allowedFormats={[]}
				/>
			</>
		);
	}),
	save: ( props ) => {
		const {
			attributes,
			className
		} = props;

		const { content, addClass } = attributes;

		let classElement = ["text-normal", addClass];

		return (
			content && <RichText.Content
				tagName='h4'
				value={ content }
				className={ classnames(className, classElement) }
			/>
		);
	},
};
