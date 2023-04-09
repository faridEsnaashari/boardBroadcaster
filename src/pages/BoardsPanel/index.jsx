import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useAPICaller from "../../APIs/APICallers/APICallers.js";

import { SUCCESS_CREATE_MSG, SUCCESS_MSG } from "../../tools/statusCodes.js";

import UserDetailsContext from "../../contexts/userDetails.js";

import { getRandomBoardColor } from "../../tools/helpers.js";

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
    const [ deleteBoardAction, deleteBoardActionResult ] = useAPICaller().deleteBoardCaller;
    const [ updateBoardAction, updateBoardActionResult ] = useAPICaller().updateBoardCaller;

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

    useEffect(() => {
        if(deleteBoardActionResult.isFetching){
            return;
        }

        if(deleteBoardActionResult.error){
            const updatedBoards = boards.map(board => ({ ...board, isLoading: { ...board.isLoading, delete: false } }));
            setBoards(updatedBoards);
            return;
        }

        if(deleteBoardActionResult.status === SUCCESS_MSG){
            const updatedboards = boards.map(board => board.isLoading.delete ? { ...board, deleted: true } : board);
            setBoards(updatedboards);
        }
    }, [deleteBoardActionResult.isFetching]);

    useEffect(() => {
        if(updateBoardActionResult.isFetching){
            return;
        }

        if(updateBoardActionResult.error){
            const updatedBoards = boards.map(board => ({ ...board, isLoading: { ...board.isLoading, rename: false } }));
            setBoards(updatedBoards);
            return;
        }

        if(updateBoardActionResult.status === SUCCESS_MSG){
            const updatedboards = boards.map(board => {
                if(!board.isLoading.rename){
                    return board;
                }

                return {
                    ...board,
                    name: updateBoardActionResult.data.name,
                    isLoading: { ...board.isLoading, rename: false }
                };
            });
            setBoards(updatedboards);
        }
    }, [updateBoardActionResult.isFetching]);
    
    const createBoard = (name) => {
        const color = getRandomBoardColor();

        createBoardAction({
            name,
            color,
        });
    };

    const updateBoard = boardId => name => {
        updateBoardAction({ id: boardId, name });

        const updatedBoards = boards.map(board => {
            if(board._id === boardId){
                return {
                    ...board,
                    isLoading: { ...board.isLoading, rename: true }
                };
            }

            return board;
        });
        setBoards(updatedBoards);
    };

    const deleteBoard = (boardId) => () => {
        deleteBoardAction({ id: boardId });

        const updatedBoards = boards.map(board => {
            if(board._id === boardId){
                return {
                    ...board,
                    isLoading: { ...board.isLoading, delete: true }
                };
            }

            return board;
        });
        setBoards(updatedBoards);
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
                    boards && 
                        boards.map((board, index) => (
                            <Board 
                                boardColor={ board.color } 
                                name={ board.name }
                                updateBoard={ updateBoard(board._id) }
                                deleteBoard={ deleteBoard(board._id) }
                                deleted={ board.deleted }
                                isLoading={ board.isLoading }
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
