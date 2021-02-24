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
			default: [{item: ''}],
			selector: 'td.feature__content',
			query: {
				item: {
					type: 'string',
					source: 'html',
				}
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
			linkHref,
			linkTarget,
			textAlign,
			linkContent,
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
							newContent.push({item: ''});
							setAttributes({ content: newContent });
						}}
					/>
					<ToolbarButton
						icon={ 'minus' }
						title={ 'Remove element' }
						onClick={ () => {
							const newContent = [...content];
							newContent.push({item: ''});
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
									src={
										! mediaID
											? '/wp-content/themes/lettera/images/components/features/icon_star.png'
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
							value={ item.item }
							placeholder={ placeholder }
							keepPlaceholderOnFocus={ true }
							multiline={false}
							allowedFormats={[
								'core/bold',
								'core/italic',
								'core/link',
							]}
							onChange={ ( value ) => {
								const newContent = [...content];
								newContent[index].item = value;
								setAttributes({ content: newContent });
							} }
							unstableOnSplit = { () => {console.log('add');}}
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
					{features}
					</tbody>
				</table>
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
				<tr>
					<td width={"24"} className={"feature__image"}>
						<img
							width={"24"}
							height={"24"}
							src={
								! mediaURL
									? '/wp-content/themes/lettera/images/components/features/icon_star.png'
									: mediaURL
							}
							alt={ 'Hero' }
						/>
					</td>
					<td width={"16"}>&nbsp;&nbsp;&nbsp;</td>
					<td className={"feature__content"}>
						<RichText.Content
							value={item.item}
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
