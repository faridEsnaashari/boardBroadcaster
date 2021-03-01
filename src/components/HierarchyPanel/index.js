import "./index.css";

import { useState, useRef } from "react";

const HierarchyPanel = (props) => {

    const shapesDetailsRef = useRef([]);
    const [shapesDetails, setShapeDetails] = useState([]);

    const getShapesDetails = () => {
        return shapesDetails.map((shapeDetails, index) => {
            const attributes = {};
            for(let detail in shapeDetails){
                if(detail !== "type"){
                    attributes[detail] = shapeDetails[detail];
                }
            }

            return <ShapeDetail key={ index } name={ shapeDetails.name } type={ shapeDetails.type } attributes={ attributes }></ShapeDetail>
        });
    };

    const createHorizontalLine = () => {
        const shapeId = Date.now();
        const shapeName = `horizontalLine${ shapeId }`;

        const newHorizontalLine = {
            name: shapeName,
            type: "horizontalLine",
            x: 0,
            y: 0,
            length: 0, 
            color: "#000000",
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
            x: 0,
            y: 0,
            length: 0, 
            color: "#000000",
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
            x: 0,
            y: 0,
            length: 0, 
            color: "#000000",
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
    const name = props.name;
    const attributes = props.attributes;
    const type = props.type;

    const getAttributes = () => {
        let renderedComponents = [];
        for(let attribute in attributes){
            renderedComponents.push(
                <div className="attribute">
                    <label>{ attribute }</label>
                    <br></br>
                    <input type="text" defaultValue={ attributes.attribute }></input>
                </div>
            );
        }

        return renderedComponents;
    };

    return(
        <div className="shape-detail-container">
            <div className="general-info-container">
                <p>{ name }</p>
                <p>{ type }</p>
            </div>
            <div className="attributes-container">
                { getAttributes() }
            </div>
        </div>
    );
};



export default HierarchyPanel;
