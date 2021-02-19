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

// Block Button (templateLock): preheader + header + blockText
import * as blockHeading from './blocks/block-heading';

// Block Cards (templateLock): card
import * as blockCards from './blocks/block-cards';

// Components
import * as cmText from './components/text';
import * as cmTextImage from './components/text-image';
import * as cmPromo from './components/promo';
import * as cmCards from './components/cards';
import * as cmSuperHead from './components/superhead';
import * as cmCTA from './components/cta';

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
	blockHeading,
	blockCards,

	cmText,
	cmTextImage,
	cmPromo,
	cmCards,
	cmSuperHead,
	cmCTA,
];

blocks.forEach( ( block ) => {
	const { name, settings } = block;

	return registerBlockType( name, settings );
} );
