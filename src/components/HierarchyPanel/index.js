import "./index.css";

import { useState, useRef } from "react";

const HierarchyPanel = (props) => {

    const [shapesDetails, setShapeDetails] = useState([
        {
            type: "verticalLine",
            x: 100,
            y: 100,
            length: 50, 
            color: "#000000",
        },
        {
            type: "horizontalLine",
            x: 100,
            y: 100,
            length: 50, 
            color: "#000000",
        },
        {
            type: "rectongle",
            x: 100,
            y: 100,
            width: 100, 
            height: 50, 
            color: "#000000",
        },
    ]);

    const getShapesDetails = () => {
        return shapesDetails.map((shapeDetails, index) => {
            const attributes = {};
            for(let detail in shapeDetails){
                if(detail !== "type"){
                    attributes[detail] = shapeDetails[detail];
                }
            }

            return <ShapeDetail key={ index } name="test123" type={ shapeDetails.type } attributes={ attributes }></ShapeDetail>
        });
    };

    return(
        <div className="hierarchy-panel">
            <div className="shapes-details-container">
                { getShapesDetails() }
            </div>
            <div className="buttons-container">
                <div className="button horizontal-line"></div>
                <div className="button vertical-line"></div>
                <div className="button rectongle"></div>
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
