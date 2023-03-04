import { useState, useEffect, useRef } from "react";

import Action from "./Action";

import "../Styles/boardStyles.css";

import LinkIcon from "../../../assets/icons/link.png";
import RenameIcon from "../../../assets/icons/rename.png";
import DeleteIcon from "../../../assets/icons/garbageWhite.png";
import ConfirmIcon from "../../../assets/icons/checkWhite.png";
import AbortIcon from "../../../assets/icons/crossWhite.png";

const Board = props => {

    const [ openRenameDialog, setOpenRenameDialog ] = useState(false);
    const [ openDeleteDialog, setOpenDeleteDialog ] = useState(false);

    const [ deleteBoard, setDeleteBoard ] = useState(false);

    const [ inputFocuesd, setInputFocused ] = useState(false);

    const boardRef = useRef(null);

    useEffect(() => {
        if(openDeleteDialog){
            setOpenRenameDialog(false);
        }

        if(openRenameDialog){
            setOpenDeleteDialog(false);
        }
    }, [openRenameDialog, openDeleteDialog]);

    const {
        boardColor,
    } = props;

    const colors = {
        "#d04f4f": 1,
        "#d0984f": 2,
        "#a8d04f": 3,
        "#4fd0ac": 3,
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

    return(
        <div 
            className={`board-main-container 
            board-main-container-color${ colors[boardColor] }
            ${ deleteBoard && "board-main-container-delete" }
            `} 
            tabIndex="1" 
            onBlur={ resetBoard }
            ref={ boardRef }
        >
            <div className="board-wrapper">
                <div className="board-name-container">
                    <div className="board-name" style={{ color: boardColor }}>dddddddddddddddddddddddddddddddddddddddddddddddddddddd</div>
                </div>
                <div className="board-actions">
                    <div className="board-copy-presenter-url-action">
                        <Action
                            onClick={ () => console.log("cp") }
                            tooltipText="tooltip"
                            color={ boardColor }
                            icon={ LinkIcon }
                        />
                    </div>
                    <div className="board-copy-participant-url-action">
                        <Action
                            onClick={ () => console.log("cp") }
                            tooltipText="tooltip"
                            color={ boardColor }
                            icon={ LinkIcon }
                        />
                    </div>
                    <div className="board-rename-action" onClick={ () => setOpenRenameDialog(true) }>
                        <Action
                            onClick={ () => console.log("cp") }
                            tooltipText="tooltip"
                            color={ boardColor }
                            icon={ RenameIcon }
                        />
                    </div>
                    <div className="board-delete-action" onClick={ () => setOpenDeleteDialog(true) }>
                        <Action
                            onClick={ () => console.log("lll") }
                            tooltipText="tooltip"
                            color={ boardColor }
                            icon={ DeleteIcon }
                        />
                    </div>
                </div>
                <div className={`board-delete-confirmaion-container ${ openDeleteDialog ? "board-delete-confirmaion-container-open" : "board-delete-confirmaion-container-close" }`}>
                    <div onClick={ () => setDeleteBoard(true) }>
                        <img src={ ConfirmIcon } alt="confirm?"/>
                    </div>
                    <div onClick={ resetBoard }>
                        <img src={ AbortIcon } alt="abort"/>
                    </div>
                </div>
            </div>
            <div className={` board-rename-field-container ${ openRenameDialog ? "board-rename-field-container-open" : "board-rename-field-container-close" }`}>
                <input 
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
                    <div className={'board-rename-confirm-button'}>
                        <img src={ ConfirmIcon }/>
                    </div>
                    <div className={'board-rename-confirm-button board-rename-confirm-button-fake'}></div>
                </div>
            </div>
        </div>
    );
};

export default Board;
