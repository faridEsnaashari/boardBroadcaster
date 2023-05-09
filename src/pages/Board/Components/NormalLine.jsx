
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

export default NormalLine;
