import { useState, useEffect, useRef } from "react";

import ShapeDetail from "./ShapeDetail";

import "../Styles/hierarchyPanelStyles.css";

const HierarchyPanel = (props) => {
    const {
        onAShapeUpdated,
        onSelectedChange,
        shapes,
    } = props;

    const OPEN_SHAPES_LIST_TIME = 400;
    const BUTTON_ACTIVE_TIME = 300;

    const shapesListRef = useRef(null);

    const [shapesDetails, setShapeDetails] = useState([]);

    const [ selected, setSelected ] = useState({ mode: "disable", shape: null });

    const moveButtonRef = useRef(null);
    const rescaleButtonRef = useRef(null);

    useEffect(() => {
        if(selected.mode === "disable") return; 

        if(selected.mode === "rescale"){
            rescaleButtonRef.current.classList.add("button-clicked");
            moveButtonRef.current.classList.remove("button-clicked");
            return;
        }

        moveButtonRef.current.classList.add("button-clicked");
        rescaleButtonRef.current.classList.remove("button-clicked");
    }, [selected.mode]);

    const [ shapesListOpening, setShapesListOpening ] = useState(false);

    const openOrCloseShapesList = e => {
        if(shapesListOpening){
            setShapesListOpening(false);
            setTimeout(() => shapesListRef.current.scroll(0, 0), OPEN_SHAPES_LIST_TIME);
            e.target.classList.remove("button-clicked");
            return;
        }

        setShapesListOpening(true);
        setTimeout(() => shapesListRef.current.scroll({ top: 100000, behavior: "smooth" }), OPEN_SHAPES_LIST_TIME);
        e.target.classList.add("button-clicked");
    }

    useEffect(() => onSelectedChange(selected), [selected]);

    useEffect(() => {
        setShapeDetails(shapes);
    }, [shapes]);

    const onAShapeAttributeChanged = (updatedShape) => {
        onAShapeUpdated(updatedShape)
    };

    const getShapesDetails = () => {
        return shapesDetails && shapesDetails.map((shapeDetails, index) => {
            return <ShapeDetail 
                key={ index } 
                onAttributesChanged={ onAShapeAttributeChanged }
                name={ shapeDetails.name } 
                type={ shapeDetails.type } 
                attributes={ shapeDetails.attributes }
                onClick={ () => setSelected({ ...selected, shape: shapeDetails.name }) }
                selected={ selected.shape && shapeDetails.name === selected.shape }
            />
        });
    };

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

        setSelected({ shape: shapeName, selected: "rescale" });

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

        setSelected({ shape: shapeName, selected: "rescale" });

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

        setSelected({ shape: shapeName, selected: "rescale" });

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

        setSelected({ shape: shapeName, select: "rescale" });

        onAShapeUpdated(newRectongle);
    }

    return(
        <div className="hierarchy-panel">
            <div className="hierarchy-buttons-container">
                <div className="button horizontal-line" onClick={ createHorizontalLine }></div>
                <div className="button vertical-line" onClick={ createVerticalLine }></div>
                <div className="button rectongle" onClick={ createRectongle }></div>
                <div className="button normal-line" onClick={ createNormalLine }></div>
                <div className="hierarchy-panel-divider"></div>
                <div 
                    ref={ moveButtonRef }
                    className="button select-button-move" 
                    onClick={ () => setSelected({ ...selected, mode: "move" })} 
                >
                </div>
                <div 
                    ref={ rescaleButtonRef }
                    className="button select-button-rescale" 
                    onClick={ () => setSelected({ ...selected, mode: "rescale" })} 
                >
                </div>
                <div className="hierarchy-panel-divider"></div>
                <div className="button shape-lists" onClick={ openOrCloseShapesList }></div>
            </div>
            <div ref={ shapesListRef } className={`shapes-details-container-overflow-owner  ${ shapesListOpening && "shapes-details-container-overflow-owner-open" }`}>
            <div className="shapes-details-container">
                <div className="shapes-details-ui">
                    { getShapesDetails() }
                </div>
            </div>
            </div>
        </div>
    )
};

export default HierarchyPanel;
