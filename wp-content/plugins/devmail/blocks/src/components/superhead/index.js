import { withSelect } from '@wordpress/data';
import { InnerBlocks, MediaUpload } from '@wordpress/block-editor';
import classnames from 'classnames';

import Container from '../../layout/container';
import Row from '../../layout/row';
import Column from '../../layout/column';
import Spacer from '../../layout/spacer';
import getInspectorControls from '../../controls/getInspectorControls';
import removeComponentButton from '../../controls/removeComponentButton';

import { ReactComponent as componentIcon } from '../../../../svg/components/hero.svg';

export const name = 'devmail/superhead';

export const settings = {
	title: 'Superhead',
	icon: componentIcon,
	category: 'common',
	attributes: {
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		mediaAlt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
			default: 'Lettera: Superheader block',
		},
		mediaWidth: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'width',
			default: 584,
		},
		mediaHeight: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'height',
			default: 285,
		},
		bgColor: {
			type: 'string',
			default: 'none',
		},
		textAlign: {
			type: 'string',
			default: 'text-left',
		},
		blockSettings: {
			type: 'object',
			default: {
				textAlign: 'right',
				bgColor: 'none',
			},
		},
		blockAttributes: {
			type: 'object',
			default: {
				headerAlign: 'center',
				textAlign: 'component',
				btnAlign: 'center',
			},
		},
	},
	example: {
		attributes: {
			blockSettings: {
				textAlign: 'right',
				bgColor: 'none',
			},
		},
	},
	edit: withSelect( ( select, blockData ) => {
		return {
			innerBlocks: select( 'core/block-editor' ).getBlocks(
				blockData.clientId
			),
			clientId: blockData.clientId,
		};
	} )( ( props ) => {
		const {
			attributes: { content, mediaID, mediaURL, bgColor, textAlign },
			clientId,
			setAttributes,
			className,
		} = props;

		const classContainer = [ 'superhead' ];

		if ( bgColor !== undefined && bgColor !== 'none' ) {
			classContainer.push( 'background-' + bgColor );
		}

		const MY_TEMPLATE = [
			[
				'devmail/header',
				{
					placeholder: 'Preheader',
					allowedLevels: [ 2 ],
					level: 2,
					textAlign: 'text-center',
				},
			],
			[
				'devmail/header',
				{
					placeholder: 'Header',
					allowedLevels: [ 1, 2 ],
					level: 1,
					addClass: [ 'text-center', 'superhead__title' ],
				},
			],
			[ 'devmail/block-text', { textAlign } ],
			[
				'devmail/block-btn',
				{
					buttonAltText: true,
					defaultButtonType: 'button-main',
					textAlign: 'center',
				},
			],
		];

		const ALLOWED_BLOCKS = [
			'devmail/preheader',
			'devmail/header',
			'devmail/paragraph',
			'devmail/list',
			'devmail/btn',
			'devmail/text-small',
			'devmail/block-text',
			'devmail/block-btn',
		];

		const inspectorControls = getInspectorControls(
			clientId,
			props.attributes
		);
		const removeComponent = removeComponentButton( clientId );

		return (
			<>
				{ inspectorControls }
				<Container
					className={ classnames( classContainer, className ) }
				>
					{ removeComponent }
					<Row>
						<Column className={ classnames( 'text-center' ) }>
							<MediaUpload
								onSelect={ ( media ) => {
									const width = 584;
									const height = Math.ceil(
										( width / media.width ) * media.height
									);
									setAttributes( {
										mediaURL: media.url,
										mediaID: media.id,
										mediaAlt: media.alt
											? media.alt
											: media.title,
										mediaWidth: width,
										mediaHeight: height,
									} );
								} }
								allowedTypes={ [ 'image' ] }
								value={ mediaID }
								render={ ( { open } ) => (
									<img
										alt={ 'Promo' }
										src={
											! mediaID
												? '/wp-content/themes/lettera/images/components/hero.png'
												: mediaURL
										}
										className={ 'superhead__image' }
										onClick={ open }
									/>
								) }
							/>
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ MY_TEMPLATE }
								templateLock="all"
								value={ content }
								onChange={ ( value ) =>
									setAttributes( { content: value } )
								}
							/>
						</Column>
					</Row>
				</Container>
			</>
		);
	} ),
	save: ( props ) => {
		const {
			className,
			attributes: {
				mediaURL,
				bgColor,
				mediaWidth,
				mediaHeight,
				mediaAlt,
			},
		} = props;

		const classContainer = [ 'superhead' ];

		if ( bgColor !== undefined && bgColor !== 'none' ) {
			classContainer.push( 'background-' + bgColor );
		}

		return (
			<>
				<Container
					className={ classnames( classContainer, className ) }
				>
					<Row>
						<Column className={ classnames( 'text-center' ) }>
							<img
								className="superhead__image"
								src={
									! mediaURL
										? '/wp-content/themes/lettera/images/components/hero.png'
										: mediaURL
								}
								alt={ mediaAlt }
								width={ mediaWidth }
								height={ mediaHeight }
							/>
							<Spacer height={ '32' } />
							<InnerBlocks.Content />
						</Column>
					</Row>
				</Container>
			</>
		);
	},
};
