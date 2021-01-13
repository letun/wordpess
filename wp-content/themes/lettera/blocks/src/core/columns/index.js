import { Children, renderToString } from "react";
import { HTMLComment } from 'react-html-comment';

function _markupFromString (msg) {
	return (
		{ msg }
	);
}

function Columns({count, children}) {
	const cnt = Children.count(children);
	const cnt_cols = (count !== undefined) ? count : cnt;

	let cols;
	if (cnt_cols > 1) {
		const width = Math.floor(100 / cnt_cols);

		const _cols = Children.map(children, (child, i) => {
			const space = (i > 0) ? (<col-space width={width} />) : '';
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
				<col-start width={width} />
				{_cols}
				<col-end width={width} />
			</>
		);

		{/*
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
		*/}
	} else {
		cols = children;
	}

	return (
		cols
	);
};

export default Columns;