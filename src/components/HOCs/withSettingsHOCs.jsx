import React, { useState, useEffect } from "react";

import texts from "../../tools/localization/localization";

import LanguageContext from "../../contexts/languageContext";

const withSettingsHoc = Component => {
    const WithSettings = () => {
        const [ language, setLanguage ] = useState(null);

        useEffect(() => {
            texts.setLanguage(localStorage.getItem("language") || "en");
            setLanguage(texts.getLanguage());
        }, []);

        const setLang = lang => {
            texts.setLanguage(lang);
            setLanguage(texts.getLanguage());
            localStorage.setItem("language", lang);
        };

        return (
            <LanguageContext.Provider value={{ language, setLang  }}>
                <Component/>
            </LanguageContext.Provider>
        );

    };

    return WithSettings;
};

export default withSettingsHoc;
