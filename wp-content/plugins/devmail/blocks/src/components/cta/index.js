import { withSelect } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';

import Container from '../../layout/container';
import Row from '../../layout/row';
import Column from '../../layout/column';
import getInspectorControls from '../../controls/getInspectorControls';
import removeComponentButton from '../../controls/removeComponentButton';

import { ReactComponent as componentIcon } from '../../../../svg/components/cta.svg';

export const name = 'devmail/cta';

export const settings = {
	title: 'Call to action',
	icon: componentIcon,
	category: 'common',
	attributes: {
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
				textAlign: 'left',
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
				textAlign: 'left',
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
			attributes: { content, bgColor },
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
					level: 2,
					allowedLevels: [ 2, 3 ],
				},
			],
			[ 'devmail/block-text' ],
			[
				'devmail/block-btn',
				{
					buttonAltText: true,
					defaultButtonType: 'button-secondary',
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
			attributes: { bgColor },
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
						<Column className={ classnames( 'text-center' ) }>
							<InnerBlocks.Content />
						</Column>
					</Row>
				</Container>
			</>
		);
	},
};
