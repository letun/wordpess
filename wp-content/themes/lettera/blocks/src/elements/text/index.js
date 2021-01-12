import { createBlock } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton, Button } from '@wordpress/components';
import Icon from '../../global/icons';
import { paragraph } from '@wordpress/icons';
//import Parents from '../../global/parents';
import getInspectorControls from "../../global/getInspectorControls";

export const name = 'lettera/text';

export const settings = {
	title: 'Text',
	icon: paragraph,
	category: 'common',
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
			default: ''
		},
		placeholder: {
			type: 'string',
			default: 'Text here…',
		},
		canDelete: {
			type: 'boolean',
			default: false
		}
	},
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'calypso/list' ],
				transform: ( { values } ) => {
					console.log(values);
					return createBlock( 'calypso/text', {
						values,
					} );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'calypso/list' ],
				transform: ( content ) => {
					console.log(content.content);
					return createBlock(
						'calypso/list',
						content.content
					);
				},
			},
		],
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
			onReplace,
			onRemove,
			mergeBlocks,
			setAttributes,
			parentClientId,
			parentBlockAttributes,
			clientId,
			className,
		} = props;

		const { content, placeholder } = attributes;

		const inspectorControls = getInspectorControls(parentClientId, parentBlockAttributes);

		return (
			<>
				<BlockControls>
					<Toolbar className={"components-toolbar-group--no-right-border"}>
						<ToolbarButton
							icon={ 'trash' }
							title={ 'Remove block' }
							className={"nomi--delete-button"}
							onClick={ () => wp.data.dispatch( 'core/block-editor' ).removeBlock(clientId) }
						/>
					</Toolbar>
				</BlockControls>
				{ inspectorControls }
				<RichText
					tagName="p"
					className={ className }
					onChange={ ( newContent ) => { setAttributes( { content: newContent } ) } }
					value={ content }
					placeholder={ placeholder }
					allowedFormats={[ 'core/bold', 'core/italic', 'core/link' ] }
					onSplit={ ( value ) => {
						if ( ! value ) {
							return createBlock( name );
						}
						return createBlock( name, {
								...attributes,
							content: value,
						} );
					} }
					onReplace={ onReplace }
					onRemove={ onRemove }
					onMerge={ mergeBlocks }
				/>
			</>
		);
	}),
	save: ( props ) => {
		const {
			attributes: { content }
		} = props;

		return (
			content && <RichText.Content tagName="p" value={ content } />
		);
	},
};