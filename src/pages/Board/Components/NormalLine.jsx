
const NormalLine = (props) => {
    const { 
        onSelectedChange,
        shapeStyles, 
        id, 
        attributes, 
        selected 
    } = props;

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
        shapeStyles.height = `2px`;

        const left = `${ attributes.x1 }px`;
        const top = `${ attributes.y1 }px`;

        const normalLineHolderStyles = {
            transform: `rotate(${ angleInDegree }deg)`,
            width: "1px",
            height: "1px",
            position: "absolute",
            top: top,
            left: left,
            zIndex: selected ? 1 : 0,
        };

        return(
            <div style={ normalLineHolderStyles }>
                <div className="shape" style={ shapeStyles } id={ id } onClick={ () => onSelectedChange({ shape: id }) }>
                    <div className={` shape-selection-box ${ selected && "shape-selection-box-selected" } `}></div>
                </div>
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

export default NormalLine;
