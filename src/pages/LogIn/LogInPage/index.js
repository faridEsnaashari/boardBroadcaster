import { isValidEmail, isValidPassword } from "../../../tools/validators";
import { SUCCESS_MSG, UNAUTHORIZED_ERR, INTERNAL_SERVER_ERR } from "../../../tools/statusCodes";
import { APP_URL } from "../../../tools/config";
import { getElementValue } from "../../../tools/helpers";
import useRequestSender from "../../../hooks/useRequestSender";

const LogInPage = () => {
    const { fetching, axios } = useRequestSender();

    const logInTheUser = async (e) => {
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

        try{
            const result = await axios.post("/login", userInformation);
            const userToken = result.status === SUCCESS_MSG && result.data.userToken;

            localStorage.setItem("userToken", userToken);
        }
        catch(err){
            const { status, message } = err.response.data;
            console.log(status, message);

            if(status === INTERNAL_SERVER_ERR){
                console.error("internal server error happened");
            }

            if(status === UNAUTHORIZED_ERR){
                if(message === "email or password is incurrect"){
                    console.error("email or password is incurrect");
                }
                else{
                    console.error("email is not verified yet");
                }
            }
        }
    };

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
            <p>{ fetching ? "wait": "succeed" }</p>
        </>
    );
}

export default LogInPage;
