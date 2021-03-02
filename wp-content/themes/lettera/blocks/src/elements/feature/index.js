import { withSelect } from '@wordpress/data';
import { MediaUpload, RichText, BlockControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import classnames from 'classnames';

import Column from '../../layout/column';

import ToolbarButtonLinkHref from '../../controls/toolbarButtonLinkHref';
import getInspectorControls from '../../controls/getInspectorControls';

import LetteraConfig from '../../global/config';

import { ReactComponent as elementIcon } from '../../../../svg/components/features.svg';

export const name = 'lettera/feature';

const defaultIcon = '/wp-content/themes/lettera/images/components/features/icon_star.png';

export const settings = {
	title: 'Feature',
	icon: elementIcon,
	category: LetteraConfig.category,
	parent: 'lettera/features',
	attributes: {
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			default: '/wp-content/themes/lettera/images/components/features/icon_star.png',
		},
		/*
		mediaURL: {
			type: 'array',
			source: 'query',
			default: [],
			selector: 'td.feature__image',
			query: {
				content: {
					source: 'attribute',
					selector: 'img',
					attribute: 'src',
				}
			},
		},
		*/
		content: {
			type: 'array',
			source: 'query',
			default: [{value: 'List 1', imageUrl: ''}],
			selector: 'tr.feature',
			query: {
				/*
				value: {
					type: 'string',
					source: 'html',
				},
				*/
				itemId: {
					type: 'string',
					source: 'attribute',
					selector: 'td.feature__image',
					attribute: 'data-item-id',
				},
				value: {
					type: 'string',
					source: 'html',
					selector: 'td.feature__content',
				},
				imageUrl: {
					type: 'string',
					source: 'attribute',
					selector: 'td.feature__image img',
					attribute: 'src',
				},
				imageAlt: {
					type: 'string',
					source: 'attribute',
					selector: 'td.feature__image img',
					attribute: 'alt',
				},
				imageId: {
					type: 'string',
					source: 'attribute',
					selector: 'td.feature__image img',
					attribute: 'data-image-id',
				},
			},
		},
		placeholder: {
			type: 'string',
			default: 'Features list here…',
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
			parentBlockAttributes: select('core/block-editor').getBlockAttributes( parentClientId ),
		};
	} )( ( props ) => {
		const {
			attributes,
			setAttributes,
			clientId,
			parentClientId,
			parentBlockAttributes,
			className,
		} = props;

		const {
			mediaID,
			mediaURL,
			content,
			placeholder,
		} = attributes;

		wp.element.useEffect( () => {
			if (
				parentBlockAttributes.blockAttributes &&
				parentBlockAttributes.blockAttributes.btnAlign
			) {
				if (
					parentBlockAttributes.blockAttributes.btnAlign === 'center'
				) {
					setAttributes( { textAlign: 'center' } );
				}
			}
		} );

		const inspectorControls = getInspectorControls(
			parentClientId,
			parentBlockAttributes
		);

		const toolbar = (
			<>
				<ToolbarGroup>
					<ToolbarButton
						icon={ 'plus' }
						title={ 'Add element' }
						onClick={ () => {
							const newContent = [...content];
							newContent.push({value: '', imageUrl: ''});
							setAttributes({ content: newContent });
						}}
					/>
				</ToolbarGroup>
			</>
		);

		const imgContent = content.map((v, i)=>{
			return (
				<div className={"features-admin__item"}>
					<MediaUpload
						onSelect={ ( media ) => {
							const newContent = [...content];
							newContent[i].imageId = media.id;
							newContent[i].imageUrl = media.url;
							newContent[i].imageAlt = media.alt ? media.alt : media.title;

							setAttributes({content: newContent});
						} }
						allowedTypes={ [ 'image' ] }
						value={ v.imageId }
						render={ ( { open } ) => (
							<img
								alt={ '' }
								width={"24"}
								height={"24"}
								id={`image-${clientId}-${i}`}
								className={"features-admin__image"}
								src={
									! v.imageId
										? defaultIcon
										: v.imageUrl
								}
								onClick={ open }
							/>
						) }
					/>
					<div className={"features-admin__text"} dangerouslySetInnerHTML={{ __html: v.value }} />
				</div>
			)
		});
		const liContent = content.map((v, i)=>{
			return `${v.value}`;
		}).join('');

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
					{ toolbar }
				</BlockControls>
				{ inspectorControls }
				<div className={'features-admin'}>
					<div className={'features-admin__content'}>
						{imgContent}
					</div>
					<RichText
						multiline="p"
						value={ liContent }
						onChange={ ( value ) => {
							const template = document.createElement('template');
							template.innerHTML = value;
							const newListItems = [];
							let k = 0;
							Array.from(template.content.childNodes).forEach(function(el) {
								const newEl = {itemId: k++};
								newEl.value = el.outerHTML;
								newListItems.push(newEl);
							});
							setAttributes( { content: newListItems } );
							k = 0;
							Array.from(document.getElementById("block-" + clientId).getElementsByClassName("block-editor-rich-text__editable")[0].childNodes).forEach(function (el) {
								el.setAttribute('data-item-id', k++);
							});
						}}
						allowedFormats={ [
							'core/bold',
							'core/italic',
							'core/link',
						] }
					/>
				</div>
			</>
		);
	} ),
	save: ( props ) => {
		const { attributes } = props;

		const {
			content,
		} = attributes;

		const features = content.map((item, index) => {
			return (
				<tr className={"feature"}>
					<td width={"24"} className={"feature__image"} data-item-id={ item.itemId }>
						<img
							width={"24"}
							height={"24"}
							data-image-id={item.imageId ? item.imageId : 0}
							src={
								! item.imageId
									? '/wp-content/themes/lettera/images/components/features/icon_star.png'
									: item.imageUrl
							}
							alt={ item.imageAlt }
						/>
					</td>
					<td width={"16"}>&nbsp;&nbsp;&nbsp;</td>
					<td className={"feature__content"}>
						<RichText.Content
							value={item.value}
						/>
					</td>
				</tr>
			);
		});

		return (
			<table className={"features"}>
				<tbody>
				{features}
				</tbody>
			</table>
		);
	},
};
