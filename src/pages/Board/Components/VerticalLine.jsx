
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

export default VerticalLine;
