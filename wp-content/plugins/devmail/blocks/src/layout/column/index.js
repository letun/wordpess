import classnames from 'classnames';

const Column = ( { children, className } ) => {
	return (
		<table
			align={ 'center' }
			className={ 'column' }
			cellpadding={ '0' }
			cellspacing={ '0' }
		>
			<tbody>
				<tr>
					<td className={ classnames( 'column-inner', className ) }>
						{ children }
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default Column;
