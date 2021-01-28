import { getBlockType, createBlock } from "@wordpress/blocks";
import { withState } from '@wordpress/compose';
import {
	ToolbarButton, ToolbarGroup,
} from '@wordpress/components';

import Icons from "../global/icons";

const { Component } = wp.element;

class addBlockButton extends Component {
	render() {
		const { allowedBlocks, clientId } = this.props;

		return (
			<ToolbarGroup title={ "Add new" } className={ "lettera-admin__add-block-toolbar" }>
				<ToolbarButton
					icon={Icons._plus}
					className={"lettera-admin__add-block-button"}
					isPressed={ true }
				/>
					<ToolbarGroup>
						{ allowedBlocks.map( (blockSlug) => {
							const insertBlock = getBlockType(blockSlug);
							return <ToolbarButton
								icon={ insertBlock.icon.src }
								className={ ["lettera-admin__add-block-button"] }
								label={ insertBlock.title }
								onClick={ () => {
									wp.data.dispatch( 'core/block-editor' ).insertBlock(createBlock(blockSlug, {canDelete: true}), 100, clientId);
								} }
							/>;
						} ) }
					</ToolbarGroup>
			</ToolbarGroup>
		);
	}
}

export default withState()(addBlockButton);