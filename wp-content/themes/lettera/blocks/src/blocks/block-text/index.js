import { createBlock } from '@wordpress/blocks';
import { withSelect, withDispatch } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';
import { withState, compose } from '@wordpress/compose';
import {
	Toolbar, ToolbarButton,
	Button
} from '@wordpress/components';
import Icon from '../../global/icons';
import Config from '../../global/config';
import getInspectorControls from "../../core/getInspectorControls";
import AddBlockButton from "../../core/addBlockButton";

export const name = 'lettera/block-text';

export const settings = {
	title: 'Block: Text',
	icon: Icon.text,
	category: Config.category,
	parent: Config.childElemets.mainBlocks,
	attributes: {

	},
	edit: compose([
		withSelect( ( select, blockData ) => {
			const parentClientId = select( 'core/block-editor' ).getBlockHierarchyRootClientId( blockData.clientId );
			return {
				innerBlocks: select( 'core/block-editor' ).getBlocks( blockData.clientId ),
				parentClientId: parentClientId,
				cliendId: blockData.clientId,
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
			cliendId,
			parentClientId,
			parentBlockAttributes,
			className,
			insertBlock,
		} = props;

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
				<div className="calypso-text">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ MY_TEMPLATE }
						templateLock={ false }
					/>
				</div>
			</>
		);
	}),
	save: ( props ) => {
		const {
			attributes: { },
			innerBlocks,
		} = props;

		return (
			<div className="calypso-text">
				<InnerBlocks.Content />
			</div>
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
			insertBlock(createBlock('calypso/text', {canDelete: true}), 100, cliendId);
		} }
	/>
	<Button
		icon={ Icon.text }
		onClick={ () => {
			insertBlock(createBlock('calypso/text', {canDelete: true}), 100, cliendId);
		} }
	/>
	<Button
		icon={ Icon.list }
		onClick={ () => {
			insertBlock(createBlock('calypso/list', {canDelete: true}), 100, cliendId);
		} }
	/>
</Toolbar>
//Try to add AddBlockButton
<AddBlockButton
	allowedBlocks={ ALLOWED_BLOCKS }
	cliendId={ cliendId }
/>
 */