import { withSelect } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';

import LetteraConfig from '../../global/config';
import getInspectorControls from '../../controls/getInspectorControls';
import Row from '../../layout/row';
import Column from '../../layout/column';

export const name = 'lettera/block-heading';

export const settings = {
	title: 'Block: Heading',
	icon: 'heading',
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
	attributes: {
		content: {
			type: 'string',
		},
		addClass: {
			type: 'string',
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
			attributes: { addClass },
			parentClientId,
			parentBlockAttributes,
			className,
		} = props;

		const inspectorControls = getInspectorControls(
			parentClientId,
			parentBlockAttributes
		);

		const MY_TEMPLATE = [
			[ 'lettera/preheader', { placeholder: 'Preheader text' } ],
			[ 'lettera/header', { placeholder: 'Header text' } ],
			[ 'lettera/block-text' ],
		];

		const ALLOWED_BLOCKS = [
			'lettera/preheader',
			'lettera/header',
			'lettera/block-text',
		];

		return (
			<>
				{ inspectorControls }
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ MY_TEMPLATE }
					templateLock="all"
					classname={ classnames( className, addClass ) }
				/>
			</>
		);
	} ),
	save: ( props ) => {
		const {
			attributes: { addClass },
			className,
		} = props;

		return (
			<Row>
				<Column>
					<InnerBlocks.Content
						classname={ classnames( className, addClass ) }
					/>
				</Column>
			</Row>
		);
	},
};
