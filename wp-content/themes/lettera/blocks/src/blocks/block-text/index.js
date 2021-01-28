import { createBlock } from '@wordpress/blocks';
import { withSelect, withDispatch } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';
import { withState, compose } from '@wordpress/compose';
import classnames from "classnames";

import Icon from '../../global/icons';
import Config from '../../global/config';
import getInspectorControls from "../../controls/getInspectorControls";
import AddBlockButton from "../../controls/addBlockButton";

export const name = 'lettera/block-text';

export const settings = {
	title: 'Block: Text',
	icon: Icon.text,
	category: Config.category,
	parent: Config.childElemets.mainBlocks,
	attributes: {
		hasContent: {
			type: "boolean",
			default: false
		}
	},
	edit: compose([
		withSelect( ( select, blockData ) => {
			const parentClientId = select( 'core/block-editor' ).getBlockHierarchyRootClientId( blockData.clientId );
			return {
				innerBlocks: select( 'core/block-editor' ).getBlocks( blockData.clientId ),
				parentClientId: parentClientId,
				clientId: blockData.clientId,
				parentBlockAttributes: select( 'core/block-editor' ).getBlockAttributes( parentClientId ),
			};
		} ),
		withDispatch((dispatch) => {
			const {
				insertBlock
			} = dispatch("core/block-editor") || dispatch("core/editor");

			return {
				insertBlock
			};
		}),
		])( props => {
		const {
			attributes: { },
			setAttributes,
			clientId,
			parentClientId,
			parentBlockAttributes,
			className,
			innerBlocks,
		} = props;

		wp.element.useEffect(() => {
			let isEmpty = true;
			if (innerBlocks) {
				for (let i = 0; i < innerBlocks.length; i++) {
					if (innerBlocks[i].attributes.content) {
						isEmpty = false;
						break;
					}
				}
			}
			setAttributes({ hasContent: !isEmpty });
		});

		const inspectorControls = getInspectorControls(parentClientId, parentBlockAttributes);

		const MY_TEMPLATE = [
			[ 'lettera/text', { placeholder: 'Write text here', canDelete: true } ],
		];

		const ALLOWED_BLOCKS = [
			'lettera/text',
			'lettera/list'
		];

		return (
			<>
				{inspectorControls}
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ MY_TEMPLATE }
					templateLock={ false }
					renderAppender={ false }
				/>
				<AddBlockButton
					allowedBlocks={ ALLOWED_BLOCKS }
					clientId={ clientId }
				/>
			</>
		);
	}),
	save: ( props ) => {
		const {
			attributes,
			className
		} = props;

		const { addClass, hasContent } = attributes;

		let classElement = ["text-block", addClass];

		return (
			hasContent && (
				<InnerBlocks.Content />
			)
		);
	},
};
/*
TODO: AddBlockButton
<Toolbar className={"nomi-block__add-block-toolbar"}>
	<Button
		icon={ Icon._plus }
		className={ "nomi-block__add-block-button" }
		onClick={ () => {
			insertBlock(createBlock('calypso/text', {canDelete: true}), 100, clientId);
		} }
	/>
	<Button
		icon={ Icon.text }
		onClick={ () => {
			insertBlock(createBlock('calypso/text', {canDelete: true}), 100, clientId);
		} }
	/>
	<Button
		icon={ Icon.list }
		onClick={ () => {
			insertBlock(createBlock('calypso/list', {canDelete: true}), 100, clientId);
		} }
	/>
</Toolbar>
//Try to add AddBlockButton
<AddBlockButton
	allowedBlocks={ ALLOWED_BLOCKS }
	clientId={ clientId }
/>
 */