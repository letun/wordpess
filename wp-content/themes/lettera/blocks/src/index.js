import { registerBlockType } from '@wordpress/blocks';

// Elements
import * as elPreheader from './elements/preheader';
import * as elHeader from './elements/header';
import * as elParagraph from './elements/paragraph';
import * as elList from './elements/list';
import * as elButtonMain from './elements/button-main';
import * as elButtonSecondary from './elements/button-secondary';
import * as elSmallText from './elements/text-small';

// Block Template: text/list
import * as blockText from './blocks/block-text';

// Block Button (templateLock): btn + small text
import * as blockBtn from './blocks/block-btn';

// Components
import * as cmText from './components/text';
import * as cmTextImage from './components/text-image';
import * as cmPromo from './components/promo';

const blocks = [
	elPreheader,
	elHeader,
	elParagraph,
	elList,
	elButtonMain,
	elButtonSecondary,
	elSmallText,

	blockBtn,
	blockText,

	cmText,
	cmTextImage,
	cmPromo,
];

blocks.forEach( ( block ) => {
	const { name, settings } = block;

	return registerBlockType( name, settings );
} );
