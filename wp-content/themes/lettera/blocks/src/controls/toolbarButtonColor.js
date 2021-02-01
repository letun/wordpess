import { withState } from '@wordpress/compose';
import {
	Toolbar,
	ToolbarButton,
	Popover
} from '@wordpress/components';
import {
	PanelColorSettings,
	ColorPalette,
	getColorObjectByColorValue,
	getColorObjectByAttributeValues,
} from '@wordpress/block-editor';
const { Component } = wp.element;

import Icons from '../global/icons';

class toolbarButtonColor extends Component {
	render() {
		const { buttonColor, btnColors, isActive, onChange, setState } = this.props;

		return (
			<Toolbar className={ "la-button-color-panel" }>
				<ToolbarButton
					icon={ Icons.button.color }
					isPressed={ isActive }
					className={["la-button-color-panel__button", "la-button-color-panel__button--" + buttonColor]}
					onClick={ () => setState( state => ( { isActive: !isActive } ) ) }
				/>
				{isActive && (
					<Popover
						position="bottom center"
						focusOnMount="container"
						noArrow={ false }
					>
						<ColorPalette
							value={ getColorObjectByAttributeValues(btnColors, buttonColor)?.color }
							onChange={ (value) => { onChange(value); setState( state => ( { isActive: false } ) ); } }
							colors={ btnColors }
							disableCustomColors={ true }
							clearable={ false }
							className={["la-button-color-panel__palette"]}
						/>
					</Popover>
				) }
			</Toolbar>
		);
	}
}

export default withState()(toolbarButtonColor);