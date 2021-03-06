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

    const setCommonStyles = shapeStyles => {

        const color = attributes.color;


        shapeStyles.border = `1px solid ${ color }`;
        shapeStyles.borderRadius = "2px";

        return shapeStyles;
    };

    const prepareShape = () => {
        let shapeStyles = {};

        shapeStyles = setCommonStyles(shapeStyles);

        return (
            <>
                {
                    type === "verticalLine" && <VerticalLine shapeStyles={ shapeStyles } id={ name } attributes={ attributes }/>
                }
                {
                    type === "horizontalLine" && <HorizontalLine shapeStyles={ shapeStyles } id={ name } attributes={ attributes }/>
                }
                {
                    type === "normalLine" && <NormalLine shapeStyles={ shapeStyles } id={ name } attributes={ attributes }/>
                }
                {
                    type === "rectongle" && <Rectongle shapeStyles={ shapeStyles } id={ name } attributes={ attributes }/>
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

const Rectongle = (props) => {
    const { shapeStyles, name, attributes } = props;

    const prepareRectangle = () => {
        const left = `${ attributes.x }px`;
        const top = `${ attributes.y }px`;

        shapeStyles.left = left;
        shapeStyles.top = top;

        shapeStyles.height = `${ attributes.height }px`;
        shapeStyles.width = `${ attributes.width }px`;

        return(<div className="shape" style={ shapeStyles } id={ name }></div>);
    };

    return(
        <>
            {
                prepareRectangle()
            }
        </>
    );
};

const HorizontalLine = (props) => {
    const { shapeStyles, name, attributes } = props;

    const prepareHorizontalLine = () => {
        const left = `${ attributes.x }px`;
        const top = `${ attributes.y }px`;

        shapeStyles.left = left;
        shapeStyles.top = top;

        shapeStyles.width = `${ attributes.length }px`;
        shapeStyles.height = `0px`;

        return(<div className="shape" style={ shapeStyles } id={ name }></div>);
    };

    return(
        <>
            {
                prepareHorizontalLine()
            }
        </>
    );
};

const VerticalLine = (props) => {
    const { shapeStyles, name, attributes } = props;

    const prepareVerticalLine = () => {
        const left = `${ attributes.x }px`;
        const top = `${ attributes.y }px`;

        shapeStyles.left = left;
        shapeStyles.top = top;

        shapeStyles.width = `0px`;
        shapeStyles.height = `${ attributes.length }px`;

        return(<div className="shape" style={ shapeStyles } id={ name }></div>);
    };

    return(
        <>
            {
                prepareVerticalLine()
            }
        </>
    );
};

const NormalLine = (props) => {
    const { shapeStyles, name, attributes } = props;

    const prepareNormal = () => {
        const { x1, y1, x2, y2 } = attributes;

        const length = y2 - y1;
        const width = x2 - x1;

        const squreOfLength = length * length;
        const squreOfWidth = width * width;

        const sum = squreOfWidth + squreOfLength;

        const diagonalLength = Math.sqrt(sum);

        const angleInRadians = Math.atan2(y2 - y1, x2 - x1);
        const angleInDegree = angleInRadians * 180 / Math.PI;

        shapeStyles.width = `${ diagonalLength }px`;
        shapeStyles.height = `0px`;

        const left = `${ attributes.x1 }px`;
        const top = `${ attributes.y1 }px`;

        const normalLineHolderStyles = {
            transform: `rotate(${ angleInDegree }deg)`,
            width: "1px",
            height: "1px",
            position: "absolute",
            top: top,
            left: left,
        };

        return(
            <div style={ normalLineHolderStyles }>
                <div className="shape" style={ shapeStyles } id={ name }></div>
            </div>
        );
    };

    return(
        <>
            {
                prepareNormal()
            }
        </>
    );
};


export default DrawingPanel;
