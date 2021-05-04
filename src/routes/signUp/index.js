import SignUpPage from "../../pages/SignUp/SignUpPage";
import VerificationSentPage from "../../pages/SignUp/VerificationSentPage";
import VerifyEmailPage from "../../pages/SignUp/VerifyEmailPage";

const routes = [
    {
        path: "/verification_sent",
        component: VerificationSentPage,
    },
    {
        path: "/verify_email/:verificationToken",
        component: VerifyEmailPage,
    },
    {
        path: "",
        component: SignUpPage,
    },
];

export default routes;
