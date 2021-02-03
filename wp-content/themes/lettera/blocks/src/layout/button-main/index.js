import classnames from 'classnames';

const CenterButton = ({align, children}) => {
	return (align === 'center' ?
			<center>
				{children}
			</center>
		: {children}
	)
};

const ButtonMain = ( {
	children,
	buttonColor,
	buttonSize,
	linkTarget,
	linkRel,
	linkTitle,
	linkHref,
	align,
	className,
} ) => {
	const tableClass = [ ];
	if (align === 'center') {
		tableClass.push('float-center');
	}

	if ( buttonSize === 'large' ) {
		tableClass.push( 'button-main--large' );
	}

	if ( buttonColor && buttonColor !== 'black' ) {
		tableClass.push( `button-main--${ buttonColor }` );
	}

	return (
		<CenterButton align={align}>
			<table
				className={ classnames( 'button-main', tableClass, className ) }
				border={ '0' }
				cellpadding={ '0' }
				cellspacing={ '0' }
			>
				<tbody>
					<tr>
						<td align={ 'center' }>
							<table
								border={ '0' }
								cellpadding={ '0' }
								cellspacing={ '0' }
							>
								<tbody>
									<tr>
										<td align={ 'center' }>
											<a
												href={ linkHref }
												target={ linkTarget }
												title={ linkTitle }
												rel={ linkRel }
											>
												{ children }
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		</CenterButton>
	);
};

export default ButtonMain;
