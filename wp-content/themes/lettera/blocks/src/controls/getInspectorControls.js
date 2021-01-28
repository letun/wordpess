import {
	ColorPalette,
	InspectorControls,
	PanelColorSettings,
	getColorObjectByColorValue,
	getColorObjectByAttributeValues,
} from '@wordpress/block-editor';
import {
	BaseControl, ToggleControl, PanelBody, SelectControl
} from '@wordpress/components';

function getInspectorControls(clientId, blockAttributes) {
	const blockSettings = blockAttributes.blockSettings;

	let inspectorControls, bgPanel, textColorPanel, imagePositionPanel, imagePositionPromoPanel;
	let imageSizePanel, spaceSizePanel, dividerPanel;

	const onChangeSettings = (clientId, name, value) => {
		let componentBlock = wp.data.select( 'core/block-editor' ).getBlock(clientId);
		componentBlock.attributes[name] = value;
		//wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes(clientId, {name: value});
		wp.data.dispatch( 'core/block-editor' ).updateBlock(clientId, componentBlock);
	};

	if (blockSettings && blockSettings.textAlign) {
		imagePositionPanel = (
			<SelectControl
				label="Text align"
				value={ blockAttributes.textAlign }
				options={ [
					{ label: 'Text right', value: 'right' },
					{ label: 'Text center', value: 'center' },
				] }
				onChange={ ( value ) => {
					onChangeSettings(clientId, 'textAlign', value);
				} }
			/>
		);
	}

	if (blockSettings && blockSettings.imagePosition) {
		imagePositionPanel = (
			<SelectControl
				label="Image position"
				value={ blockAttributes.imagePosition }
				options={ [
					{ label: 'Image right', value: 'right' },
					{ label: 'Image Left', value: 'left' },
					{ label: 'Image center', value: 'center' },
				] }
				onChange={ ( value ) => {
					onChangeSettings(clientId, 'imagePosition', value);
				} }
			/>
		);
	}

	if (blockSettings && blockSettings.imagePositionPromo) {
		imagePositionPromoPanel = (
			<SelectControl
				label="Image position"
				value={ blockAttributes.imagePositionPromo }
				options={ [
					{ label: 'Image right', value: 'right' },
					{ label: 'Image Left', value: 'left' },
				] }
				onChange={ ( value ) => {
					onChangeSettings(clientId, 'imagePositionPromo', value);
				} }
			/>
		);
	}

	if (blockSettings && blockSettings.imageSize) {
		imageSizePanel = (
			<SelectControl
				label="Image size"
				value={ blockAttributes.imageSize }
				options={ [
					{ label: 'Small', value: 'small' },
					{ label: 'Medium', value: 'medium' },
					{ label: 'Large', value: 'large' },
				] }
				onChange={ ( value ) => {
					onChangeSettings(clientId, 'imageSize', value);
				} }
			/>
		);
	}

	if (blockSettings && blockSettings.spaceSize) {
		spaceSizePanel = (
			<SelectControl
				label="Space size"
				value={ blockAttributes.spaceSize }
				options={ [
					{ label: 'Small', value: 'small' },
					{ label: 'Medium', value: 'none' },
				] }
				onChange={ ( value ) => {
					onChangeSettings(clientId, 'spaceSize', value);
				} }
			/>
		);
	}

	if (blockSettings && blockSettings.bgColor) {
		const bgColors = [
			{name: 'None', slug: 'none', color: '#FFFFFF'},
			{name: 'Black', slug: 'black',  color: '#1D1D1D'},
			{name: 'Yellow', slug: 'yellow', color: '#FAE053'},
			{name: 'Blue', slug: 'blue',  color: '#D3EEFF'},
		];

		let bgColor = blockAttributes.bgColor;

		bgPanel = (
			<>
				<BaseControl label="Background color">
					<ColorPalette
						colors={ bgColors }
						value={ getColorObjectByAttributeValues(bgColors, bgColor)?.color }
						onChange={ ( newColor ) => {
								if (newColor) {
									onChangeSettings(clientId, 'bgColor', getColorObjectByColorValue(bgColors, newColor)?.slug);
								}
							} }
						disableCustomColors={ true }
						clearable={ false }
					/>
				</BaseControl>
			</>
		);
	}

	if (blockSettings && blockSettings.textColor) {
		let textColor = blockAttributes.textColor;
		textColorPanel = (
			<ToggleControl
				label="Invert text color"
				checked={ textColor !== 'none' ? true : false }
				onChange={ (value) => {
					const textColor = value ? 'white' : 'none';
					onChangeSettings(clientId, 'textColor', textColor);
				} }
			/>
		);
	}

	if (blockSettings && blockSettings.divider) {
		let divider = blockAttributes.divider;
		dividerPanel = (
			<ToggleControl
				label="Divider"
				checked={ divider !== 'none' ? true : false }
				onChange={ (value) => {
					const divider = value ? 'line' : 'none';
					onChangeSettings(clientId, 'divider', divider);
				} }
			/>
		);
	}


	if (
		imagePositionPanel
		|| imageSizePanel
		|| bgPanel
		|| textColorPanel
		|| imagePositionPromoPanel
		|| spaceSizePanel
		|| dividerPanel
	) {
		inspectorControls = (
			<InspectorControls>
				<PanelBody
					title="Block settings"
					initialOpen={true}
				>
					{ imagePositionPanel }
					{ imagePositionPromoPanel }
					{ imageSizePanel }
					{ spaceSizePanel }
					{ bgPanel }
					{ textColorPanel }
					{ dividerPanel }
				</PanelBody>
			</InspectorControls>
		)
	}

	return inspectorControls;
}

export default getInspectorControls;