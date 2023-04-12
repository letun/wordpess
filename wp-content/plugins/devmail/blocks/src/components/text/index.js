import { withSelect } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';
import { Icon } from '@wordpress/components';

import Container from '../../layout/container';
import Row from '../../layout/row';
import Column from '../../layout/column';
import getInspectorControls from '../../controls/getInspectorControls';
import removeComponentButton from '../../controls/removeComponentButton';

import { ReactComponent as componentIcon } from '../../../../svg/components/text.svg';

export const name = 'devmail/text';

export const settings = {
	title: 'Text',
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
		buttonType: {
			type: 'string',
			default: null,
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
					level: 1,
				},
			],
			[ 'devmail/block-text' ],
			[ 'devmail/block-btn' ],
		];

		const ALLOWED_BLOCKS = [
			'devmail/preheader',
			'devmail/header',
			'devmail/paragraph',
			'devmail/list',
			'devmail/button-main',
			'devmail/button-secondary',
			'devmail/text-small',
			'devmail/block-text',
			'devmail/block-btn',
		];

		const inspectorControls = getInspectorControls(
			clientId,
			props.attributes
		);
		const removeComponent = removeComponentButton( clientId );
		const iconEl = () => (
			<Icon icon={ <svg><path d="M10 2C4.478 2 0 5.425 0 9.646c0 1.404.503 2.717 1.366 3.846L.032 18 5.6 16.508c1.329.499 2.818.787 4.4.787 5.523 0 10-3.424 10-7.648C20 5.425 15.523 2 10 2zm-3.978 8.51c-.671 0-1.216-.547-1.216-1.223s.545-1.223 1.216-1.223c.673 0 1.217.547 1.217 1.223s-.544 1.223-1.217 1.223zm3.731 0c-.672 0-1.217-.547-1.217-1.223s.545-1.223 1.217-1.223 1.216.547 1.216 1.223-.544 1.223-1.216 1.223zm3.809 0c-.67 0-1.215-.547-1.215-1.223s.545-1.223 1.215-1.223c.674 0 1.217.547 1.217 1.223s-.543 1.223-1.217 1.223z" /></svg> } />
		);

		return (
			<>
				{ inspectorControls }
				<Container
					className={ classnames( classContainer, className ) }
				>
					{ removeComponent }
					<Row>
						<Column className={ classnames( 'text-center' ) }>
							<div>
								<p>123</p>
								<Icon icon={ <svg><path d="M10 2C4.478 2 0 5.425 0 9.646c0 1.404.503 2.717 1.366 3.846L.032 18 5.6 16.508c1.329.499 2.818.787 4.4.787 5.523 0 10-3.424 10-7.648C20 5.425 15.523 2 10 2zm-3.978 8.51c-.671 0-1.216-.547-1.216-1.223s.545-1.223 1.216-1.223c.673 0 1.217.547 1.217 1.223s-.544 1.223-1.217 1.223zm3.731 0c-.672 0-1.217-.547-1.217-1.223s.545-1.223 1.217-1.223 1.216.547 1.216 1.223-.544 1.223-1.216 1.223zm3.809 0c-.67 0-1.215-.547-1.215-1.223s.545-1.223 1.215-1.223c.674 0 1.217.547 1.217 1.223s-.543 1.223-1.217 1.223z" /></svg> } />
							</div>
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
							<div>
								<Icon icon={ <svg><path d="M10 2C4.478 2 0 5.425 0 9.646c0 1.404.503 2.717 1.366 3.846L.032 18 5.6 16.508c1.329.499 2.818.787 4.4.787 5.523 0 10-3.424 10-7.648C20 5.425 15.523 2 10 2zm-3.978 8.51c-.671 0-1.216-.547-1.216-1.223s.545-1.223 1.216-1.223c.673 0 1.217.547 1.217 1.223s-.544 1.223-1.217 1.223zm3.731 0c-.672 0-1.217-.547-1.217-1.223s.545-1.223 1.217-1.223 1.216.547 1.216 1.223-.544 1.223-1.216 1.223zm3.809 0c-.67 0-1.215-.547-1.215-1.223s.545-1.223 1.215-1.223c.674 0 1.217.547 1.217 1.223s-.543 1.223-1.217 1.223z" /></svg> } />
							</div>
							<InnerBlocks.Content />
						</Column>
					</Row>
				</Container>
			</>
		);
	},
};
