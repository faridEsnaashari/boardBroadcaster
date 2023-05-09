import { useState, useRef, useEffect } from "react";

import ShapeDetail from "./ShapeDetail";

import "../Styles/hierarchyPanelStyles.css";

const HierarchyPanel = (props) => {
    const {
        onShapesUpdated,
        onSelectedChange,
        shapes,
    } = props;

    const shapesDetailsRef = useRef([]);
    const [shapesDetails, setShapeDetails] = useState([]);

    const [ selected, setSelected ] = useState({ mode: "disable", shape: null });

    useEffect(() => onSelectedChange(selected), [selected]);

    useEffect(() => onShapesUpdated(shapesDetails), [shapesDetails]);

    useEffect(() => {
        shapesDetailsRef.current = shapes;
        setShapeDetails(shapesDetailsRef.current);
    }, [shapes]);

    const onAShapeAttributeChanged = async(updatedShape) => {
        shapesDetailsRef.current.map(shape => {
            if(updatedShape.name !== shape.name){
                return shape;
            }

            for(let attribute in shape.attributes){
                shape.attributes[attribute] = updatedShape.attributes[attribute];
            }

            return shape;
        });

        setShapeDetails([ ...shapesDetailsRef.current ]);
    };

    const getShapesDetails = () => {
        return shapesDetailsRef.current && shapesDetailsRef.current.map((shapeDetails, index) => {
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

        shapesDetailsRef.current = [ ...shapesDetailsRef.current, newNormalLine ];
        setShapeDetails(shapesDetailsRef.current);
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

        shapesDetailsRef.current = [ ...shapesDetailsRef.current, newHorizontalLine ];
        setShapeDetails(shapesDetailsRef.current);
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

        shapesDetailsRef.current = [ ...shapesDetailsRef.current, newVerticalLine ];
        setShapeDetails(shapesDetailsRef.current);
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

        shapesDetailsRef.current = [ ...shapesDetailsRef.current, newRectongle ];
        setShapeDetails(shapesDetailsRef.current);
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
