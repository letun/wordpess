import { Children } from 'react';

const Columns = ( { count, children } ) => {
	const cnt = Children.count( children ),
		cntCols = count ? count : cnt;

	let cols = children;

	if ( cntCols > 1 ) {
		// Try to add var: const width = Math.floor(100 / cntCols).toString();
		const getCols = Children.map( children, ( child, num ) => {
			const space = num ? (
				<pre
					dangerouslySetInnerHTML={ {
						__html:
							'<!--[if (gte mso 9)|(IE)]></td><td width="50%" valign="top" ><![endif]-->',
					} }
				></pre>
			) : (
				''
			);

			return (
				<>
					{ space }
					<div className={ 'column' }>{ child }</div>
				</>
			);
		} );

		cols = (
			<>
				<pre
					dangerouslySetInnerHTML={ {
						__html:
							'<!--[if (gte mso 9)|(IE)]><table width="100%"><tr><td width="50%" valign="top"><![endif]-->',
					} }
				></pre>
				{ getCols }
				<pre
					dangerouslySetInnerHTML={ {
						__html:
							'<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->',
					} }
				></pre>
			</>
		);
	}

	return cols;
};

export default Columns;
