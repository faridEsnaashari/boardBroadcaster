import React, { useState, useEffect, useRef } from "react";

import ShapeDetail from "./ShapeDetail";

import "../Styles/shapesListStyles.css";

const ShapesList = (props) => {
    const {
        onAShapeUpdated,
        onSelectedChange,
        shapes,
        shapesListOpening,
        selected,
        onAShapeHovered,
    } = props;

    const OPEN_SHAPES_LIST_TIME = 400;
    const ATTRIBUTES_CLOSING_TIME = 300;

    const shapesListRef = useRef(null);

    const [shapesDetails, setShapeDetails] = useState([]);

    const [ attributesOpening, setAttributesOpening ] = useState("");
    const [ attributesContainerOpening, setAttributesContainerOpening ] = useState(false);
    useEffect(() => attributesOpening === "" ? setTimeout(() => setAttributesContainerOpening(false), ATTRIBUTES_CLOSING_TIME) : setAttributesContainerOpening(true), [attributesOpening]);

    const onOpenOrCloseAttributes = shapeWithStatus => {
        if(!shapeWithStatus.open && shapeWithStatus.shapeName !== attributesOpening){
            return;
        }

        setAttributesOpening(shapeWithStatus.open ? shapeWithStatus.shapeName : "");
    };

    const scrollShapesList = () => {
        if(shapesListOpening){
            setTimeout(() => shapesListRef.current.scroll({ top: 100000, behavior: "smooth" }), OPEN_SHAPES_LIST_TIME);
            return;
        }

        setTimeout(() => shapesListRef.current.scroll(0, 0), OPEN_SHAPES_LIST_TIME);
    }
    useEffect(() => scrollShapesList(), [shapesListOpening]);

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
                onClick={ () => onSelectedChange({ shape: shapeDetails.name }) }
                selected={ selected && shapeDetails.name === selected }
                onOpenOrCloseAttributes={ onOpenOrCloseAttributes }
                attributesOpening={ attributesOpening }
                onAShapeHovered={ onAShapeHovered }
            />
        });
    };

    return(
        <div 
            ref={ shapesListRef } 
            className={`shapes-details-container-overflow-owner  ${ shapesListOpening && "shapes-details-container-overflow-owner-open" }`}
        >
            <div className={` shapes-details-container ${ attributesContainerOpening && "shapes-details-container-open" } `}>
                <div className="shapes-details-ui">
                    { getShapesDetails() }
                </div>
            </div>
        </div>
    )
};

export default ShapesList;
