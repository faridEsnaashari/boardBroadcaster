import { useState, useEffect } from "react";

import ShapeDetail from "./ShapeDetail";

import "../Styles/hierarchyPanelStyles.css";

const HierarchyPanel = (props) => {
    const {
        onAShapeUpdated,
        onSelectedChange,
        shapes,
    } = props;

    const [shapesDetails, setShapeDetails] = useState([]);

    const [ selected, setSelected ] = useState({ mode: "disable", shape: null });

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
            />
        });
    };

    const createNormalLine = () => {
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

    const createHorizontalLine = () => {
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

    const createVerticalLine = () => {
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

    const createRectongle = () => {
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
                <div className="button select-button-move" onClick={ () => setSelected({ ...selected, mode: "move" }) }></div>
                <div className="button select-button-rescale" onClick={ () => setSelected({ ...selected, mode: "rescale" }) }></div>
            </div>
            <div className="shapes-details-container">
                { getShapesDetails() }
            </div>
            <div className="hierarchy-buttons-container">
                <div className="button" onClick={ createHorizontalLine }><div className="horizontal-line"></div></div>
                <div className="button" onClick={ createVerticalLine }><div className="vertical-line"></div></div>
                <div className="button" onClick={ createRectongle }><div className="rectongle"></div></div>
                <div className="button" onClick={ createNormalLine }><div className="normal-line"></div></div>
            </div>
        </div>
    )
};

export default HierarchyPanel;
