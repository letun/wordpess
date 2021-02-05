import { withSelect } from '@wordpress/data';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';

import classnames from 'classnames';

import getInspectorControls from '../../controls/getInspectorControls';
import LetteraConfig from '../../global/config';
import { ReactComponent as elementIcon } from '../../../../svg/elements/list.svg';
import { ReactComponent as listTypeUnorderedIcon } from '../../../../svg/buttons/listTypeUnordered.svg';
import { ReactComponent as listTypeOrderedIcon } from '../../../../svg/buttons/listTypeOrdered.svg';

export const name = 'lettera/list';

export const settings = {
	title: 'Calypso: List',
	icon: elementIcon,
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
	attributes: {
		ordered: {
			type: 'boolean',
			default: false,
		},
		content: {
			type: 'string',
			source: 'html',
			selector: 'ol,ul',
			multiline: 'li',
			default: '',
		},
		type: {
			type: 'string',
		},
		start: {
			type: 'number',
		},
		reversed: {
			type: 'boolean',
		},
		placeholder: {
			type: 'string',
			default: 'Write list…',
		},
		textAlign: {
			type: 'string',
			default: null,
		},
		canDelete: {
			type: 'boolean',
			default: false,
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
			attributes: {
				ordered,
				content,
				type,
				reversed,
				start,
				placeholder,
				textAlign,
			},
			setAttributes,
			clientId,
			parentClientId,
			parentBlockAttributes,
			className,
		} = props;

		wp.element.useEffect( () => {
			if (
				parentBlockAttributes.blockAttributes &&
				parentBlockAttributes.blockAttributes.textAlign
			) {
				if (
					parentBlockAttributes.blockAttributes.textAlign ===
					'component'
				) {
					setAttributes( {
						textAlign: parentBlockAttributes.textAlign,
					} );
				} else {
					setAttributes( {
						textAlign:
							parentBlockAttributes.blockSettings.textAlign,
					} );
				}
			}
		} );

		const inspectorControls = getInspectorControls(
			parentClientId,
			parentBlockAttributes
		);

		const tagName = ordered ? 'ol' : 'ul';
		const isOrdered = true;
		const isUnordered = false;

		const addClass = [];
		if ( textAlign === 'center' ) {
			addClass.push( 'text-center' );
		}

		return (
			<>
				{ inspectorControls }
				<RichText
					tagName={ tagName }
					multiline="li"
					onChange={ ( value ) => {
						setAttributes( { content: value } );
					} }
					value={ content }
					placeholder={ placeholder }
					start={ start }
					reversed={ reversed }
					type={ type }
					allowedFormats={ [
						'core/bold',
						'core/italic',
						'core/link',
					] }
					className={ classnames( addClass, className ) }
				/>
				<BlockControls>
					<Toolbar>
						<ToolbarButton
							icon={ 'trash' }
							title={ 'Remove block' }
							onClick={ () =>
								wp.data
									.dispatch( 'core/block-editor' )
									.removeBlock( clientId )
							}
						/>
					</Toolbar>
					<Toolbar
						className={
							'components-toolbar-group--no-right-border'
						}
					>
						<ToolbarButton
							icon={ listTypeUnorderedIcon }
							title={ 'Unordered list' }
							isActive={ tagName === 'ul' ? true : false }
							value={ isUnordered }
							onClick={ () =>
								setAttributes( { ordered: isUnordered } )
							}
						/>
						<ToolbarButton
							icon={ listTypeOrderedIcon }
							title={ 'Ordered list' }
							isActive={ tagName === 'ol' ? true : false }
							value={ isOrdered }
							onClick={ () =>
								setAttributes( { ordered: isOrdered } )
							}
						/>
					</Toolbar>
				</BlockControls>
			</>
		);
	} ),
	save: ( props ) => {
		const {
			attributes: { ordered, content, type, reversed, start, textAlign },
		} = props;
		const tagName = ordered ? 'ol' : 'ul';

		const addClass = [];
		if ( textAlign === 'center' ) {
			addClass.push( 'text-center' );
		}

		return (
			content && (
				<RichText.Content
					tagName={ tagName }
					value={ content }
					type={ type }
					reversed={ reversed }
					start={ start }
					multiline="li"
					className={ classnames( addClass ) }
				/>
			)
		);
	},
};
