import React from "react";

const Rectongle = (props) => {
    const { 
        onSelectedChange,
        shapeStyles, 
        id, 
        attributes, 
        selected,
        hoverd,
    } = props;

    const prepareRectangle = () => {
        const left = `${ attributes.x }px`;
        const top = `${ attributes.y }px`;

        shapeStyles.left = left;
        shapeStyles.top = top;

        shapeStyles.height = `${ attributes.height }px`;
        shapeStyles.width = `${ attributes.width }px`;

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
                prepareRectangle()
            }
        </>
    );
};

export default Rectongle;
