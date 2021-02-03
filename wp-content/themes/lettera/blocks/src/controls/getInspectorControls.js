import {
	ColorPalette,
	InspectorControls,
	getColorObjectByColorValue,
	getColorObjectByAttributeValues,
} from '@wordpress/block-editor';
import { BaseControl, PanelBody, SelectControl } from '@wordpress/components';

/* Update Main component (/components) attribute by ComponentClientId */
const onChangeSettings = ( clientId, name, value ) => {
	const componentBlock = wp.data
		.select( 'core/block-editor' )
		.getBlock( clientId );

	componentBlock.attributes[ name ] = value;
	wp.data
		.dispatch( 'core/block-editor' )
		.updateBlock( clientId, componentBlock );
};

/* Define all attribute panels by attribute name */
const panels = [];

panels.textAlign = ( clientId, value ) => {
	return (
		value && (
			<SelectControl
				label={ 'Text align' }
				value={ value }
				options={ [
					{
						label: 'Text left',
						value: 'text-left',
					},
					{
						label: 'Text center',
						value: 'text-center',
					},
				] }
				onChange={ ( newValue ) => {
					onChangeSettings( clientId, 'textAlign', newValue );
				} }
			/>
		)
	);
};

panels.bgColor = ( clientId, bgColor ) => {
	const bgColors = [
		{
			slug: 'none',
			name: 'None',
			color: '#FFFFFF',
		},
		{
			name: 'Black',
			slug: 'black',
			color: '#1D1D1D',
		},
		{
			name: 'Yellow',
			slug: 'yellow',
			color: '#FAE053',
		},
		{
			name: 'Blue',
			slug: 'blue',
			color: '#D3EEFF',
		},
	];

	return (
		bgColor && (
			<BaseControl id={ '' } label={ 'Background color' }>
				<ColorPalette
					colors={ bgColors }
					value={
						getColorObjectByAttributeValues( bgColors, bgColor )
							?.color
					}
					onChange={ ( newColor ) => {
						if ( newColor ) {
							onChangeSettings(
								clientId,
								'bgColor',
								getColorObjectByColorValue( bgColors, newColor )
									?.slug
							);
						}
					} }
					disableCustomColors={ true }
					clearable={ false }
					className={ 'la-inspector-control__color-panel' }
				/>
			</BaseControl>
		)
	);
};

const getInspectorControls = ( clientId, blockAttributes ) => {
	const getPanels = Object.keys( blockAttributes.blockSettings ).map(
		( key ) => panels[ key ]( clientId, blockAttributes[ key ] )
	);

	return (
		getPanels && (
			<InspectorControls className={ 'la-inspector-control' }>
				<PanelBody title={ 'Block settings' } initialOpen={ true }>
					{ getPanels }
				</PanelBody>
			</InspectorControls>
		)
	);
};

export default getInspectorControls;
