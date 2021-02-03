import { withSelect } from '@wordpress/data';
import { InnerBlocks, MediaUpload } from '@wordpress/block-editor';
import classnames from 'classnames';

import Container from '../../layout/container';
import Row from '../../layout/row';
import Column from '../../layout/column';
import getInspectorControls from '../../controls/getInspectorControls';
import removeComponentButton from '../../controls/removeComponentButton';

import { ReactComponent as componentIcon } from '../../../../svg/components/hero.svg';
import Spacer from "../../layout/spacer";

export const name = 'lettera/text-image';

export const settings = {
	title: 'Text with image',
	icon: componentIcon,
	category: 'common',
	attributes: {
		mediaID: {
			type: "number"
		},
		mediaURL: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "src"
		},
		textAlign: {
			type: 'string',
			default: 'text-left',
		},
		bgColor: {
			type: 'string',
			default: 'none',
		},
		blockSettings: {
			type: 'object',
			default: {
				textAlign: 'right',
				bgColor: 'none',
			},
		},
	},
	example: {
		attributes: {
			blockSettings: {
				imagePosition: 'right',
				imageSize: 'medium',
				bgColor: 'none',
				textColor: 'none',
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

		const classContainer = [];

		if ( bgColor !== undefined && bgColor !== 'none' ) {
			classContainer.push( 'background-' + bgColor );
		}

		const MY_TEMPLATE = [
			[
				'lettera/preheader',
				{ placeholder: 'Preheader', textAlign: 'text-center' },
			],
			[
				'lettera/header',
				{
					placeholder: 'Header',
					level: 1,
					addClass: [ 'text-center' ],
				},
			],
			[ 'lettera/block-text', { textAlign } ],
			[
				'lettera/block-btn',
				{
					buttonAltText: true,
					defaultButtonType: 'button-main',
					textAlign: 'text-center',
				},
			],
		];

		const ALLOWED_BLOCKS = [
			'lettera/preheader',
			'lettera/header',
			'lettera/heading',
			'lettera/paragraph',
			'lettera/list',
			'lettera/btn',
			'lettera/text-small',
			'lettera/block-text',
			'lettera/block-btn',
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
								onSelect={ (media) => {
									setAttributes( {
										mediaURL: media.url,
										mediaID: media.id,
									} );
								} }
								allowedTypes={["image"]}
								value={ mediaID }
								render={ ( { open } ) => (
									<img
										src={ ! mediaID ? ("/wp-content/themes/lettera/images/components/hero.png") : (mediaURL)}
										className={ "calypso-promo__image" }
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
			attributes: { mediaURL, bgColor },
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
						{ mediaURL ? (
							<img
								className="calypso-promo__image"
								src={ mediaURL }
								alt="Promo image"
							/>
						) : (
							<img src="/wp-content/themes/lettera/images/components/hero.png" alt={ 'Promo image' } className={ "calypso-promo__image" } />
						) }
						<Spacer height={ '32' } />
						<Column className={ classnames( 'text-center' ) }>
							<InnerBlocks.Content />
						</Column>
					</Row>
				</Container>
			</>
		);
	},
};
