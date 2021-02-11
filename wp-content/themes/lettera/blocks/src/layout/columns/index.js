import classnames from 'classnames';

const Columns = ( { className, children } ) => {
	return (
		<div className={ classnames( 'columns', className ) }>{ children }</div>
	);
};

export default Columns;
