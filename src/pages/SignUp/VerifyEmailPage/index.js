import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import useAPICaller from "../../../APIs/APICallers/APICallers";
import { SUCCESS_MSG } from "../../../tools/statusCodes";

const VerifyEmailPage = () => {
    const { verificationToken } = useParams();
    const [ verifyEmail, result ] = useAPICaller().verifyEmailCaller;

    useEffect(() => verifyEmail(verificationToken), []);
    useEffect(() => {
        if(result.status === SUCCESS_MSG) {
            window.location.href = "/login";
        }
    }, [result]);
    
    return (
        <p>{ result.fetching ? "wait. verifing email." : "email verified." }</p>
    );
}

export default VerifyEmailPage;
