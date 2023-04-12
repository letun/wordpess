import { withSelect } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';

import Spacer from '../../layout/spacer';

import Config from '../../global/config';
import getInspectorControls from '../../controls/getInspectorControls';

import { ReactComponent as elementIcon } from '../../../../svg/elements/button.svg';

export const name = 'devmail/block-btn';

export const settings = {
	title: 'Block: Button',
	icon: elementIcon,
	category: Config.category,
	parent: Config.childElemets.mainBlocks,
	attributes: {
		hasContent: {
			type: 'boolean',
			default: false,
		},
		defaultButtonType: {
			type: 'string',
			default: 'button-main',
		},
		buttonType: {
			type: 'string',
			default: null,
		},
		isTextBellowButton: {
			type: 'boolean',
			default: true,
		},
		addClass: {
			type: 'string',
			default: '',
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
			attributes,
			setAttributes,
			parentClientId,
			parentBlockAttributes,
			innerBlocks,
		} = props;
		const {
			defaultButtonType,
			buttonType,
			isTextBellowButton,
			hasContent,
		} = attributes;

		wp.element.useEffect( () => {
			let isEmpty = true;
			if ( innerBlocks ) {
				for ( let i = 0; i < innerBlocks.length; i++ ) {
					if (
						innerBlocks[ i ].attributes.content ||
						innerBlocks[ i ].attributes.textBellowButton
					) {
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
				`devmail/${ buttonType ? buttonType : defaultButtonType }`,
				{ placeholder: 'Button text', isTextBellowButton },
			],
		];

		const ALLOWED_BLOCKS = [
			'devmail/button-main',
			'devmail/button-secondary',
		];

		if ( hasContent ) {
			return (
				<>
					{ inspectorControls }
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						templateLock="all"
					/>
				</>
			);
		}

		return (
			<>
				{ inspectorControls }
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ MY_TEMPLATE }
					templateLock="all"
				/>
			</>
		);
	} ),
	save: ( props ) => {
		const { attributes, className } = props;

		const { addClass, hasContent } = attributes;

		const classElement = [ 'btn-block', addClass ];

		return (
			hasContent && (
				<>
					<Spacer height="8" />
					<InnerBlocks.Content
						className={ classnames( classElement, className ) }
					/>
				</>
			)
		);
	},
};
