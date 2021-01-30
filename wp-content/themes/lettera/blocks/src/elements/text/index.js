import { getBlockTransforms } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { paragraph } from '@wordpress/icons';
import classnames from "classnames";

import Icon from '../../global/icons';
import getInspectorControls from "../../controls/getInspectorControls";
import LetteraConfig from "../../global/config";

export const name = 'lettera/text';

export const settings = {
	title: 'Text',
	icon: paragraph,
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
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
		textAlign: {
			type: "string",
			default: null
		},
		isGlobalTextAlign: {
			type: "boolean",
			default: false
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

		const { content, placeholder, textAlign, isGlobalTextAlign } = attributes;

		const inspectorControls = getInspectorControls(parentClientId, parentBlockAttributes);

		wp.element.useEffect(() => {
			if (isGlobalTextAlign) {
				setAttributes({textAlign: parentBlockAttributes.textAlign});
			}
		});

		let addClass = [];
		if ( textAlign === 'text-center' ) {
			addClass.push('text-center');
		}

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
					className={ classnames(addClass, className) }
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
			attributes: { content, textAlign }
		} = props;

		let addClass = [];
		if (textAlign === 'text-center') {
			addClass.push('text-center');
		}

		return (
			content && <RichText.Content
				tagName="p"
				className={ classnames(addClass) }
				value={ content }
			/>
		);
	},
};