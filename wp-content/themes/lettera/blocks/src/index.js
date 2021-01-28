import {registerBlockType} from '@wordpress/blocks';

//Elements
import * as elPreheader from './elements/preheader';
import * as elHeader from './elements/header'
import * as elHeading from './elements/heading';
import * as elText from './elements/text';
import * as elList from './elements/list';
import * as elButtonMain from './elements/button-main';
import * as elButtonSecondary from './elements/button-secondary';
import * as elSmallText from './elements/text-small';

/* Block Template: text/list */
import * as blockText from './blocks/block-text';

/* Block Button (templateLock): btn + small text */
import * as blockBtn from './blocks/block-btn';

//Components
import * as cmCover from './components/cover';

const blocks = [
	elPreheader,
	elHeader,
	elHeading,
	elText,
	elList,
	elButtonMain,
	elButtonSecondary,
	elSmallText,

	blockBtn,
	blockText,

	cmCover
];

function registerBlock(block) {
	const {name, settings} = block;
	registerBlockType(name, settings);
}

blocks.forEach(registerBlock);
