import { withSelect } from '@wordpress/data';
import { InnerBlocks, MediaUpload } from '@wordpress/block-editor';
import classnames from 'classnames';

import Container from '../../layout/container';
import Row from '../../layout/row';
import Columns from '../../layout/columns';
import Column from '../../layout/column';
import Spacer from '../../layout/spacer';
import getInspectorControls from '../../controls/getInspectorControls';
import removeComponentButton from '../../controls/removeComponentButton';

import { ReactComponent as componentIcon } from '../../../../svg/components/promo.svg';

export const name = 'devmail/promo';

export const settings = {
	title: 'Promo',
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
			default: 'Lettera: Promo block',
		},
		mediaWidth: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'width',
			default: 276,
		},
		mediaHeight: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'height',
			default: 276,
		},
		imagePosition: {
			type: 'string',
			default: 'left',
		},
		bgColor: {
			type: 'string',
			default: 'none',
		},
		blockSettings: {
			type: 'object',
			default: {
				imagePosition: 'left',
				bgColor: 'none',
			},
		},
	},
	example: {
		attributes: {
			blockSettings: {
				imagePosition: 'left',
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
			attributes: { content, mediaID, mediaURL, bgColor },
			clientId,
			setAttributes,
			className,
		} = props;

		const classContainer = [];

		if ( bgColor !== undefined && bgColor !== 'none' ) {
			classContainer.push( 'background-' + bgColor );
		}

		const MY_TEMPLATE = [
			[ 'devmail/preheader', { placeholder: 'Preheader' } ],
			[
				'devmail/header',
				{
					placeholder: 'Header',
					level: 1,
				},
			],
			[ 'devmail/block-text' ],
			[
				'devmail/block-btn',
				{
					buttonAltText: true,
					defaultButtonType: 'button-main',
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
						<Columns>
							<Column className={ classnames( 'text-center' ) }>
								<MediaUpload
									onSelect={ ( media ) => {
										const width = 276;
										const height = Math.ceil(
											( width / media.width ) *
												media.height
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
											alt={ '' }
											src={
												! mediaID
													? '/wp-content/themes/lettera/images/components/hero.png'
													: mediaURL
											}
											className={ 'promo__image' }
											onClick={ open }
										/>
									) }
								/>
							</Column>
							<Column>
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
						</Columns>
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

		const classContainer = [];

		if ( bgColor !== undefined && bgColor !== 'none' ) {
			classContainer.push( 'background-' + bgColor );
		}

		return (
			<>
				<Container
					className={ classnames( classContainer, className ) }
				>
					<Row>
						<Columns>
							<Column className={ classnames( 'text-center' ) }>
								<img
									className="promo__image"
									src={
										! mediaURL
											? '/wp-content/themes/lettera/images/components/hero.png'
											: mediaURL
									}
									alt={ mediaAlt }
									width={ mediaWidth }
									height={ mediaHeight }
								/>
								<Spacer height={ '8' } />
							</Column>
							<Column>
								<InnerBlocks.Content />
							</Column>
						</Columns>
					</Row>
				</Container>
			</>
		);
	},
};
