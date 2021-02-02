import { withSelect } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';

import LetteraConfig from '../../global/config';
import getInspectorControls from '../../controls/getInspectorControls';

import { ReactComponent as elementIcon } from '../../../../svg/elements/preheader.svg';

export const name = 'lettera/block-text-extra';

export const settings = {
	title: 'Block: Text Extra',
	icon: elementIcon,
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: '.calypso-text',
		},
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
			attributes: { content },
			setAttributes,
			parentClientId,
			parentBlockAttributes,
		} = props;

		const inspectorControls = getInspectorControls(
			parentClientId,
			parentBlockAttributes
		);

		const MY_TEMPLATE = [
			[ 'lettera/paragraph', { placeholder: 'Write text here' } ],
		];

		const ALLOWED_BLOCKS = [
			'lettera/paragraph',
			'lettera/list',
			'lettera/heading',
		];

		return (
			<>
				{ inspectorControls }
				<div className="calypso-text">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ MY_TEMPLATE }
						templateLock={ false }
						value={ content }
						onChange={ ( value ) =>
							setAttributes( { content: value } )
						}
					/>
				</div>
			</>
		);
	} ),
	save: ( props ) => {
		const {
			attributes: { content },
		} = props;

		return (
			<div className="calypso-text">
				<InnerBlocks.Content value={ content } />
			</div>
		);
	},
};
