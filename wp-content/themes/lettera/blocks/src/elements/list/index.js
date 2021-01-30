import { withSelect } from '@wordpress/data';
import {
	RichText,
	BlockControls,
	RichTextToolbarButton,
} from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import Icon from '../../global/icons';
import getInspectorControls from "../../controls/getInspectorControls";
import LetteraConfig from "../../global/config";
import classnames from "classnames";

export const name = 'lettera/list';

export const settings = {
	title: 'Calypso: List',
	icon: Icon.list,
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
	attributes: {
		ordered: {
			type: "boolean",
			default: false
		},
		values: {
			"type": "string",
			"source": "html",
			"selector": "ol,ul",
			"multiline": "li",
			"default": ""
		},
		type: {
			type: "string"
		},
		start: {
			type: "number"
		},
		reversed: {
			type: "boolean"
		},
		placeholder: {
			type: "string",
			default: 'Write list…',
		},
		textAlign: {
			type: "string",
			default: null
		},
		isGlobalTextAlign: {
			type: "boolean",
			default: false
		},
		canDelete: {
			type: 'boolean',
			default: false
		}
	},
	edit: withSelect( ( select, blockData ) => {
		const parentClientId = select( 'core/block-editor' ).getBlockHierarchyRootClientId( blockData.clientId );
		return {
			innerBlocks: select( 'core/block-editor' ).getBlocks( blockData.clientId ),
			parentClientId: parentClientId,
			clientId: blockData.clientId,
			parentBlockAttributes: select( 'core/block-editor' ).getBlockAttributes( parentClientId ),
		};
	} )( props => {
		const {
			attributes: { ordered, values, type, reversed, start, placeholder, textAlign, isGlobalTextAlign },
			setAttributes,
			clientId,
			parentClientId,
			parentBlockAttributes,
			className,
		} = props;

		wp.element.useEffect(() => {
			if (isGlobalTextAlign) {
				setAttributes({textAlign: parentBlockAttributes.textAlign});
			}
		});

		const inspectorControls = getInspectorControls(parentClientId, parentBlockAttributes);

		const tagName = ordered ? 'ol' : 'ul';
		const isOrdered = true;
		const isUnordered = false;

		let addClass = [];
		if ( textAlign === 'text-center' ) {
			addClass.push('text-center');
		}

		return (
			<>
				{ inspectorControls }
				<RichText
					tagName={tagName}
					multiline="li"
					onChange={ ( value ) => { setAttributes( { values: value } ) } }
					value={ values }
					placeholder={ placeholder }
					start={ start }
					reversed={ reversed }
					type={ type }
					allowedFormats={[ 'core/bold', 'core/italic', 'core/link' ] }
					className={ classnames(addClass, className) }
				/>
				<BlockControls>
					<Toolbar>
						<ToolbarButton
							icon={ 'trash' }
							title={ 'Remove block' }
							onClick={ () => wp.data.dispatch( 'core/block-editor' ).removeBlock(clientId) }
						/>
					</Toolbar>
					<Toolbar className={"components-toolbar-group--no-right-border"}>
						<ToolbarButton
							icon={ Icon._list['unordered'] }
							title={'Unordered list'}
							isActive={tagName == 'ul' ? true : false}
							value={isUnordered}
							onClick={ () => setAttributes( { ordered: isUnordered } ) }
						/>
						<ToolbarButton
							icon={ Icon._list['ordered'] }
							title={'Ordered list'}
							isActive={tagName == 'ol' ? true : false}
							value={isOrdered}
							onClick={ () => setAttributes( { ordered: isOrdered } ) }
						/>
					</Toolbar>
				</BlockControls>
			</>
		);
	}),
	save: ( props ) => {
		const {
			attributes: {ordered, values, type, reversed, start, textAlign}
		} = props;
		const tagName = ordered ? 'ol' : 'ul';

		let addClass = [];
		if (textAlign === 'text-center') {
			addClass.push('text-center');
		}

		return (
			values && <RichText.Content
				tagName={ tagName }
				value={ values }
				type={ type }
				reversed={ reversed }
				start={ start }
				multiline="li"
				className={ classnames(addClass) }
			/>
		);
	},
};