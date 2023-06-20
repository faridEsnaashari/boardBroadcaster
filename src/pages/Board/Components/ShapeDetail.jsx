import { useState, useRef, useEffect } from "react";
import Attribute from "./Attribute";

import "../Styles/shapeDetail.css";

const ShapeDetail = (props) => {
    const {
        name: shapeName,
        attributes,
        type,
        onAttributesChanged,
        onClick: onClickRef,
        selected,
    } = props;

    const shapeDetailsRef = useRef(null);
    useEffect(() => selected ?
        shapeDetailsRef.current.classList.add("button-clicked")
        :
        shapeDetailsRef.current.classList.remove("button-clicked")
        , [selected]);

    const [ attributesOpening, setAttributesOpening ] = useState(false);

    const onThisShapeAttributesChanged = (attributeName, attributeValue) => {
        const shapeWithNewAttributes = { 
            name: shapeName, 
            type: type, 
            attributes: { ...attributes },
        };
        shapeWithNewAttributes.attributes[attributeName] = attributeValue;

        onAttributesChanged(shapeWithNewAttributes);
    };

    const onClick = () => {
        onClickRef();
        setAttributesOpening(!attributesOpening);
    };

    const getShapeTypeClass = () => {
        const shapeTypesClassDictionary = {
            horizontalLine: "horizontal-line",
            verticalLine: "vertical-line",
            normalLine: "normal-line",
            rectongle: "rectongle",
        };

        return shapeTypesClassDictionary[type];
    }

    const getAttributes = () => {
        let renderedComponents = [];
        for(let attribute in attributes){
            renderedComponents.push(
                <Attribute 
                    key={ renderedComponents.length }
                    attribute={ attribute }
                    shapeName={ shapeName }
                    value={ attributes[attribute] }
                    onAttributesChanged={ onThisShapeAttributesChanged }
                />
            );
        }

        return renderedComponents;
    };

    return(
        <div 
            ref={ shapeDetailsRef } 
            className={` shape-detail-container button ${ getShapeTypeClass() }`} 
            key={ shapeName } 
            onClick={ onClick }
            onBlur={ () => setAttributesOpening(false) }
            tabIndex="1"
        >
            <div className={` attributes-container ${ attributesOpening && "attributes-container-open" } `}>
                { getAttributes() }
            </div>
        </div>
    );
};

export default ShapeDetail;
