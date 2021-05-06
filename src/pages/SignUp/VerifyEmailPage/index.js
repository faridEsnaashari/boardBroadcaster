import { useParams } from "react-router-dom";
import { useEffect } from "react";

import useRequestSender from "../../../hooks/useRequestSender";
import { INTERNAL_SERVER_ERR, NOTFOUND_ERR, UNAUTHORIZED_ERR, SUCCESS_MSG } from "../../../tools/statusCodes";

const VerifyEmailPage = () => {
    const { verificationToken } = useParams();
    const { fetching, axios } = useRequestSender();

    const verifyEmail = async() => {
        try{
            const result = await axios.get(`/verifyEmail/${ verificationToken }`);
            if(result.status === SUCCESS_MSG){
                console.log("email verified successfully");
            }
        }
        catch(err){
            console.log(err);
            const { status } = err.response;
            console.log(status);

            if(status === INTERNAL_SERVER_ERR){
                console.error("internal server error happened");
            }

            if(status === NOTFOUND_ERR){
                console.error("no user found with this email");
            }

            if(status === UNAUTHORIZED_ERR){
                console.error("token is invalid");
            }
        }
    };

    useEffect(() => {
        verifyEmail();
    }, []);
    
    return (
        <p>{ fetching ? "wait. verifing email." : "email verified." }</p>
    );
}

export default VerifyEmailPage;
