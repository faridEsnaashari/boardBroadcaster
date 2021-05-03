import { isValidEmail, isValidPassword, isValidUseerName } from "../../../tools/validators";
import { SUCCESS_CREATE_MSG, CONFILICT_ERR, INTERNAL_SERVER_ERR } from "../../../tools/statusCodes";
import { APP_URL } from "../../../tools/config";
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

    const registerTheUser = async (e) => {
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

        try{
            const result = await axios.post("/register", userInformation);

            if(result.status === SUCCESS_CREATE_MSG){
                window.location.href = `${ APP_URL }/signup/verification_sent`;
            }
        }
        catch(err){
            const { status } = err.response;

            if(status === INTERNAL_SERVER_ERR){
                console.error("internal server error happened");
            }

            if(status === CONFILICT_ERR){
                console.error("there already is a user with this email");
            }
        }
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
            <p>{ fetching ? "wait": "succeed" }</p>
        </>
    );
}

export default SignUpPage;
