import classnames from "classnames";

const ButtonSecondary = ({children, buttonColor, linkTarget, linkRel, linkTitle, linkHref, className}) => {

    const tableClass = ["float-center"];

    if (buttonColor) {

        tableClass.push(`button-secondary--${buttonColor}`);

    }

    return (
        <center>
            <table className={classnames("button-secondary", tableClass, className)} border={"0"} cellpadding={"0"} cellspacing={"0"}>
                <tbody>
                    <tr>
                        <td align={"center"}>
                            <table border={"0"} cellpadding={"0"} cellspacing={"0"}>
                                <tbody>
                                    <tr>
                                        <td align={"center"}>
                                            <a href={ linkHref } target={ linkTarget} title={ linkTitle } rel={ linkRel }><span>{ children }</span>&nbsp;→</a>
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

export default ButtonSecondary;
