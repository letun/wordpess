import { Children } from "react";

function Columns({count, children}) {
	const cnt = Children.count(children);
	const cnt_cols = (count !== undefined) ? count : cnt;

	let cols;
	if (cnt_cols > 1) {
		const width = Math.floor(100 / cnt_cols);

		const _cols = Children.map(children, (child, i) => {
			const space = (i > 0) ? (<pre dangerouslySetInnerHTML={{__html: "<!--[if (gte mso 9)|(IE)]></td><td width=\"50%\" valign=\"top\" ><![endif]-->"}}></pre>) : '';
			console.log(i, space);
			return (
				<>
					{space}
					<div className="column">
						{child}
					</div>
				</>
			);
		});

		cols = (
			<>
				<pre dangerouslySetInnerHTML={{__html: "<!--[if (gte mso 9)|(IE)]><table width=\"100%\"><tr><td width=\"50%\" valign=\"top\" ><![endif]-->"}}></pre>
				{_cols}
				<pre dangerouslySetInnerHTML={{__html: "<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->"}}></pre>
			</>
		);
	} else {
		cols = children;
	}

	return (
		cols
	);
};

export default Columns;