import classnames from 'classnames';

const ButtonMain = ( {
	children,
	buttonColor,
	buttonSize,
	linkTarget,
	linkRel,
	linkTitle,
	linkHref,
	className,
} ) => {
	const tableClass = [ 'float-center' ];

	if ( buttonSize === 'large' ) {
		tableClass.push( 'button-main--large' );
	}

	if ( buttonColor && buttonColor !== 'black' ) {
		tableClass.push( `button-main--${ buttonColor }` );
	}

	return (
		<center>
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
		</center>
	);
};

export default ButtonMain;
