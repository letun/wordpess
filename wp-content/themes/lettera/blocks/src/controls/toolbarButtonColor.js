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
			<Toolbar>
				<ToolbarButton
					icon={ Icons._button.color }
					isPressed={ isActive }
					className={["nomi-admin__color-button-circular", "nomi-admin__color-button-circular--" + buttonColor]}
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
							className={["nomi-admin__color-button-palette"]}
						/>
					</Popover>
				) }
			</Toolbar>
		);
	}
}

export default withState()(toolbarButtonColor);

/*
TODO: Color Button with underline color
<ToolbarButton
	icon={"admin-appearance"}
	isPressed={ isActive }
	className={["format-library-text-color-button", "nomi-admin__color-button"]}
	onClick={ () => setState( state => ( { isActive: !isActive } ) ) }
>
	<ColorIndicator
		colorValue={ getColorObjectByAttributeValues(btnColors, buttonColor)?.color }
		className={["format-library-text-color-button__indicator", "nomi-admin__color-button-indicator"]}
	/>
</ToolbarButton>
 */