import { withSelect } from '@wordpress/data';
import {
	InnerBlocks,
	MediaUpload,
	InspectorControls,
	PanelColorSettings,
	ColorPalette,
	getColorObjectByColorValue,
	getColorObjectByAttributeValues,
} from '@wordpress/block-editor';
import {
	Button,
	Toolbar, ToolbarButton,
	ToggleControl, PanelBody, PanelRow, CheckboxControl, SelectControl, ColorPicker
} from '@wordpress/components';
import Icon from '../../global/icons';
import getInspectorControls from "../../global/getInspectorControls";
import classnames from "classnames";

import Container from "../../core/container";
import Row from "../../core/row";
import Columns from "../../core/columns";
import Column from "../../core/column";

export const name = 'lettera/cover';

export const settings = {
	title: 'Cover',
	icon: Icon.promo,
	category: 'nomi-blocks',
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
		imagePosition: {
			type: "string",
			default: "none",
		},
		imageSize: {
			type: "string",
			default: "medium",
		},
		bgColor: {
			type: "string",
			default: "none",
		},
		textColor: {
			type: "string",
			default: "none",
		},
		blockSettings: {
			type: "object",
			default: {
				imagePosition: "right",
				imageSize: "medium",
				bgColor: "none",
				textColor: "none",
			}
		}
	},
	example: {
		attributes: {
			blockSettings: {
				imagePosition: "right",
				imageSize: "medium",
				bgColor: "none",
				textColor: "none",
			}
		},
	},
	edit: withSelect( ( select, blockData ) => {
		return {
			innerBlocks: select( 'core/block-editor' ).getBlocks( blockData.clientId ),
			clientId: blockData.clientId
		};
	} )( props => {
		const {
			attributes: {content, mediaID, mediaURL, imagePosition, imageSize, bgColor, textColor},
			clientId,
			setAttributes,
			className,
		} = props;

		const onSelectImage = ( media ) => {
			setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};

		let classSection = [];
		classSection.push("calypso-block");

		let classPromo = 'row calypso-promo';
		let classCol1 = 'col-12';
		let classCol2 = 'col-12';
		let classBtn = '';
		if (imagePosition === 'center') {
			classBtn = 'btn-block--w512';
			classCol1 = "col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 offset-xl-2 col-xl-8 text-center calypso-promo__first";
			if (imageSize === 'small') {
				classCol2 = "col-12 col-md-8 offset-md-2 offset-xl-3 col-xl-6 text-center calypso-promo__second calypso-promo__second--center";
			} else if (imageSize === 'large') {
				classCol2 = "col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 offset-xl-1 col-xl-10 text-center calypso-promo__second calypso-promo__second--center";
			} else {
				classCol2 = "col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 offset-xl-2 col-xl-8 text-center calypso-promo__second calypso-promo__second--center";
			}
		} else {
			if (imagePosition === "left") {
				classPromo += " calypso-promo--xl-swap";
			}
			if (imageSize === 'small') {
				classCol1 = "col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 offset-xl-0 col-xl-7 calypso-promo__first align-center text-left";
				classCol2 = "col-12 col-md-10 offset-md-1 col-xl-5 offset-xl-0 calypso-promo__second text-center";
			} else if (imageSize === 'large') {
				classCol1 = "col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 offset-xl-0 col-xl-5 calypso-promo__first align-center text-left";
				classCol2 = "col-12 col-md-10 offset-md-1 col-xl-7 offset-xl-0 calypso-promo__second text-center";
			} else {
				classCol1 = "col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 offset-xl-0 col-xl-6 calypso-promo__first align-center text-left";
				classCol2 = "col-12 col-md-10 offset-md-1 col-xl-6 offset-xl-0 calypso-promo__second text-center";
			}
		}

		if (textColor === 'white') {
			classSection.push('text-white');
		}

		if (bgColor !== undefined && bgColor !== 'none') {
			classSection.push("calypso-background", "calypso-background--" + bgColor);
		}

		/*
		const MY_TEMPLATE = [
			[ 'calypso/preheader', { placeholder: 'Preheader', addClass: 'text-gray' } ],
			[ 'calypso/header', { placeholder: 'Header', level: 1 } ],
			[ 'calypso/block-text' ],
			[ 'calypso/block-btn' ],
		];
		*/

		const MY_TEMPLATE = [
			[ 'lettera/text', { placeholder: 'Text block', addClass: 'text-gray' } ],
		];


		const ALLOWED_BLOCKS = [
			'calypso/preheader',
			'calypso/header',
			'calypso/heading',
			'calypso/text',
			'calypso/list',
			'calypso/btn',
			'calypso/text-small',
			'calypso/block-text',
			'calypso/block-btn',
		];

		const inspectorControls = getInspectorControls(clientId, props.attributes);

		return (
			<>
				{ inspectorControls }
				<Container>
					<Row>
						<Columns>
							<Column>
								<InnerBlocks
									allowedBlocks={ ALLOWED_BLOCKS }
									template={ MY_TEMPLATE }
									templateLock="all"
									value={ content }
									onChange={ ( value ) => setAttributes( { content: value } ) }
								/>
							</Column>
							<Column>
								<MediaUpload
									onSelect={ onSelectImage }
									allowedTypes={["image"]}
									value={ mediaID }
									render={ ( { open } ) => (
										<img
											src={ ! mediaID ? ("/wp-content/themes/common/images/calypso-block/hero.png") : (mediaURL)}
											className={ "calypso-promo__image" }
											onClick={ open }
										/>
									) }
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
			attributes: { mediaURL, imagePosition, imageSize, bgColor, textColor}
		} = props;

		let classSection = ["calypso-block"];
		let classPromo = ["row", "calypso-promo"];
		let classCol1 = ["col-12"];
		let classCol2 = ["col-12"];
		if (imagePosition === 'center') {
			classCol1.push("col-md-10 offset-md-1 col-lg-10 offset-lg-1 offset-xl-2 col-xl-8 text-center calypso-promo__first");
			if (imageSize === 'small') {
				classCol2.push("col-md-8 offset-md-2 offset-xl-3 col-xl-6 text-center calypso-promo__second calypso-promo__second--center");
			} else if (imageSize === 'large') {
				classCol2.push("col-md-10 offset-md-1 col-lg-8 offset-lg-2 offset-xl-1 col-xl-10 text-center calypso-promo__second calypso-promo__second--center");
			} else {
				classCol2.push("col-md-10 offset-md-1 col-lg-8 offset-lg-2 offset-xl-2 col-xl-8 text-center calypso-promo__second calypso-promo__second--center");
			}
		} else {
			if (imagePosition === "left") {
				classPromo.push("calypso-promo--xl-swap");
			}
			if (imageSize === 'small') {
				classCol1.push("col-md-10 offset-md-1 col-lg-10 offset-lg-1 offset-xl-0 col-xl-7 calypso-promo__first align-center text-left");
				classCol2.push("col-md-10 offset-md-1 col-xl-5 offset-xl-0 calypso-promo__second text-center");
			} else if (imageSize === 'large') {
				classCol1.push("col-md-10 offset-md-1 col-lg-10 offset-lg-1 offset-xl-0 col-xl-5 calypso-promo__first align-center text-left");
				classCol2.push("col-md-10 offset-md-1 col-xl-7 offset-xl-0 calypso-promo__second text-center");
			} else {
				classCol1.push("col-md-10 offset-md-1 col-lg-10 offset-lg-1 offset-xl-0 col-xl-6 calypso-promo__first align-center text-left");
				classCol2.push("col-md-10 offset-md-1 col-xl-6 offset-xl-0 calypso-promo__second text-center");
			}
		}

		if (textColor === 'white') {
			classSection.push("text-white");
		}

		if (bgColor !== undefined && bgColor !== 'none') {
			classSection.push("calypso-background", "calypso-background--" + bgColor);
		}

		return (
			<>
				<Container>
					<Row>
						<Columns>
							<Column>
								<InnerBlocks.Content />
							</Column>
							<Column>
								{ mediaURL ? (
									<img
										className="calypso-promo__image"
										src={ mediaURL }
										alt="Promo image"
									/>
								) : (
									<img src="https://don16obqbay2c.cloudfront.net/wp-content/themes/common/images/calypso-block/hero.png" alt={ 'Promo image' } className={ "calypso-promo__image" } />
								) }
							</Column>
						</Columns>
					</Row>
				</Container>
			</>
		);
	},
};