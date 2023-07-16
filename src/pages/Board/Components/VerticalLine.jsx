import React from "react";

const VerticalLine = (props) => {
    const { 
        onSelectedChange,
        shapeStyles, 
        id, 
        attributes, 
        selected,
        hoverd,
    } = props;

    const prepareVerticalLine = () => {
        const left = `${ attributes.x }px`;
        const top = `${ attributes.y }px`;

        shapeStyles.left = left;
        shapeStyles.top = top;

        shapeStyles.width = `2px`;
        shapeStyles.height = `${ attributes.length }px`;

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
                prepareVerticalLine()
            }
        </>
    );
};

export default VerticalLine;
