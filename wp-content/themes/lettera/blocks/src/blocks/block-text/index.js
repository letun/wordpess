import { withSelect, withDispatch } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import classnames from 'classnames';

import Config from '../../global/config';
import getInspectorControls from '../../controls/getInspectorControls';
import AddBlockButton from '../../controls/addBlockButton';

import { ReactComponent as elementIcon } from '../../../../svg/elements/preheader.svg';

export const name = 'lettera/block-text';

export const settings = {
	title: 'Block: Text',
	icon: elementIcon,
	category: Config.category,
	parent: Config.childElemets.mainBlocks,
	attributes: {
		hasContent: {
			type: 'boolean',
			default: false,
		},
		defaultTextAlign: {
			type: 'string',
			default: 'text-left',
		},
		textAlign: {
			type: 'string',
			default: null,
		},
	},
	edit: compose( [
		withSelect( ( select, blockData ) => {
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
		} ),
		withDispatch( ( dispatch ) => {
			const { insertBlock } =
				dispatch( 'core/block-editor' ) || dispatch( 'core/editor' );

			return {
				insertBlock,
			};
		} ),
	] )( ( props ) => {
		const {
			setAttributes,
			attributes: { hasContent },
			clientId,
			parentClientId,
			parentBlockAttributes,
			innerBlocks,
		} = props;

		wp.element.useEffect( () => {
			let isEmpty = true;
			if ( innerBlocks ) {
				for ( let i = 0; i < innerBlocks.length; i++ ) {
					if ( innerBlocks[ i ].attributes.content ) {
						isEmpty = false;
						break;
					}
				}
			}
			setAttributes( { hasContent: ! isEmpty } );
		} );

		const inspectorControls = getInspectorControls(
			parentClientId,
			parentBlockAttributes
		);

		const MY_TEMPLATE = [
			[
				'lettera/paragraph',
				{
					placeholder: 'Write text here',
					isGlobalTextAlign: true,
					canDelete: true,
				},
			],
		];

		const ALLOWED_BLOCKS = [ 'lettera/paragraph', 'lettera/list' ];
		return (
			<>
				{ inspectorControls }
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ ! hasContent ? MY_TEMPLATE : null }
					templateLock={ false }
					renderAppender={ false }
				/>
				<AddBlockButton
					allowedBlocks={ ALLOWED_BLOCKS }
					attributes={ [ { isGlobalTextAlign: true } ] }
					clientId={ clientId }
				/>
			</>
		);
	} ),
	save: ( props ) => {
		const { attributes, className } = props;

		const { addClass, hasContent } = attributes;

		const classElement = [ 'text-block', addClass ];

		return (
			hasContent && (
				<InnerBlocks.Content
					className={ classnames( classElement, className ) }
				/>
			)
		);
	},
};
