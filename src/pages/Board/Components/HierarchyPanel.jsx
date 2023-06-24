import { useState, useEffect, useRef } from "react";

import "../Styles/hierarchyPanelStyles.css";

const HierarchyPanel = (props) => {
    const {
        onAShapeUpdated,
        onSelectedChange,
        onShapesListOpening,
    } = props;

    const BUTTON_ACTIVE_TIME = 300;

    const [ selected, setSelected ] = useState("disable");

    const moveButtonRef = useRef(null);
    const rescaleButtonRef = useRef(null);

    useEffect(() => {
        if(selected === "disable") return; 

        if(selected === "rescale"){
            rescaleButtonRef.current.classList.add("button-clicked");
            moveButtonRef.current.classList.remove("button-clicked");
            return;
        }

        moveButtonRef.current.classList.add("button-clicked");
        rescaleButtonRef.current.classList.remove("button-clicked");
    }, [selected]);

    const [ shapesListOpening, setShapesListOpening ] = useState(false);
    useEffect(() => onShapesListOpening(shapesListOpening), [shapesListOpening]);

    const openOrCloseShapesList = e => {
        if(shapesListOpening){
            setShapesListOpening(false);
            e.target.classList.remove("button-clicked");
            return;
        }

        setShapesListOpening(true);
        e.target.classList.add("button-clicked");
    }

    useEffect(() => onSelectedChange({ mode: selected }), [selected]);

    const createNormalLine = e => {
        e.target.classList.add("button-clicked");
        setTimeout(() => e.target.classList.remove("button-clicked"), BUTTON_ACTIVE_TIME);

        const shapeId = Date.now();
        const shapeName = `normalLine${ shapeId }`;

        const newNormalLine = {
            name: shapeName,
            type: "normalLine",
            attributes: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
                color: "#000000",
            },
        };

        setSelected("rescale");

        onAShapeUpdated(newNormalLine);
    }

    const createHorizontalLine = e => {
        e.target.classList.add("button-clicked");
        setTimeout(() => e.target.classList.remove("button-clicked"), BUTTON_ACTIVE_TIME);

        const shapeId = Date.now();
        const shapeName = `horizontalLine${ shapeId }`;

        const newHorizontalLine = {
            name: shapeName,
            type: "horizontalLine",
            attributes: {
                x: 0,
                y: 0,
                length: 0, 
                color: "#000000",
            },
        };

        setSelected("rescale");

        onAShapeUpdated(newHorizontalLine);
    }

    const createVerticalLine = e => {
        e.target.classList.add("button-clicked");
        setTimeout(() => e.target.classList.remove("button-clicked"), BUTTON_ACTIVE_TIME);

        const shapeId = Date.now();
        const shapeName = `verticalLine${ shapeId }`;

        const newVerticalLine = {
            name: shapeName,
            type: "verticalLine",
            attributes: {
                x: 0,
                y: 0,
                length: 0, 
                color: "#000000",
            },
        };

        setSelected("rescale");

        onAShapeUpdated(newVerticalLine);
    }

    const createRectongle = e => {
        e.target.classList.add("button-clicked");
        setTimeout(() => e.target.classList.remove("button-clicked"), BUTTON_ACTIVE_TIME);

        const shapeId = Date.now();
        const shapeName = `rectongle${ shapeId }`;

        const newRectongle = {
            name: shapeName,
            type: "rectongle",
            attributes: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                color: "#000000",
            },
        };

        setSelected("rescale");

        onAShapeUpdated(newRectongle);
    }

    return(
        <div className={` hierarchy-panel ${ shapesListOpening && "hierarchy-panel-shapes-list-open" } `}>
            <div className="hierarchy-buttons-container">
                <div className="button horizontal-line" onClick={ createHorizontalLine }></div>
                <div className="button vertical-line" onClick={ createVerticalLine }></div>
                <div className="button rectongle" onClick={ createRectongle }></div>
                <div className="button normal-line" onClick={ createNormalLine }></div>
                <div className="hierarchy-panel-divider"></div>
                <div 
                    ref={ moveButtonRef }
                    className="button select-button-move" 
                    onClick={ () => setSelected("move")} 
                >
                </div>
                <div 
                    ref={ rescaleButtonRef }
                    className="button select-button-rescale" 
                    onClick={ () => setSelected("rescale")} 
                >
                </div>
                <div className="hierarchy-panel-divider"></div>
                <div className="button shape-lists" onClick={ openOrCloseShapesList }></div>
            </div>
        </div>
    )
};

export default HierarchyPanel;
