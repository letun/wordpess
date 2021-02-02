import {withState} from "@wordpress/compose";
import {
    Toolbar,
    ToolbarButton,
    Popover,
    ToggleControl
} from "@wordpress/components";
import {URLInput} from "@wordpress/block-editor";
import {Component} from "@wordpress/element";
import {link} from "@wordpress/icons";

/* global wp */
const {"__experimentalLinkControl": LinkControl} = wp.blockEditor;

class toolbarButtonLinkHref extends Component {

    render () {

        const {
            linkHref,
            linkTarget,
            isActive,
            onChange,
            setState
        } = this.props;

        return (
            <Toolbar>
                <ToolbarButton
                    icon={link}
                    isPressed={isActive}
                    onClick={() => setState(() => ({"isActive": !isActive}))}
                />
                {isActive &&
                    <Popover
                        position="bottom center"
                        focusOnMount="container"
                        noArrow={false}
                        renderSettings={() => <ToggleControl
                            label={"Open in new tab"}
                            checked={linkTarget}
                            onChange={this.setTarget}
                        />}
                    >
                        <LinkControl
                            value={{"url": linkHref}}
                            onChange={onChange}
                            showSuggestions={false}
                        />
                    </Popover>
                }
            </Toolbar>
        );

    }

}

export default withState()(toolbarButtonLinkHref);
