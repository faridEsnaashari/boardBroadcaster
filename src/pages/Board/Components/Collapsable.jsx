import { useState, useEffect, useRef } from "react";

import "../Styles/collapsableStyles.css";

const CollapsableButtons = props => {

    const [ collapse, setCollapse ] = useState(true);

    const closerRef = useRef(null);

    const {
        children,
    } = props;

    useEffect(() => {
        const closer = document.createElement("div");
        closer.className = "collapsable-container-closer";
        closer.onclick = () => setCollapse(true);
        closer.style.display = "none";

        closerRef.current = closer;

        const container = document.getElementsByClassName("panels-container")[0];
        container.appendChild(closer);
    }, []);

    useEffect(() => closerRef.current.style.display = `${ collapse ? "none" : "unset" }` , [collapse]);

    return(
        <div className="collapsable-buttons-container">
            {
                collapse && <div className="button new-shapes" onClick={ () => setCollapse(false) }></div>
            }
            <div className={` collapsable-buttons ${ !collapse && "collapsable-buttons-open" } ${ collapse && "collapsable-buttons-button" } `}>
                { children }
            </div>
        </div>
    );
};

export default CollapsableButtons;
