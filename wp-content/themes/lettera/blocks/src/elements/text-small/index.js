import { withSelect } from '@wordpress/data';
import { RichText } from '@wordpress/block-editor';
import classnames from 'classnames';

import getInspectorControls from '../../controls/getInspectorControls';
import LetteraConfig from '../../global/config';

import { ReactComponent as elementIcon } from '../../../../svg/elements/preheader.svg';

export const name = 'lettera/text-small';

export const settings = {
	title: 'Small text',
	icon: elementIcon,
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'p.text-small',
		},
		placeholder: {
			type: 'string',
			default: 'Text bellow button…',
		},
		textAlign: {
			type: 'string',
			default: 'left',
		},
		addClass: {
			type: 'array',
			default: null,
		},
	},
	edit: withSelect( ( select, blockData ) => {
		const parentClientId = select(
			'core/block-editor'
		).getBlockHierarchyRootClientId( blockData.clientId );

		return {
			clientId: blockData.clientId,
			parentClientId,
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

		const inspectorControls = getInspectorControls(
			parentClientId,
			parentBlockAttributes
		);

		const elementClass = [];
		if ( textAlign === 'center' ) {
			elementClass.push( 'text-center' );
		}

		return (
			<>
				{ inspectorControls }
				<RichText
					identifier="content"
					tagName="p"
					className={ classnames(
						className,
						'text-small',
						addClass,
						elementClass
					) }
					onChange={ ( value ) =>
						setAttributes( { content: value } )
					}
					value={ content }
					placeholder={ placeholder }
					allowedFormats={ [
						'core/bold',
						'core/italic',
						'core/link',
					] }
				/>
			</>
		);
	} ),
	save: ( props ) => {
		const {
			attributes: { className, content, addClass, textAlign },
		} = props;

		const elementClass = [];
		if ( textAlign === 'center' ) {
			elementClass.push( 'text-center' );
		}

		return (
			content && (
				<RichText.Content
					tagName="p"
					value={ content }
					className={ classnames(
						className,
						'text-small',
						addClass,
						elementClass
					) }
				/>
			)
		);
	},
};
