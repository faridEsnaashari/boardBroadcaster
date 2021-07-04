import { useReducer } from "react";

import { isValidEmail, isValidPassword, isValidUseerName } from "../../../tools/validators";
import { SUCCESS_CREATE_MSG, CONFILICT_ERR, INTERNAL_SERVER_ERR } from "../../../tools/statusCodes";
import { APP_URL } from "../../../tools/config";
import { getElementValue } from "../../../tools/helpers";

import useAPICaller from "../../../APIs/APICallers/APICallers";

const SignUpPage = () => {
    const [ signUp, result ] = useAPICaller().signUpCaller;

    const registerTheUser = (e) => {
        e.preventDefault();
        const name = getElementValue("name");
        const password = getElementValue("password");
        const email = getElementValue("email");

        if(!isValidUseerName(name) || !isValidPassword(password) || !isValidEmail(email)){
            console.error("invalid data");
            return;
        }

        const userInformation = {
            name,
            password,
            email,
        };

        signUp(userInformation);
    };

    return (
        <>
            <form onSubmit={ registerTheUser }>
                <label htmlFor="name">name: </label>
                <input type="text" name="name" id="name"/>
                <br/>
                <label htmlFor="password">password: </label>
                <input type="password" name="password" id="password"/>
                <br/>
                <label htmlFor="email">email: </label>
                <input type="text" name="email" id="email"/>
                <br/>
                <input type="submit"/>
            </form>
        </>
    );
}

export default SignUpPage;
