import { withSelect } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';

import LetteraConfig from '../../global/config';
import getInspectorControls from "../../controls/getInspectorControls";

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
			attributes: { content },
			setAttributes,
			clientId,
			parentClientId,
			parentBlockAttributes,
			className,
		} = props;

		const inspectorControls = getInspectorControls(parentClientId, parentBlockAttributes);

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
				{inspectorControls}
				<div className="calypso-text">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ MY_TEMPLATE }
						templateLock={ false }
						value={ content }
						onChange={ ( value ) => setAttributes( { content: value } ) }
					/>
				</div>
			</>
		);
	}),
	save: ( props ) => {
		const {
			attributes: { content },
			innerBlocks,
		} = props;

		let isEmpty = true;
		for (let i = 0; i < innerBlocks.length; i++) {
			if (
				(
					innerBlocks[i].name === 'lettera/paragraph'
					&& (
						innerBlocks[i].attributes.content !== ''
						|| innerBlocks[i].attributes.content === undefined
					)
				) || (
					innerBlocks[i].name === 'lettera/list'
					&& (
						innerBlocks[i].attributes.values !== ''
						|| innerBlocks[i].attributes.values === undefined
					)
				)
			) {
				isEmpty = false;
				break;
			}
		}

		return (
			<div className="calypso-text">
				<InnerBlocks.Content value={ content } />
			</div>
		);
	},
};