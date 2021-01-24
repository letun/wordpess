const Container = ( { children } ) => {
	return (
		<table align="center" className="container float-center" cellpadding="0" cellspacing="0">
			<tbody>
			<tr>
				<td className="container-inner">
					{ children }
				</td>
			</tr>
			</tbody>
		</table>
	);
};

export default Container;