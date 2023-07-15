import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import texts from "../../tools/localization/localization";

const LogOutPage = props => {
    const history = useHistory();

    useEffect(() => {
        localStorage.removeItem("userToken")
        history.push("login");
    }, []);
    return(
        <p>{ texts["loged out successfully"] }</p>
    );
};

export default LogOutPage;
