import { registerBlockType } from '@wordpress/blocks';

// Elements
import * as elPreheader from './elements/preheader';
import * as elHeader from './elements/header';
import * as elParagraph from './elements/paragraph';
import * as elList from './elements/list';
import * as elButtonMain from './elements/button-main';
import * as elButtonSecondary from './elements/button-secondary';
import * as elSmallText from './elements/text-small';
import * as elCard from './elements/card';

// Block Template: text/list
import * as blockText from './blocks/block-text';

// Block Button (templateLock): btn + small text
import * as blockBtn from './blocks/block-btn';

// Block Cards (templateLock): card
import * as blockCard from './blocks/block-cards';

// Components
import * as cmText from './components/text';
import * as cmTextImage from './components/text-image';
import * as cmPromo from './components/promo';
import * as cmCards from './components/cards';

const blocks = [
	elPreheader,
	elHeader,
	elParagraph,
	elList,
	elButtonMain,
	elButtonSecondary,
	elSmallText,
	elCard,

	blockBtn,
	blockText,
	blockCard,

	cmText,
	cmTextImage,
	cmPromo,
	cmCards,
];

blocks.forEach( ( block ) => {
	const { name, settings } = block;

	return registerBlockType( name, settings );
} );
