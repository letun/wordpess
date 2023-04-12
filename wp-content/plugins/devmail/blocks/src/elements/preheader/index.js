import { withSelect } from '@wordpress/data';
import { RichText } from '@wordpress/block-editor';
import classnames from 'classnames';

import getInspectorControls from '../../controls/getInspectorControls';
import LetteraConfig from '../../global/config';

import { ReactComponent as elementIcon } from '../../../../svg/elements/preheader.svg';

export const name = 'devmail/preheader';

export const settings = {
	title: 'Preheader',
	icon: elementIcon,
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'h4',
		},
		placeholder: {
			type: 'string',
			default: 'Write preheading…',
		},
		textAlign: {
			type: 'string',
			default: 'left',
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

		const { content, placeholder, addClass, textAlign } = attributes;

		wp.element.useEffect( () => {
			if (
				parentBlockAttributes.blockAttributes &&
				parentBlockAttributes.blockAttributes.headerAlign
			) {
				if (
					parentBlockAttributes.blockAttributes.headerAlign ===
					'center'
				) {
					setAttributes( { textAlign: 'center' } );
				}
			}
		} );

		const classElement = [ 'text-normal', 'text-gray', addClass ];
		if ( textAlign === 'center' ) {
			classElement.push( 'text-center' );
		}

		const inspectorControls = getInspectorControls(
			parentClientId,
			parentBlockAttributes
		);

		return (
			<>
				{ inspectorControls }
				<RichText
					identifier="content"
					tagName="h4"
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

		const { content, textAlign, addClass } = attributes;

		const classElement = [ 'text-normal', 'text-gray', addClass ];
		if ( textAlign === 'center' ) {
			classElement.push( 'text-center' );
		}

		return (
			content && (
				<RichText.Content
					tagName="h4"
					value={ content }
					className={ classnames( className, classElement ) }
				/>
			)
		);
	},
};
