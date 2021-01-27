import classnames from "classnames";

const Spacer = ( { children, height, className } ) => {
	if (!height) {
		height = 16;
	}
	return (
		<table className={ classnames('spacer') } cellpadding="0" cellspacing="0">
			<tbody>
			<tr>
				<td height={height} style={`font-size: ${height}px;line-height: ${height}px`} className={classnames(className)}>
					{ children }
				</td>
			</tr>
			</tbody>
		</table>
	);
};

export default Spacer;