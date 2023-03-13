import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import UserDetailsContext from "../../contexts/userDetails.js";

import Board from "./Components/Board";
import NewBoard from "./Components/newBoard";

import "./Styles/indexStyles.css";

const BoardsPanelPage = props => {
    const userDetails = useContext(UserDetailsContext);

    const [ openLogOutDialog, setOpenLogOutDialog ] = useState(false);

    const history = useHistory();
    const redirectToLogOut = () => history.push("logout");

    return(
        <div className="boards-panel-main-container">
            <div className="boards-panel-header">
                <div>Boards</div>
                <div className="option-container">
                    <div className={` log-out ${ !openLogOutDialog && "log-out-close" }`} onClick={ redirectToLogOut } >log out</div>
                    <div className="three-dot-container" tabIndex="1" onBlur={ () => setOpenLogOutDialog(false) } onClick={ () => setOpenLogOutDialog(!openLogOutDialog) }>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
            <div className="boards-panel-body">
                {
                    userDetails.user.boards && 
                        userDetails.user.boards.map((board, index) => (<Board boardColor={ board.color } key={ index }/>))
                }
                <NewBoard/>
            </div>
        </div>
    );
};

export default BoardsPanelPage;
