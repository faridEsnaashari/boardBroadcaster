import "./index.css";

const DrawingPanel = (props) => {
    const shapes = props.shapes;

    const getShapes = () => {
        return shapes.map((shape, index) => {
            return(<Shape shapeDetails={ shape } key={ index }/>);
        });
    };

    return(
        <div className="drawing-panel" id="drawingPanel">
            {
                getShapes()
            }
        </div>
    )
};

const Shape = (props) => {
    const {
        attributes, 
        name,
        type,
    } = props.shapeDetails;

    const setFinalStyles = shapeStyles => {
        const left = `${ attributes.x }px`;
        const top = `${ attributes.y }px`;

        const color = attributes.color;

        shapeStyles.left = left;
        shapeStyles.top = top;

        shapeStyles.border = `1px solid ${ color }`;
        shapeStyles.borderRadius = "2px";

        return shapeStyles;
    };

    const preperShape = () => {
        let shapeStyles = {};

        switch(type){
            case "rectongle":
                shapeStyles.height = `${ attributes.height }px`;
                shapeStyles.width = `${ attributes.width }px`;
                break;

            case "horizontalLine":
                shapeStyles.height = `0px`;
                shapeStyles.width = `${ attributes.length }px`;
                break;

            case "verticalLine":
                shapeStyles.width = `0px`;
                shapeStyles.height = `${ attributes.length }px`;
                break;

            default:
                break;
        }

        shapeStyles = setFinalStyles(shapeStyles);

        return (<div className="shape" id={ name } style={ shapeStyles }></div>);
    };

    return(
        <>
            {
                preperShape()
            }
        </>
    )
};


export default DrawingPanel;
