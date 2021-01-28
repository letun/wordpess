import { withSelect } from '@wordpress/data';
import {
	RichText,
	BlockControls,
	RichTextToolbarButton,
} from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import Icon from '../../global/icons';
import getInspectorControls from "../../controls/getInspectorControls";
import LetteraConfig from "../../global/config";

const HEADING_LEVELS = [ 2, 3 ];

export const name = 'lettera/heading';

export const settings = {
	title: 'Heading',
	icon: 'heading',
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'h1,h2,h3,h4,h5,h6',
		},
		level: {
			type: 'number',
			default: 2,
		},
		allowedLevels: {
			type: 'array',
			default: [2, 3, 4],
		},
		placeholder: {
			type: 'string',
			default: 'Write heading…',
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
			attributes: { content, level, placeholder, allowedLevels },
			setAttributes,
			clientId,
			parentClientId,
			parentBlockAttributes,
			className,
		} = props;

		const inspectorControls = getInspectorControls(parentClientId, parentBlockAttributes);

		const tagName = 'h' + level;

		const buttons = allowedLevels.map( ( targetLevel ) => {
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
					tagName={ tagName }
					className={ className }
					onChange={ ( value ) => setAttributes( { content: value } ) }
					value={ content }
					placeholder={ placeholder }
					allowedFormats={[]}
					keepPlaceholderOnFocus={true}
				/>
			</>
		);
	}),
	save: ( props ) => {
		const {
			attributes: { content, level, placeholder },
			className,
		} = props;
		const tagName = 'h' + level;

		return (
			content && <RichText.Content tagName={ tagName } value={ content } />
		);
	},
};