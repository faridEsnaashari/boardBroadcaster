import React, { useState, useEffect, useRef } from "react";

import CollapsableButtons from "./Collapsable";

import "../Styles/hierarchyPanelStyles.css";

const HierarchyPanel = (props) => {
    const {
        onAShapeUpdated,
        onSelectedChange,
        onShapesListOpening,
        drawingPanelSize,
        onDeleteShape: onDeleteShapeProp,
        onDeleteAllShape: onDeleteAllShapeProp,
        onDuplicate: onDuplicateProp,
        selected: selectedProp,
    } = props;

    const BUTTON_ACTIVE_TIME = 300;

    const [ selected, setSelected ] = useState(selectedProp);
    useEffect(() => setSelected(selectedProp), [selectedProp]);

    const [ centerOfDrawingPanel, setCenterOfDrawingPanel ] = useState({ x: 0, y: 0, firstShapeLength: 0 });
    useEffect(() => setCenterOfDrawingPanel({ 
        x: drawingPanelSize.width / 2, 
        y: drawingPanelSize.height / 2, 
        firstShapeLength: drawingPanelSize.width / 20 
    }), [drawingPanelSize]);

    const moveButtonRef = useRef(null);
    const rescaleButtonRef = useRef(null);
    const selectButtonRef = useRef(null);

    useEffect(() => {
        if(selected === "disable") return; 

        if(selected === "rescale"){
            rescaleButtonRef.current.classList.add("button-clicked");
            moveButtonRef.current.classList.remove("button-clicked");
            selectButtonRef.current.classList.remove("button-clicked");
            return;
        }

        if(selected === "move"){
            moveButtonRef.current.classList.add("button-clicked");
            rescaleButtonRef.current.classList.remove("button-clicked");
            selectButtonRef.current.classList.remove("button-clicked");
            return;
        }

        if(selected === "select"){
            selectButtonRef.current.classList.add("button-clicked");
            moveButtonRef.current.classList.remove("button-clicked");
            rescaleButtonRef.current.classList.remove("button-clicked");
            return;
        }

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
            deleted: false,
            name: shapeName,
            type: "normalLine",
            attributes: {
                x1: centerOfDrawingPanel.x,
                y1: centerOfDrawingPanel.y,
                x2: centerOfDrawingPanel.x + centerOfDrawingPanel.firstShapeLength,
                y2: centerOfDrawingPanel.y + centerOfDrawingPanel.firstShapeLength,
                color: "#454545",
            },
        };

        setSelected("rescale");
        onSelectedChange({ shape: shapeName });

        onAShapeUpdated(newNormalLine);
    }

    const createHorizontalLine = e => {
        e.target.classList.add("button-clicked");
        setTimeout(() => e.target.classList.remove("button-clicked"), BUTTON_ACTIVE_TIME);

        const shapeId = Date.now();
        const shapeName = `horizontalLine${ shapeId }`;

        const newHorizontalLine = {
            deleted: false,
            name: shapeName,
            type: "horizontalLine",
            attributes: {
                x: centerOfDrawingPanel.x,
                y: centerOfDrawingPanel.y,
                length: centerOfDrawingPanel.firstShapeLength, 
                color: "#454545",
            },
        };

        setSelected("rescale");
        onSelectedChange({ shape: shapeName });

        onAShapeUpdated(newHorizontalLine);
    }

    const createVerticalLine = e => {
        e.target.classList.add("button-clicked");
        setTimeout(() => e.target.classList.remove("button-clicked"), BUTTON_ACTIVE_TIME);

        const shapeId = Date.now();
        const shapeName = `verticalLine${ shapeId }`;

        const newVerticalLine = {
            deleted: false,
            name: shapeName,
            type: "verticalLine",
            attributes: {
                x: centerOfDrawingPanel.x,
                y: centerOfDrawingPanel.y,
                length: centerOfDrawingPanel.firstShapeLength, 
                color: "#454545",
            },
        };

        setSelected("rescale");
        onSelectedChange({ shape: shapeName });

        onAShapeUpdated(newVerticalLine);
    }

    const createRectongle = e => {
        e.target.classList.add("button-clicked");
        setTimeout(() => e.target.classList.remove("button-clicked"), BUTTON_ACTIVE_TIME);

        const shapeId = Date.now();
        const shapeName = `rectongle${ shapeId }`;

        const newRectongle = {
            deleted: false,
            name: shapeName,
            type: "rectongle",
            attributes: {
                x: centerOfDrawingPanel.x,
                y: centerOfDrawingPanel.y,
                width: centerOfDrawingPanel.firstShapeLength,
                height: centerOfDrawingPanel.firstShapeLength,
                color: "#454545",
            },
        };

        setSelected("rescale");
        onSelectedChange({ shape: shapeName });

        onAShapeUpdated(newRectongle);
    }

    const onDeleteShape = e => {
        e.target.classList.add("button-clicked");
        setTimeout(() => e.target.classList.remove("button-clicked"), BUTTON_ACTIVE_TIME);

        onDeleteShapeProp();
    };

    const onDeleteAllShape = e => {
        e.target.classList.add("button-clicked");
        setTimeout(() => e.target.classList.remove("button-clicked"), BUTTON_ACTIVE_TIME);

        onDeleteAllShapeProp();
    };

    const onDuplicate = e => {
        e.target.classList.add("button-clicked");
        setTimeout(() => e.target.classList.remove("button-clicked"), BUTTON_ACTIVE_TIME);

        onDuplicateProp();
    };

    return(
        <div className={` hierarchy-panel ${ shapesListOpening && "hierarchy-panel-shapes-list-open" } `}>
            <div className="hierarchy-buttons-container">
                <div className="button shape-lists" onClick={ openOrCloseShapesList }></div>
                <div className="hierarchy-panel-divider"></div>
                <CollapsableButtons>
                    <div className="button horizontal-line" onClick={ createHorizontalLine }></div>
                    <div className="button vertical-line" onClick={ createVerticalLine }></div>
                    <div className="button rectongle" onClick={ createRectongle }></div>
                    <div className="button normal-line" onClick={ createNormalLine }></div>
                </CollapsableButtons>
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
                <div 
                    ref={ selectButtonRef }
                    className="button select-button-select" 
                    onClick={ () => setSelected("select")} 
                >
                </div>
                <div className="hierarchy-panel-divider"></div>
                <div className="button duplicate" onClick={ onDuplicate }></div>
                <div className="hierarchy-panel-divider"></div>
                <div className="button delete-button" onClick={ onDeleteShape }></div>
                <div className="button delete-all-button" onClick={ onDeleteAllShape }></div>
            </div>
        </div>
    )
};

export default HierarchyPanel;
