import { useState, useEffect, useRef } from "react";

import "../Styles/newBoardStyle.css";

import CrossIcon from "../../../assets/icons/plus.png";

const NewBoard = props => {

    const boardRef = useRef(null);

    const [ openRenameDialog, setOpenRenameDialog ] = useState(false);
    const [ inputFocuesd, setInputFocused ] = useState(false);

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
    };

    return(
        <div 
            className={` new-board-main-container ${ openRenameDialog ? "new-board-main-container-open" : "new-board-main-container-close" }`} 
            tabIndex="1" 
            onBlur={ resetBoard }
            ref={ boardRef }
        >
            <div 
                className={`new-board-rename-field-container ${ openRenameDialog ? "new-board-rename-field-container-open" : "new-board-rename-field-container-close" }`} 
                onClick={ () => setOpenRenameDialog(true) }
            >
                <div className={`new-board-rename-input-container ${ openRenameDialog ? "new-board-rename-input-container-open" : "new-board-rename-input-container-close" }`}>
                    <input 
                        type="text"
                        className="new-board-rename-input"
                        onFocus={ () => setInputFocused(true) }
                        onBlur={ () => setInputFocused(false) }
                    />
                </div>
                <div className={`new-board-rename-confirm-button ${ openRenameDialog ? "new-board-rename-confirm-button-white" : "new-board-rename-confirm-button-black" }`}>
                    <div/>
                    <div/>
                </div>
            </div>
        </div>
    );
};

export default NewBoard;
