import React, { useState, useContext } from "react";

import LanguageContext from "../../contexts/languageContext";

import "./languageSelector.css";

const LanguageSelector = () => {
    const languageContext = useContext(LanguageContext);

    const [ openLanguageSelector, setOpenLanguageSelector ] = useState(false);
    return(
        <div className="language-selector-main">
            <div className={` language-selector-body ${ !openLanguageSelector && "language-selector-body-close" }`} >
                <div className="language-selector-body-persian" onClick={ () => languageContext.setLang("fa") }></div>
                <div className="language-selector-body-english" onClick={ () => languageContext.setLang("en") }></div>
            </div>
            <div className="languages-button-container" tabIndex="1" onBlur={ () => setOpenLanguageSelector(false) } onClick={ () => setOpenLanguageSelector(!openLanguageSelector) }>
            </div>
        </div>
    );
};

export default LanguageSelector;
