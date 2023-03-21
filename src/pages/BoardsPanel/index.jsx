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
    const userDetailsContext = useContext(UserDetailsContext);

    const [ boards, setBoards ] = useState(userDetailsContext.user.boards);

    useEffect(() => setBoards(userDetailsContext.user.boards), [userDetailsContext]);

    const [ openLogOutDialog, setOpenLogOutDialog ] = useState(false);

    const history = useHistory();
    const redirectToLogOut = () => history.push("logout");

    const [ createBoardAction, createBoardActionResult ] = useAPICaller().createBoardCaller;

    const [ createBoardLoading, setCreateBoardLoading ] = useState(false);

    useEffect(() => {
        if(createBoardActionResult.isFetching){
            setCreateBoardLoading(true);
            return;
        }

        setCreateBoardLoading(false);

        if(createBoardActionResult.status === SUCCESS_CREATE_MSG){
            setBoards([ ...boards, createBoardActionResult.data ])
        }
    }, [createBoardActionResult.isFetching]);
    
    const createBoard = (name) => {
        const color = getRandomBoardColor();

        createBoardAction({
            name,
            color,
        });
    };

    const deleteBoard = (boardId) => () => console.log(boardId);

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
                    boards && 
                        boards.map((board, index) => (
                            <Board 
                                boardColor={ board.color } 
                                name={ board.name }
                                deleteBoard={ deleteBoard(board._id) }
                                key={ index }
                            />
                        ))
                }
                <NewBoard
                    isLoading={ createBoardLoading }
                    createBoard={ createBoard }
                />
            </div>
        </div>
    );
};

export default BoardsPanelPage;
