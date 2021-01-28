import { withSelect } from '@wordpress/data';
import {
	RichText,
	AlignmentToolbar,
	BlockControls,
	RichTextToolbarButton,
} from '@wordpress/block-editor';
import {
	Toolbar,
	ToolbarButton
} from '@wordpress/components';
import classnames from "classnames";

import Icon from '../../global/icons';
import getInspectorControls from "../../controls/getInspectorControls";
import LetteraConfig from "../../global/config";

const HEADING_LEVELS = [ 1, 2, 3 ];

export const name = 'lettera/header';

export const settings = {
	title: 'Header H1',
	icon: 'heading',
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'h1',
		},
		level: {
			type: 'number',
			default: 1,
		},
		placeholder: {
			type: 'string',
			default: 'Write heading…',
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
		} = props;

		const { content, level, placeholder, addClass } = attributes;

		const inspectorControls = getInspectorControls(parentClientId, parentBlockAttributes);

		const classHeader = ( level > 1 ) ? 'h' + level : '';
		let classElement = [classHeader, addClass];

		const buttons = HEADING_LEVELS.map( ( targetLevel ) => {
			const isActive = targetLevel === level;
			return (
				<ToolbarButton
					icon={ Icon._heading['level' + targetLevel] }
					title={'Heading ' + targetLevel}
					isActive={isActive}
					value={targetLevel}
					onClick={ (value) => setAttributes( { level: targetLevel } )}
				/>
			);
		});

		return (
			<>
				<BlockControls>
					<Toolbar>
						{ buttons }
					</Toolbar>
				</BlockControls>
				{ inspectorControls }
				<RichText
					identifier="content"
					tagName='h1'
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
			className,
		} = props;

		const { content, level, addClass } = attributes;

		const classHeader = ( level > 1 ) ? 'h' + level : '';
		let classElement = [classHeader, addClass];

		return (
			content && <RichText.Content
				tagName='h1'
				value={ content }
				className={ classnames(className, classElement) }
			/>
		);
	},
};
