import { withSelect } from '@wordpress/data';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import classnames from 'classnames';

import getInspectorControls from '../../controls/getInspectorControls';
import LetteraConfig from '../../global/config';

import { ReactComponent as headingIcon1 } from '../../../../svg/buttons/heading1.svg';
import { ReactComponent as headingIcon2 } from '../../../../svg/buttons/heading2.svg';
import { ReactComponent as headingIcon3 } from '../../../../svg/buttons/heading3.svg';
import { ReactComponent as headingIcon4 } from '../../../../svg/buttons/heading4.svg';
import { ReactComponent as headingIcon5 } from '../../../../svg/buttons/heading5.svg';
import { ReactComponent as headingIcon6 } from '../../../../svg/buttons/heading6.svg';
const headingIcons = {
	level1: headingIcon1,
	level2: headingIcon2,
	level3: headingIcon3,
	level4: headingIcon4,
	level5: headingIcon5,
	level6: headingIcon6,
};

export const name = 'lettera/header';

export const settings = {
	title: 'Header H1',
	icon: 'heading',
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'h1,h2,h3,h4,h5,h6',
		},
		level: {
			type: 'number',
			default: 1,
		},
		allowedLevels: {
			type: 'array',
			default: [ 1, 2, 3 ],
		},
		placeholder: {
			type: 'string',
			default: 'Write heading…',
		},
		addClass: {
			type: 'array',
			source: 'attribute',
			default: '',
		},
	},
	edit: withSelect( ( select, blockData ) => {
		const parentClientId = select(
			'core/block-editor'
		).getBlockHierarchyRootClientId( blockData.clientId );
		return {
			innerBlocks: select( 'core/block-editor' ).getBlocks(
				blockData.clientId
			),
			parentClientId,
			clientId: blockData.clientId,
			parentBlockAttributes: select(
				'core/block-editor'
			).getBlockAttributes( parentClientId ),
		};
	} )( ( props ) => {
		const {
			attributes,
			setAttributes,
			parentClientId,
			parentBlockAttributes,
			className,
		} = props;

		const {
			content,
			level,
			allowedLevels,
			placeholder,
			addClass,
		} = attributes;

		const inspectorControls = getInspectorControls(
			parentClientId,
			parentBlockAttributes
		);

		const classHeader = level > 1 ? 'h' + level : '';
		const classElement = [ classHeader, addClass ];

		const buttons = allowedLevels.map( ( targetLevel ) => {
			const isActive = targetLevel === level;

			return (
				<ToolbarButton
					icon={ headingIcons[ 'level' + targetLevel ] }
					title={ 'Heading ' + targetLevel }
					isActive={ isActive }
					value={ targetLevel }
					onClick={ () => setAttributes( { level: targetLevel } ) }
				/>
			);
		} );

		return (
			<>
				<BlockControls>
					<Toolbar>{ buttons }</Toolbar>
				</BlockControls>
				{ inspectorControls }
				<RichText
					identifier={ 'content' }
					tagName={ `h${ level }` }
					className={ classnames( className, classElement ) }
					onChange={ ( value ) =>
						setAttributes( { content: value } )
					}
					value={ content }
					placeholder={ placeholder }
					allowedFormats={ [] }
				/>
			</>
		);
	} ),
	save: ( props ) => {
		const { attributes, className } = props;

		const { content, level, addClass } = attributes;

		const classHeader = level > 1 ? 'h' + level : '';
		const classElement = [ classHeader, addClass ];

		return (
			content && (
				<RichText.Content
					tagName={ `h${ level }` }
					value={ content }
					className={ classnames( className, classElement ) }
				/>
			)
		);
	},
};
