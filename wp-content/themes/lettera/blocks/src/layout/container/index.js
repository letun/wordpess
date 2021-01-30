import classnames from "classnames";

const Container = ( { children, className } ) => {
	return (
		<table align="center" className={classnames("container", "float-center", className) } cellpadding="0" cellspacing="0">
			<tbody>
			<tr>
				<td className={ classnames('container-inner') }>
					{ children }
				</td>
			</tr>
			</tbody>
		</table>
	);
};

export default Container;