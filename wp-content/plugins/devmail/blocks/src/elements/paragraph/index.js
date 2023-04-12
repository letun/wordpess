import { withSelect } from '@wordpress/data';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import classnames from 'classnames';

import getInspectorControls from '../../controls/getInspectorControls';
import LetteraConfig from '../../global/config';

import { ReactComponent as elementIcon } from '../../../../svg/elements/paragraph.svg';

export const name = 'devmail/paragraph';

export const settings = {
	title: 'Paragraph',
	icon: elementIcon,
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
			default: '',
		},
		placeholder: {
			type: 'string',
			default: 'Text here…',
		},
		textAlign: {
			type: 'string',
			default: null,
		},
		canDelete: {
			type: 'boolean',
			default: false,
		},
	},
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'devmail/list' ],
				transform: ( { values } ) => {
					return createBlock( 'devmail/text', {
						values,
					} );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'devmail/list' ],
				transform: ( content ) => {
					return createBlock( 'devmail/list', content.content );
				},
			},
		],
	},
	edit: withSelect( ( select, blockData ) => {
		const parentClientId = select(
			'core/block-editor'
		).getBlockHierarchyRootClientId( blockData.clientId );
		return {
			innerBlocks: select( 'core/block-editor' ).getBlocks(
				blockData.clientId
			),
			parentClientId,
			clientId: blockData.clientId,
			parentBlockAttributes: select(
				'core/block-editor'
			).getBlockAttributes( parentClientId ),
		};
	} )( ( props ) => {
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

		const { content, placeholder, textAlign } = attributes;

		wp.element.useEffect( () => {
			if (
				parentBlockAttributes.blockAttributes &&
				parentBlockAttributes.blockAttributes.textAlign
			) {
				if (
					parentBlockAttributes.blockAttributes.textAlign ===
					'component'
				) {
					setAttributes( {
						textAlign: parentBlockAttributes.textAlign,
					} );
				} else {
					setAttributes( {
						textAlign:
							parentBlockAttributes.blockSettings.textAlign,
					} );
				}
			}
		} );

		const inspectorControls = getInspectorControls(
			parentClientId,
			parentBlockAttributes
		);

		const addClass = [];
		if ( textAlign === 'center' ) {
			addClass.push( 'text-center' );
		}

		return (
			<>
				<BlockControls>
					<Toolbar
						className={
							'components-toolbar-group--no-right-border'
						}
					>
						<ToolbarButton
							icon={ 'trash' }
							title={ 'Remove block' }
							onClick={ () =>
								wp.data
									.dispatch( 'core/block-editor' )
									.removeBlock( clientId )
							}
						/>
					</Toolbar>
				</BlockControls>
				{ inspectorControls }
				<RichText
					tagName="p"
					className={ classnames( addClass, className ) }
					onChange={ ( newContent ) => {
						setAttributes( { content: newContent } );
					} }
					value={ content }
					placeholder={ placeholder }
					allowedFormats={ [
						'core/bold',
						'core/italic',
						'core/link',
					] }
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
	} ),
	save: ( props ) => {
		const {
			attributes: { content, textAlign },
		} = props;

		const addClass = [];
		if ( textAlign === 'center' ) {
			addClass.push( 'text-center' );
		}

		return (
			content && (
				<RichText.Content
					tagName="p"
					className={ classnames( addClass ) }
					value={ content }
				/>
			)
		);
	},
};
