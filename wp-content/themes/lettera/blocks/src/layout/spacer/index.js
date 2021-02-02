import classnames from 'classnames';

const Spacer = ( { children, height = 16, className = '' } ) => {
	return (
		<table
			className={ classnames( className ) }
			cellpadding={ '0' }
			cellspacing={ '0' }
		>
			<tbody>
				<tr>
					<td
						height={ height }
						style={ `font-size: ${ height }px; line-height: ${ height }px` }
						className={ classnames( className ) }
					>
						{ children }
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default Spacer;
