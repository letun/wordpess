import { getBlockType, createBlock } from "@wordpress/blocks";
import { withState } from '@wordpress/compose';
import {
	ToolbarButton, ToolbarGroup,
} from '@wordpress/components';

import Icons from "../global/icons";

const { Component } = wp.element;

class addBlockButton extends Component {
	render() {
		const { allowedBlocks, attributes, clientId } = this.props;

		return (
			<div className={ "la-add-block-toolbar" }>
				<ToolbarGroup title={ "Add new" }  className={ "la-add-block-toolbar__panel" }>
					<ToolbarButton
						icon={Icons._plus}
						className={ ["la-add-block-toolbar__button-plus"] }
						isPressed={ true }
					/>
						<ToolbarGroup className={ "la-add-block-toolbar__button-group" }>
							{ allowedBlocks.map( (blockSlug) => {
								const insertBlock = getBlockType(blockSlug);
								return <ToolbarButton
									icon={ insertBlock.icon.src }
									className={ ["la-add-block-toolbar__button"] }
									label={ insertBlock.title }
									onClick={ () => {
										wp.data.dispatch( 'core/block-editor' ).insertBlock(createBlock(blockSlug, {attributes, canDelete: true}), 100, clientId);
									} }
								/>;
							} ) }
						</ToolbarGroup>
				</ToolbarGroup>
			</div>
		);
	}
}

export default withState()(addBlockButton);