import Rectongle from "./Rectongle";
import HorizontalLine from "./HorizontalLine";
import VerticalLine from "./VerticalLine";
import NormalLine from "./NormalLine";

const Shape = (props) => {
    const {
        attributes, 
        name,
        type,
        selected,
        onSelectedChange,
    } = props;

    const setCommonStyles = shapeStyles => {

        const color = attributes.color;

        shapeStyles.backgroundColor = color;

        return shapeStyles;
    };

    const prepareRectangleAttributes = attributes => {
        const { x, y, width, height, ...rest } = attributes;

        if(width < 0 && height < 0){
            return {
                x: x + width,
                y: y + height,
                width: -1 * width,
                height: -1 * height,
                ...rest,
            };
        }

        if(width < 0){
            return {
                x: x + width,
                width: -1 * width,
                y,
                height,
                ...rest,
            };
        }

        if(height < 0){
            return {
                y: y + height,
                height: -1 * height,
                x,
                width,
                ...rest,
            };
        }

        return attributes;
    };

    const prepareHorizontalLineAttributes = attributes => {
        const { x, y, length, ...rest } = attributes;

        if(length >= 0){
            return attributes;
        }

        return {
            y,
            x: x + length,
            length: -1 * length,
            ...rest,
        };
    };

    const prepareVerticalLineAttributes = attributes => {
        const { x, y, length, ...rest } = attributes;

        if(length >= 0){
            return attributes;
        }

        return {
            x,
            y: y + length,
            length: -1 * length,
            ...rest,
        };
    };

    const prepareAttributes = attributes => {
        switch(type){
            case "horizontalLine":
                return prepareHorizontalLineAttributes(attributes);

            case "rectongle":
                return prepareRectangleAttributes(attributes);

            case "verticalLine":
                return prepareVerticalLineAttributes(attributes);
        }
    };

    const prepareShape = () => {
        let shapeStyles = {};
        shapeStyles = setCommonStyles(shapeStyles);

        const preparedAttributes = prepareAttributes(attributes);

        return (
            <>
                {
                    type === "verticalLine" && 
                        <VerticalLine 
                            selected={ selected } 
                            shapeStyles={ shapeStyles } 
                            id={ name } 
                            attributes={ preparedAttributes }
                            onSelectedChange={ onSelectedChange }
                        />
                }
                {
                    type === "horizontalLine" && 
                        <HorizontalLine 
                            selected={ selected }
                            shapeStyles={ shapeStyles } 
                            id={ name }
                            attributes={ preparedAttributes }
                            onSelectedChange={ onSelectedChange }
                        />
                }
                {
                    type === "normalLine" && 
                        <NormalLine
                            selected={ selected }
                            shapeStyles={ shapeStyles }
                            id={ name }
                            attributes={ attributes }
                            onSelectedChange={ onSelectedChange }
                        />
                }
                {
                    type === "rectongle" && 
                        <Rectongle 
                            selected={ selected }
                            shapeStyles={ shapeStyles }
                            id={ name }
                            attributes={ preparedAttributes }
                            onSelectedChange={ onSelectedChange }
                        />
                }
            </>
        );
    };

    return(
        <>
            {
                prepareShape()
            }
        </>
    )
};

export default Shape;
