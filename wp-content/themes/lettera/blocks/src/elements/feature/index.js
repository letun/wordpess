import { withSelect } from '@wordpress/data';
import { MediaUpload, RichText, BlockControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import classnames from 'classnames';

import getInspectorControls from '../../controls/getInspectorControls';
import LetteraConfig from '../../global/config';

import { ReactComponent as elementIcon } from '../../../../svg/components/features.svg';

export const name = 'lettera/feature';

const defaultFeatureIcon =
	'/wp-content/themes/lettera/images/components/features/icon_star.png';

export const settings = {
	title: 'Feature',
	icon: elementIcon,
	category: LetteraConfig.category,
	parent: LetteraConfig.childElemets.mainBlocks,
	attributes: {
		mediaId: {
			type: 'number',
		},
		mediaUrl: {
			type: 'string',
			source: 'attribute',
			selector: 'td.feature__image img',
			attribute: 'src',
			default: defaultFeatureIcon,
		},
		mediaAlt: {
			type: 'string',
			source: 'attribute',
			selector: 'td.feature__image img',
			attribute: 'alt',
		},
		content: {
			type: 'string',
			source: 'html',
			selector: 'td.feature__content p',
			default: '',
		},
		placeholder: {
			type: 'string',
			default: 'Text here…',
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
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'lettera/list' ],
				transform: ( { values } ) => {
					return createBlock( 'lettera/text', {
						values,
					} );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'lettera/list' ],
				transform: ( content ) => {
					return createBlock( 'lettera/list', content.content );
				},
			},
		],
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
			onReplace,
			onRemove,
			setAttributes,
			parentClientId,
			parentBlockAttributes,
			clientId,
			className,
		} = props;

		const {
			mediaId,
			mediaUrl,
			mediaAlt,
			content,
			placeholder,
			textAlign,
		} = attributes;

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

		const addClass = [];
		if ( textAlign === 'center' ) {
			addClass.push( 'text-center' );
		}

		return (
			<>
				<BlockControls>
					<Toolbar
						className={
							'components-toolbar-group--no-right-border'
						}
					>
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
				</BlockControls>
				{ inspectorControls }
				<table className={ classnames( 'feature', className ) }>
					<tbody>
						<tr>
							<td width={ '24' } className={ 'feature__image' }>
								<MediaUpload
									onSelect={ ( media ) => {
										setAttributes( {
											mediaUrl: media.url,
											mediaId: media.id,
											mediaAlt: media.alt
												? media.alt
												: media.title,
										} );
									} }
									allowedTypes={ [ 'image' ] }
									value={ mediaId }
									render={ ( { open } ) => (
										<img
											alt={ mediaAlt }
											src={
												! mediaId
													? defaultFeatureIcon
													: mediaUrl
											}
											className={ 'feature__image' }
											onClick={ open }
											width={ '24' }
											height={ '24' }
										/>
									) }
								/>
							</td>
							<td width={ '16' }>&nbsp;&nbsp;&nbsp;</td>
							<td className={ 'feature__content' }>
								<RichText
									multiline={ false }
									value={ content }
									placeholder={ placeholder }
									onChange={ ( value ) => {
										setAttributes( { content: value } );
									} }
									allowedFormats={ [
										'core/bold',
										'core/italic',
										'core/link',
									] }
									onSplit={ ( value ) => {
										return createBlock( 'lettera/feature', {
											content: value,
										} );
									} }
									onReplace={ onReplace }
									onRemove={ onRemove }
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</>
		);
	} ),
	save: ( props ) => {
		const { attributes, className } = props;

		const { mediaId, mediaUrl, mediaAlt, content } = attributes;

		return (
			content && (
				<table className={ classnames( 'features', className ) }>
					<tbody>
						<tr className={ 'feature' }>
							<td width={ '24' } className={ 'feature__image' }>
								<img
									width={ '24' }
									height={ '24' }
									src={
										! mediaId
											? defaultFeatureIcon
											: mediaUrl
									}
									alt={ mediaAlt }
								/>
							</td>
							<td width={ '16' }>&nbsp;&nbsp;&nbsp;</td>
							<td className={ 'feature__content' }>
								<p>
									<RichText.Content value={ content } />
								</p>
							</td>
						</tr>
					</tbody>
				</table>
			)
		);
	},
};
