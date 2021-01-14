import { Children } from "react";

function Columns({count, children}) {
	const cnt = Children.count(children);
	const cnt_cols = (count !== undefined) ? count : cnt;

	let cols;
	if (cnt_cols > 1) {
		const width = Math.floor(100 / cnt_cols);

		const _cols = Children.map(children, (child, i) => {
			const space = (i > 0) ? (<div html-comment='<!--[if (gte mso 9)|(IE)]></td><td width="50%" valign="top" ><![endif]-->'></div>) : '';
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
				<div html-comment='<!--[if (gte mso 9)|(IE)]><table width="100%"><tr><td width="50%" valign="top" ><![endif]-->'></div>
				{_cols}
				<div html-comment='<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->'></div>
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