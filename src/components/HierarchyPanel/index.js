import "./index.css";

import { useState, useRef, useEffect } from "react";

const HierarchyPanel = (props) => {
    const onShapesUpdated = props.onShapesUpdated;

    const shapesDetailsRef = useRef([]);
    const [shapesDetails, setShapeDetails] = useState([]);

    useEffect(() => onShapesUpdated(shapesDetails), [shapesDetails]);

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
        return shapesDetailsRef.current.map((shapeDetails, index) => {
            return <ShapeDetail key={ index } onAttributesChanged={ onAShapeAttributeChanged } name={ shapeDetails.name } type={ shapeDetails.type } attributes={ shapeDetails.attributes }/>
        });
    };

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

        shapesDetailsRef.current = [ ...shapesDetailsRef.current, newRectongle ];
        setShapeDetails(shapesDetailsRef.current);
    }

    return(
        <div className="hierarchy-panel">
            <div className="shapes-details-container">
                { getShapesDetails() }
            </div>
            <div className="buttons-container">
                <div className="button horizontal-line" onClick={ createHorizontalLine }></div>
                <div className="button vertical-line" onClick={ createVerticalLine }></div>
                <div className="button rectongle" onClick={ createRectongle }></div>
            </div>
        </div>
    )
};

const ShapeDetail = (props) => {
    const shapeName = props.name;
    const attributes = props.attributes;
    const type = props.type;
    const onThisShapeAttributesChanged = props.onAttributesChanged;

    const onAttributesChanged = e => {
        const attributeName = e.target.name;
        const attributeValue = e.target.value;

        const shapeWithNewAttributes = { 
            name: shapeName, 
            type: type, 
            attributes: { ...attributes },
        };
        shapeWithNewAttributes.attributes[attributeName] = attributeValue;

        onThisShapeAttributesChanged(shapeWithNewAttributes);
    };

    const getAttributes = () => {
        let renderedComponents = [];
        for(let attribute in attributes){
            renderedComponents.push(
                <div className="attribute" key= { renderedComponents.length }>
                    <label>{ attribute }</label>
                    <br></br>
                    <input type="text" name={ attribute } id={ shapeName } defaultValue={ attributes[attribute] } onChange={ onAttributesChanged }/>
                </div>
            );
        }

        return renderedComponents;
    };

    return(
        <div className="shape-detail-container" key={ shapeName }>
            <div className="general-info-container">
                <p className="shape-name">{ shapeName }</p>
                <p className="shape-type">{ type }</p>
            </div>
            <div className="attributes-container">
                { getAttributes() }
            </div>
        </div>
    );
};


export default HierarchyPanel;
