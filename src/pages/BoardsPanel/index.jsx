import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useAPICaller from "../../APIs/APICallers/APICallers.js";

import { SUCCESS_CREATE_MSG } from "../../tools/statusCodes.js";

import UserDetailsContext from "../../contexts/userDetails.js";

import {getRandomBoardColor} from "../../tools/helpers.js";

import Board from "./Components/Board";
import NewBoard from "./Components/newBoard";

import "./Styles/indexStyles.css";

const BoardsPanelPage = props => {
    const userDetails = useContext(UserDetailsContext);

    const [ openLogOutDialog, setOpenLogOutDialog ] = useState(false);

    const history = useHistory();
    const redirectToLogOut = () => history.push("logout");

    const [ createBoard, createBoardResult ] = useAPICaller().createBoardCaller;

    const [ createBoardLoading, setCreateBoardLoading ] = useState(false);

    useEffect(() => {
        if(createBoardResult.isFetching){
            setCreateBoardLoading(true);
            return;
        }

        setCreateBoardLoading(false);

        if(createBoardResult.status === SUCCESS_CREATE_MSG){
            userDetails.updateUserDetails();
        }
    }, [createBoardResult.isFetching]);
    
    const addBoard = (name) => {
        const color = getRandomBoardColor();

        createBoard({
            name,
            color,
        });
    };

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
                <NewBoard
                    isLoading={ createBoardLoading }
                    addBoard={ addBoard }
                />
            </div>
        </div>
    );
};

export default BoardsPanelPage;
