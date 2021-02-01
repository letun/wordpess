import classnames from "classnames";

const Row = ({children, className}) => {

    return (
        <table align="center" className="row" cellpadding="0" cellspacing="0">
            <tbody>
                <tr>
                    <td className={classnames(
                        "row-inner",
                        className
                    )}>
                        { children }
                    </td>
                </tr>
            </tbody>
        </table>
    );

};

export default Row;
