import { withState } from '@wordpress/compose';
import { Toolbar, ToolbarButton, Popover } from '@wordpress/components';
import {
	ColorPalette,
	getColorObjectByAttributeValues,
} from '@wordpress/block-editor';

import { ReactComponent as colorIcon } from '../../../svg/buttons/color.svg';

class toolbarButtonColor extends wp.element.Component {
	render() {
		const {
			buttonColor,
			btnColors,
			isActive,
			onChange,
			setState,
		} = this.props;

		return (
			<Toolbar className={ 'la-color-panel' }>
				<ToolbarButton
					icon={ colorIcon }
					isPressed={ isActive }
					className={ [
						'la-color-panel__button',
						`la-color-panel__button--${ buttonColor }`,
					] }
					onClick={ () => {
						setState( () => ( { isActive: ! isActive } ) );
					} }
				/>
				{ isActive && (
					<Popover
						position="bottom center"
						focusOnMount="container"
						noArrow={ false }
					>
						<ColorPalette
							value={
								getColorObjectByAttributeValues(
									btnColors,
									buttonColor
								)?.color
							}
							onChange={ ( value ) => {
								onChange( value );
								setState( () => ( { isActive: false } ) );
							} }
							colors={ btnColors }
							disableCustomColors={ true }
							clearable={ false }
							className={ 'la-color-panel__palette' }
						/>
					</Popover>
				) }
			</Toolbar>
		);
	}
}

export default withState()( toolbarButtonColor );
