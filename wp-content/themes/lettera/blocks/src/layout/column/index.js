const Column = ( { children } ) => {
	return (
		<table align="center" className="column" cellpadding="0" cellspacing="0">
			<tbody>
			<tr>
				<td className="column-inner">
					{ children }
				</td>
			</tr>
			</tbody>
		</table>
	);
};

export default Column;