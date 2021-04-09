import { isValidEmail, isValidPassword, isValidUseerName } from "../../../tools/validators";
import useRequestSender from "../../../hooks/useRequestSender";

const SignUpPage = () => {
    const { fetching, axios } = useRequestSender();

    const getElementValue = id => {
        const element = document.getElementById(id);
        if(!element){
            return;
        }

        return element.value;
    };

    const registerTheUser = e => {
        e.preventDefault();
        const username = getElementValue("username");
        const password = getElementValue("password");
        const email = getElementValue("email");

        if(!isValidUseerName(username) || !isValidPassword(password) || !isValidEmail(email)){
            console.error("invalid data");
            return;
        }
    };

    return (
        <>
            <form onSubmit={ registerTheUser }>
                <label htmlFor="username">user name: </label>
                <input type="text" name="username" id="username"/>
                <br/>
                <label htmlFor="password">password: </label>
                <input type="password" name="password" id="password"/>
                <br/>
                <label htmlFor="email">email: </label>
                <input type="text" name="email" id="email"/>
                <br/>
                <input type="submit"/>
            </form>
            <p>{ fetching ? "salam": "khar" }</p>
        </>
    );
}

export default SignUpPage;
