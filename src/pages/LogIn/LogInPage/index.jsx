import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { isValidEmail, isValidPassword } from "../../../tools/validators";
import { SUCCESS_MSG, UNAUTHORIZED_ERR, INTERNAL_SERVER_ERR } from "../../../tools/statusCodes";
import { getElementValue } from "../../../tools/helpers";

import useAPICaller from "../../../APIs/APICallers/APICallers";

const LogInPage = () => {
    const [ login, result ] = useAPICaller().loginCaller;
    const history = useHistory();

    const logInTheUser = (e) => {
        e.preventDefault();
        const password = getElementValue("password");
        const email = getElementValue("email");

        if(!isValidPassword(password) || !isValidEmail(email)){
            console.error("invalid data");
            return;
        }

        const userInformation = {
            password,
            email,
        };
        
        login(userInformation);
    };

    const redirectToBoardsPanel = () => history.push("boards-panel");

    useEffect(() => result.status === SUCCESS_MSG && redirectToBoardsPanel(), [ result.status ]);

    return (
        <>
            <form onSubmit={ logInTheUser }>
                <label htmlFor="email">email: </label>
                <input type="text" name="email" id="email"/>
                <br/>
                <label htmlFor="password">password: </label>
                <input type="password" name="password" id="password"/>
                <br/>
                <input type="submit"/>
            </form>
        </>
    );
}

export default LogInPage;
