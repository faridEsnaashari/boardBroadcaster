import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const LogOutPage = props => {
    const history = useHistory();

    useEffect(() => {
        localStorage.removeItem("userToken")
        history.push("login");
    }, []);
    return(
        <p>loged out successfully</p>
    );
};

export default LogOutPage;
