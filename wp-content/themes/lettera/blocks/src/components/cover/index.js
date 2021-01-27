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
import Icon from '../../global/icons';
import getInspectorControls from "../../controls/getInspectorControls";
import classnames from "classnames";

import Container from "../../layout/container";
import Row from "../../layout/row";
import Column from "../../layout/column";

export const name = 'lettera/cover';

export const settings = {
	title: 'Cover',
	icon: Icon.promo,
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

		if (bgColor !== undefined && bgColor !== 'none') {
			classSection.push("calypso-background", "calypso-background--" + bgColor);
		}

		const MY_TEMPLATE = [
			[ 'lettera/preheader', { placeholder: 'Preheader', addClass: ['text-gray', 'text-center'] } ],
			[ 'lettera/header', { placeholder: 'Header', level: 1, addClass: ['text-center'] } ],
			[ 'lettera/block-text', { addClass: ['text-center'] } ],
			[ 'lettera/block-btn', { button_text: true, button_type: 'button-main', addClass: ['text-center'] } ],
		];

		const ALLOWED_BLOCKS = [
			'lettera/preheader',
			'lettera/header',
			'lettera/heading',
			'lettera/text',
			'lettera/list',
			'lettera/btn',
			'lettera/text-small',
			'lettera/block-text',
			'lettera/block-btn',
		];

		const inspectorControls = getInspectorControls(clientId, props.attributes);

		return (
			<>
				{ inspectorControls }
				<Container>
					<Row>
						<Column className={classnames('text-center')}>
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ MY_TEMPLATE }
								templateLock="all"
								value={ content }
								onChange={ ( value ) => setAttributes( { content: value } ) }
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
						<Column className={ classnames('text-center') }>
							<InnerBlocks.Content />
						</Column>
					</Row>
				</Container>
			</>
		);
	},
};