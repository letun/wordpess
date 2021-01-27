import classnames from "classnames";

const ButtonMain = ( { children, align, color, linkTarget, linkRel, linkTitle, linkHref, className } ) => {
	let tableClass = [];

	tableClass.push((align == 'left') ? 'float-left' : 'float-center');
	tableClass.push((color) ? `button--${color}` : "button--black");
	console.log(1111, linkHref);

	return (
		<center>
			<table className={ classnames("button-main", tableClass, className) } border={ "0" } cellpadding={ "0" } cellspacing={ "0" }>
				<tbody>
				<tr>
					<td align={"center"}>
						<table  border={ "0" } cellpadding={ "0" } cellspacing={ "0" }>
							<tbody>
							<tr>
								<td align={"center"}>
									<a href={ linkHref } target={ linkTarget} title={ linkTitle } rel={ linkRel }>{ children }</a>
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