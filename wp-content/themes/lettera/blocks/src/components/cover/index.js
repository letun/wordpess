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
		textAlign: {
			type: "string",
			default: "text-left"
		},
		bgColor: {
			type: "string",
			default: "none",
		},
		blockSettings: {
			type: "object",
			default: {
				textAlign: "right",
				bgColor: "none",
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
			attributes: {content, bgColor, textAlign},
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

		let classContainer = [];

		if (bgColor !== undefined && bgColor !== 'none') {
			classContainer.push("background-" + bgColor);
		}

		const MY_TEMPLATE = [
			[ 'lettera/preheader', { placeholder: 'Preheader', addClass: ['text-gray', 'text-center'] } ],
			[ 'lettera/header', { placeholder: 'Header', level: 1, addClass: ['text-center'] } ],
			[ 'lettera/block-text', { textAlign: textAlign } ],
			[ 'lettera/block-btn', { button_text: true, defaultButtonType: 'button-main', textAlign: 'text-center' } ],
		];

		console.log(MY_TEMPLATE, textAlign);

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
				<Container className={ classnames(classContainer) }>
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

		let classContainer = [];

		if (bgColor !== undefined && bgColor !== 'none') {
			classContainer.push("background-" + bgColor);
		}

		return (
			<>
				<Container className={ classnames(classContainer) }>
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