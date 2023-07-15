import { useState, useEffect, useRef } from "react";

import Action from "./Action";
import texts from "../../../tools/localization/localization";

import "../Styles/boardStyles.css";

import LinkIcon from "../../../assets/icons/link.png";
import RenameIcon from "../../../assets/icons/rename.png";
import DeleteIcon from "../../../assets/icons/garbageWhite.png";
import ConfirmIcon from "../../../assets/icons/checkWhite.png";
import AbortIcon from "../../../assets/icons/crossWhite.png";

const Board = props => {

    const {
        id,
        boardColor,
        name,
        updateBoard,
        deleteBoard,
        deleted,
        isLoading,
        copyPresenterUrl,
        copyParticipantUrl,
        done,
    } = props;

    const [ openRenameDialog, setOpenRenameDialog ] = useState(false);
    const [ openDeleteDialog, setOpenDeleteDialog ] = useState(false);

    const [ inputFocuesd, setInputFocused ] = useState(false);

    const renameInputRef = useRef(null);

    const boardRef = useRef(null);

    useEffect(() => {
        if(openDeleteDialog){
            setOpenRenameDialog(false);
        }

        if(openRenameDialog){
            setOpenDeleteDialog(false);
        }
    }, [openRenameDialog, openDeleteDialog]);

    const colors = {
        "#d04f4f": 1,
        "#d0984f": 2,
        "#a8d04f": 3,
        "#4fd0ac": 4,
    };
    useEffect(() => {
        if(inputFocuesd){
            setOpenRenameDialog(true);
        }
        else if(document.activeElement !== boardRef.current){
            setOpenRenameDialog(false);
        }
    }, [inputFocuesd]);

    const resetBoard = () => {
        if(inputFocuesd){
            return;
        }

        if(openRenameDialog){
            setOpenRenameDialog(false);
        }

        if(openDeleteDialog){
            setOpenDeleteDialog(false);
        }
    };

    const onRename = () => {
        const newName = renameInputRef.current.value;
        if(!newName){
            return;
        }

        updateBoard(newName);
        resetBoard();
    };

    return(
        <div 
            className={`board-main-container 
            board-main-container-color${ colors[boardColor] }
            ${ deleted && "board-main-container-delete" }
            `} 
            tabIndex="1" 
            onBlur={ resetBoard }
            ref={ boardRef }
        >
            <div className="board-wrapper">
                <div className="board-name-container">
                    <div className="board-name" style={{ color: boardColor }}>{ name }</div>
                </div>
                <div className="board-actions">
                    <div className="board-copy-presenter-url-action" onClick={ () => copyPresenterUrl() }>
                        <Action
                            tooltipText={ texts["presenter url"] }
                            color={ boardColor }
                            done={ done.presenterUrlCopiedSignal === id }
                            icon={ LinkIcon }
                        />
                    </div>
                    <div className="board-copy-participant-url-action" onClick={ () => copyParticipantUrl() }>
                        <Action
                            tooltipText={ texts["participant url"] }
                            color={ boardColor }
                            done={ done.participantUrlCopiedSignal === id }
                            icon={ LinkIcon }
                        />
                    </div>
                    <div className="board-rename-action" onClick={ () => setOpenRenameDialog(true) }>
                        <Action
                            tooltipText={ texts["rename"] }
                            color={ boardColor }
                            isLoading={ isLoading.rename }
                            icon={ RenameIcon }
                        />
                    </div>
                    <div className="board-delete-action" onClick={ () => setOpenDeleteDialog(true) }>
                        <Action
                            tooltipText={ texts["delete"] }
                            color={ boardColor }
                            isLoading={ isLoading.delete }
                            icon={ DeleteIcon }
                        >
                        </Action>
                    </div>
                </div>
                <div className={`board-delete-confirmaion-container ${ openDeleteDialog ? "board-delete-confirmaion-container-open" : "board-delete-confirmaion-container-close" }`}>
                    <div onClick={ () => deleteBoard() }>
                        <img src={ ConfirmIcon } alt="confirm?"/>
                    </div>
                    <div onClick={ resetBoard }>
                        <img src={ AbortIcon } alt="abort"/>
                    </div>
                </div>
            </div>
            <div className={` board-rename-field-container ${ openRenameDialog ? "board-rename-field-container-open" : "board-rename-field-container-close" }`}>
                <input 
                    ref={ renameInputRef }
                    type="text"
                    className={`
                    board-rename-input
                    board-rename-input-color${ colors[boardColor] }
                    `}
                    onFocus={ () => setInputFocused(true) }
                    onBlur={ () => setInputFocused(false) }
                />
                <div className={'board-rename-confirm-button-container'}>
                    <div className={'board-rename-confirm-button board-rename-confirm-button-fake'}></div>
                    <div className={'board-rename-confirm-button'} onClick={ onRename }>
                        <img src={ ConfirmIcon }/>
                    </div>
                    <div className={'board-rename-confirm-button board-rename-confirm-button-fake'}></div>
                </div>
            </div>
        </div>
    );
};

export default Board;
