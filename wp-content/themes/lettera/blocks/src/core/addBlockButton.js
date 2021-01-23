import { getBlockType } from "@wordpress/blocks";
import { withState } from '@wordpress/compose';
import {
	Toolbar, Button, Icon
} from '@wordpress/components';

import Icons from "../global/icons";

const { Component } = wp.element;

class addBlockButton extends Component {
	render() {
		const { allowedBlocks, cliendId, isActive, setState } = this.props;

		return (
			<Toolbar className={ "nomi-block__add-block-toolbar" }>
				<Button
					icon={Icons._plus}
					className={"nomi-block__add-block-button"}
					isPressed={ isActive }
					onClick={ () => setState( state => ( { isActive: !isActive } ) ) }
				/>
				{isActive && (
					<>

						{ allowedBlocks.map( (blockSlug) => {
							const insertBlock = getBlockType(blockSlug);
							return <Button
								icon={ 'plus' }
								className={ ["nomi-block__add-block-button", "nomi-block__add-block-button--inserted"] }
								label={ insertBlock.title }
								onClick={ () => {
									insertBlock(createBlock(blockSlug, {canDelete: true}), 100, cliendId);
								} }
							/>;
							return <Button
								icon={ insertBlock.icon }
								className={ ["nomi-block__add-block-button", "nomi-block__add-block-button--inserted"] }
								label={ insertBlock.title }
								onClick={ () => {
									insertBlock(createBlock('calypso/list', {canDelete: true}), 100, cliendId);
								} }
							/>;
						} ) }
					</>
				) }
			</Toolbar>
		);
	}
}

export default withState()(addBlockButton);