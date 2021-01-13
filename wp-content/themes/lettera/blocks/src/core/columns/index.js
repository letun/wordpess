import { Children, renderToString } from "react";
import { HTMLComment } from 'react-html-comment';
import { Fragment } from '@wordpress/element';

function Columns({count, children}) {
	const cnt = Children.count(children);
	const cnt_cols = (count !== undefined) ? count : cnt;

	let cols;
	if (cnt_cols > 1) {
		const width = Math.floor(100 / cnt_cols);

		const col_header = '<!--[if (gte mso 9)|(IE)]><table width="100%"><tr><td width="50%" valign="top" ><![endif]-->';
		const col_middle = {
			__dangerousHTML: '<!--[if (gte mso 9)|(IE)]></td><td width="50%" valign="top" ><![endif]-->'
		};
		const col_footer = '<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->';

		const _cols = Children.map(children, (child, i) => {
			return (
				<>
					<div className="column">
						{child.HTML}
					</div>
				</>
			);
		});

		cols = (
			<>
				<div className="columns" dangerouslySetInnerHTML={ {
					__html: `${col_header} ${children} ${col_footer}`
				} }></div>
				<div className="columns">
					<Fragment dangerouslySetInnerHTML={ { __html: `${col_header}` }}></Fragment>
					{_cols}
				</div>
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