import { useState, useRef, useEffect } from "react";
import Attribute from "./Attribute";

import "../Styles/shapeDetail.css";

const ShapeDetail = (props) => {
    const {
        name: shapeName,
        attributes,
        type,
        onAttributesChanged,
        onClick: onClickProp,
        selected,
        onOpenOrCloseAttributes,
        attributesOpening,
    } = props;

    const shapeDetailsRef = useRef(null);
    useEffect(() => selected ?
        shapeDetailsRef.current.classList.add("button-clicked")
        :
        shapeDetailsRef.current.classList.remove("button-clicked")
        , [selected]);

    const [ open, setOpen ] = useState(false);
    useEffect(() => onOpenOrCloseAttributes({ shapeName, open }), [open]);

    useEffect(() => {
        attributesOpening !== shapeName ? setOpen(false) : shapeDetailsRef.current.focus();
    }, [attributesOpening]);

    const onClick = () => {
        onClickProp();
        setOpen(true);
    }

    const onThisShapeAttributesChanged = (attributeName, attributeValue) => {
        const shapeWithNewAttributes = { 
            name: shapeName, 
            type: type, 
            attributes: { ...attributes },
        };
        shapeWithNewAttributes.attributes[attributeName] = attributeValue;

        onAttributesChanged(shapeWithNewAttributes);
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
            onMouseEnter={ () => setOpen(true) }
            onBlur={ () => setOpen(false) }
            tabIndex="1"
        >
            <div 
                className={` attributes-container ${ attributesOpening === shapeName ? "attributes-container-open" : "attributes-container-close" } `}
                onMouseLeave={ () => setOpen(false) }
            >
                { getAttributes() }
            </div>
        </div>
    );
};

export default ShapeDetail;
