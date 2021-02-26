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
					attribute: 'data-itemID',
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
					attribute: 'data-imageID',
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
			parentBlockAttributes: select(
				'core/block-editor'
			).getBlockAttributes( parentClientId ),
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

		console.log(111,content);

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

		const features = content.map((item, index) => {
			return (
				<tr>
					<td width={"24"} className={"feature__image"}>
						<MediaUpload
							onSelect={ ( media ) => {
								setAttributes( {
									mediaURL: media.url,
									mediaID: media.id,
								} );
							} }
							allowedTypes={ [ 'image' ] }
							value={ mediaID }
							render={ ( { open } ) => (
								<img
									alt={ '' }
									width={"24"}
									height={"24"}
									id={`image-${index}`}
									src={
										! mediaID
											? defaultIcon
											: mediaURL
									}
									onClick={ open }
								/>
							) }
						/>
					</td>
					<td width={"16"}>&nbsp;&nbsp;&nbsp;</td>
					<td className={"feature__content"}>
						<RichText
							value={ item.value }
							placeholder={ placeholder }
							keepPlaceholderOnFocus={ true }
							multiline
							allowedFormats={[
								'core/bold',
								'core/italic',
								'core/link',
							]}
							onChange={ ( value ) => {
								if (value.indexOf('<p></p>') > 0) {

									const newLine = [...content];
									newLine.splice(index + 1, 0, {value: '', imageUrl: ''});
									setAttributes({content: newLine});
								} else {
									const newContent = [...content];
									newContent[index].value = value;
									setAttributes({content: newContent});
								}
							} }
							onRemove={ () => {
								const newContent = [...content];
								newContent.splice(index, 1);
								setAttributes({ content: newContent });
							} }
						/>
					</td>
				</tr>
			);
		});

		const imgContent = content.map((v, i)=>{
			return (
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
							src={
								! v.imageId
									? defaultIcon
									: v.imageUrl
							}
							onClick={ open }
						/>
					) }
				/>
			)
		});
		const liContent = content.map((v, i)=>{
			const img = '<img src="' + (v.imageId ? v.imageUrl : defaultIcon) + '" width="16" onclick="jQuery(\'#image-' + clientId + '-' + i +'\').click();" />';
			return v.value.replace(
				'<p>',
				'<p>' + img
			);
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
				<table className={"feature"}>
					<tbody>
					</tbody>
				</table>
				<div className={'features__admin-images'}>
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
							const oldImg = el.getElementsByTagName('img')[0];
							console.log(oldImg);
							const newEl = {itemId: k++};
							if (oldImg) {
								newEl.imageId = oldImg.getAttribute('data-imageId');
								newEl.imageUrl = oldImg.getAttribute('src');
								newEl.imageAlt = oldImg.getAttribute('alt');
								el.removeChild(oldImg);
							}

							newEl.value = el.innerHTML;
							newListItems.push(newEl);
						});
						console.log(1, newListItems);
						//setAttributes( { content: value, listItems: newListItems } );
					}}
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
		const { attributes } = props;

		const {
			content,
			mediaURL,
		} = attributes;

		const features = content.map((item, index) => {
			return (
				<tr className={"feature"} data-itemId={ item.itemId }>
					<td width={"24"} className={"feature__image"}>
						<img
							width={"24"}
							height={"24"}
							data-imageId={item.imageId ? item.imageId : 0}
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
