import { useParams } from "react-router-dom";
import { useEffect } from "react";

import useAPICaller from "../../../APIs/APICallers/APICallers";
import { INTERNAL_SERVER_ERR, NOTFOUND_ERR, UNAUTHORIZED_ERR, SUCCESS_MSG } from "../../../tools/statusCodes";

const VerifyEmailPage = () => {
    const { verificationToken } = useParams();
    const [ verifyEmail, result ] = useAPICaller().verifyEmailCaller;

    useEffect(() => verifyEmail(verificationToken), []);
    
    return (
        <p>{ result.fetching ? "wait. verifing email." : "email verified." }</p>
    );
}

export default VerifyEmailPage;
