import { withSelect } from '@wordpress/data';
import { MediaUpload, BlockControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import classnames from 'classnames';

import Spacer from '../../layout/spacer';

import getInspectorControls from '../../controls/getInspectorControls';
import LetteraConfig from '../../global/config';

import { ReactComponent as elementIcon } from '../../../../svg/components/hero.svg';

export const name = 'devmail/image';

export const settings = {
	title: 'Image',
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
			selector: 'img.image',
			attribute: 'src',
		},
		mediaAlt: {
			type: 'string',
			source: 'attribute',
			selector: 'img.image',
			attribute: 'alt',
			default: 'Lettera: example image element',
		},
		mediaWidth: {
			type: 'string',
			source: 'attribute',
			selector: 'img.image',
			attribute: 'width',
			default: 584,
		},
		mediaHeight: {
			type: 'string',
			source: 'attribute',
			selector: 'img.image',
			attribute: 'height',
			default: 265,
		},
		canDelete: {
			type: 'boolean',
			default: true,
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
			clientId,
			className,
		} = props;

		const { mediaId, mediaUrl, mediaAlt } = attributes;

		const inspectorControls = getInspectorControls(
			parentClientId,
			parentBlockAttributes
		);

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
				<MediaUpload
					onSelect={ ( media ) => {
						const width = 584;
						const height = Math.ceil(
							( width / media.width ) * media.height
						);
						setAttributes( {
							mediaUrl: media.url,
							mediaId: media.id,
							mediaAlt: media.alt ? media.alt : media.title,
							mediaWidth: width,
							mediaHeight: height,
						} );
					} }
					allowedTypes={ [ 'image' ] }
					value={ mediaId }
					render={ ( { open } ) => (
						<img
							alt={ mediaAlt }
							src={
								! mediaId
									? '/wp-content/themes/lettera/images/components/hero.png'
									: mediaUrl
							}
							className={ classnames( className, 'image' ) }
							onClick={ open }
							width={ '24' }
							height={ '24' }
						/>
					) }
				/>
			</>
		);
	} ),
	save: ( props ) => {
		const { attributes, className } = props;

		const {
			mediaId,
			mediaUrl,
			mediaAlt,
			mediaWidth,
			mediaHeight,
		} = attributes;

		return (
			mediaUrl && (
				<>
					<img
						width={ mediaWidth }
						height={ mediaHeight }
						src={
							! mediaId
								? '/wp-content/themes/lettera/images/components/hero.png'
								: mediaUrl
						}
						alt={ mediaAlt }
						className={ classnames( className, 'image' ) }
					/>
					<Spacer height={ '16' } />
				</>
			)
		);
	},
};
