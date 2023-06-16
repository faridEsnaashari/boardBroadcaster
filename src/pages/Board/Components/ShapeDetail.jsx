import Attribute from "./Attribute";

import "../Styles/shapeDetail.css";

const ShapeDetail = (props) => {
    const {
        name: shapeName,
        attributes,
        type,
        onAttributesChanged,
        onClick,
    } = props;

    const onThisShapeAttributesChanged = (attributeName, attributeValue) => {
        const shapeWithNewAttributes = { 
            name: shapeName, 
            type: type, 
            attributes: { ...attributes },
        };
        shapeWithNewAttributes.attributes[attributeName] = attributeValue;

        onAttributesChanged(shapeWithNewAttributes);
    };

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
        <div className="shape-detail-container" key={ shapeName } onClick={ onClick }>
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

export default ShapeDetail;
