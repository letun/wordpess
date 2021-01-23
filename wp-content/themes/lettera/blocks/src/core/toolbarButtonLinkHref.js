import { withState } from '@wordpress/compose';
import {
	Toolbar, ToolbarButton,
	Button, Popover, ToggleControl
} from '@wordpress/components';
import { URLInput } from '@wordpress/block-editor';
import { useRef, Component } from '@wordpress/element';
import { link } from '@wordpress/icons';
const {__experimentalLinkControl: LinkControl} = wp.blockEditor;

class toolbarButtonLinkHref extends Component {
	render() {
		const { linkHref, isActive, onChange, setState } = this.props;

		return (
			<Toolbar>
				<ToolbarButton
					icon={ link }
					isPressed={ isActive }
					onClick={ () => { setState( state => ( { isActive: !isActive } ) ); } }
				/>
				{isActive && (
					<Popover
						position="bottom center"
						focusOnMount="container"
						noArrow={ false }
						renderSettings={ () => (
							<ToggleControl
								label={ __( 'Open in new tab' ) }
								checked={ opensInNewWindow }
								onChange={ this.setTarget }
							/>
						) }
					>
						<LinkControl
							value={ {url: linkHref} }
							onChange={ onChange }
							showSuggestions={ false }
						/>
					</Popover>
				) }
			</Toolbar>
		);
	}
}

export default withState()(toolbarButtonLinkHref);
