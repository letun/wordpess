import classnames from "classnames";

const Container = ( { children, className } ) => {
	return (
		<table align="center" className="container float-center" cellpadding="0" cellspacing="0">
			<tbody>
			<tr>
				<td className={classnames('container-inner', className)}>
					{ children }
				</td>
			</tr>
			</tbody>
		</table>
	);
};

export default Container;