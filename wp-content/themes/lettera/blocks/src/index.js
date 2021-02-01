import {registerBlockType} from "@wordpress/blocks";

// Elements
import * as elPreheader from "./elements/preheader";
import * as elHeader from "./elements/header";
import * as elHeading from "./elements/heading";
import * as elParagraph from "./elements/paragraph";
import * as elList from "./elements/list";
import * as elButtonMain from "./elements/button-main";
import * as elButtonSecondary from "./elements/button-secondary";
import * as elSmallText from "./elements/text-small";

// Block Template: text/list
import * as blockText from "./blocks/block-text";

// Block Button (templateLock): btn + small text
import * as blockBtn from "./blocks/block-btn";

// Components
import * as cmText from "./components/text";

const blocks = [
    elPreheader,
    elHeader,
    elHeading,
    elParagraph,
    elList,
    elButtonMain,
    elButtonSecondary,
    elSmallText,

    blockBtn,
    blockText,

    cmText
];

blocks.forEach((block) => {

    const {name, settings} = block;

    return registerBlockType(
        name,
        settings
    );

});
