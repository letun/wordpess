import { ToolbarButton } from '@wordpress/components';

const removeComponentButton = ( clientId ) => {
	return (
		<ToolbarButton
			icon={ 'trash' }
			title={ 'Remove block' }
			className={ 'la-remove-button' }
			onClick={ () => {
				wp.data.dispatch( 'core/block-editor' ).removeBlock( clientId );
			} }
		/>
	);
};

export default removeComponentButton;
