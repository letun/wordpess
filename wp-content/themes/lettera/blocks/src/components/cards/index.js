import { withSelect } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';

import Container from '../../layout/container';
import Row from '../../layout/row';
import Column from '../../layout/column';
import getInspectorControls from '../../controls/getInspectorControls';
import removeComponentButton from '../../controls/removeComponentButton';

import { ReactComponent as componentIcon } from '../../../../svg/components/features.svg';

export const name = 'lettera/cards';

export const settings = {
	title: 'Cards',
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
			[ 'lettera/block-heading'],
			[ 'lettera/block-cards' ],
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
					<InnerBlocks
						template={ MY_TEMPLATE }
						templateLock="all"
						value={ content }
						onChange={ ( value ) =>
							setAttributes( { content: value } )
						}
					/>
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
					<InnerBlocks.Content />
				</Container>
			</>
		);
	},
};
