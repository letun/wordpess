import {registerBlockType} from '@wordpress/blocks';

//Elements
import * as elText from './elements/text';

const blocks = [
	elText
];

function registerBlock(block) {
	const {name, settings} = block;
	registerBlockType(name, settings);
}

blocks.forEach(registerBlock);
