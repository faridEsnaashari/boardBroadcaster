import { useParams } from "react-router-dom";
import useRequestSender from "../../../hooks/useRequestSender";
import { useEffect } from "react";

const VerifyEmailPage = () => {
    const { verificationToken } = useParams();
    const { fetching, axios } = useRequestSender();

    useEffect(() => {
        try{
            axios.get(`/verifyEmail/${ verificationToken }`);
        }
        catch(err){
            console.log(err);
        }
    }, []);
    
    return (
        <p>{ fetching ? "wait. verifing email." : "email verified." }</p>
    );
}

export default VerifyEmailPage;
