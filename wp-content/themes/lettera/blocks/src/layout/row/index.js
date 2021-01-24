const Row = ( { children } ) => {
	return (
		<table align="center" className="row" cellpadding="0" cellspacing="0">
			<tbody>
			<tr>
				<td className="row-inner">
					{ children }
				</td>
			</tr>
			</tbody>
		</table>
	);
};

export default Row;