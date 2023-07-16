import React from "react";

const HorizontalLine = (props) => {
    const { 
        shapeStyles, 
        id, 
        attributes, 
        selected,
        onSelectedChange,
        hoverd,
    } = props;

    const prepareHorizontalLine = () => {
        const left = `${ attributes.x }px`;
        const top = `${ attributes.y }px`;

        shapeStyles.left = left;
        shapeStyles.top = top;

        shapeStyles.width = `${ attributes.length }px`;
        shapeStyles.height = `2px`;

        shapeStyles.zIndex = selected ? 1 : 0;

        return(
            <div className="shape" style={ shapeStyles } id={ id } onClick={ () => onSelectedChange({ shape: id }) }>
                <div className={` shape-selection-box ${ (selected || hoverd) && "shape-selection-box-selected" } `}></div>
            </div>
        );
    };

    return(
        <>
            {
                prepareHorizontalLine()
            }
        </>
    );
};

export default HorizontalLine;
