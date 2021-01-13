import {registerBlockType} from '@wordpress/blocks';

//Elements
import * as elText from './elements/text';

//Components
import * as cmCover from './components/cover';

const blocks = [
	elText,
	cmCover
];

function registerBlock(block) {
	const {name, settings} = block;
	registerBlockType(name, settings);
}

blocks.forEach(registerBlock);
