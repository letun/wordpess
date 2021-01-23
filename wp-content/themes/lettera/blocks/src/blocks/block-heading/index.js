import { withSelect } from '@wordpress/data';
import {
	InnerBlocks,
} from '@wordpress/block-editor';
import Parents from '../../global/parents';
import getInspectorControls from "../../core/getInspectorControls";

export const name = 'lettera/block-heading';

export const settings = {
	title: 'Block: Heading',
	icon: 'heading',
	category: 'nomi-blocks',
	parent: Parents.mainBlocks,
	attributes: {
		content: {
			type: 'string'
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
			attributes: { addClass },
			setAttributes,
			cliendId,
			parentClientId,
			parentBlockAttributes,
			className,
		} = props;

		const inspectorControls = getInspectorControls(parentClientId, parentBlockAttributes);

		const MY_TEMPLATE = [
			[ 'lettera/preheader', { placeholder: 'Preheader text' } ],
			[ 'lettera/heading', { placeholder: 'Heading text' } ],
			[ 'lettera/block-text' ],
		];

		const ALLOWED_BLOCKS = [
			'lettera/preheader',
			'lettera/heading',
			'lettera/block-text'
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
			attributes: { content, addClass }
		} = props;

		return (
			<InnerBlocks.Content />
		);
	},
};