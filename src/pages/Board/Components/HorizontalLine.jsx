
const HorizontalLine = (props) => {
    const { shapeStyles, name, attributes } = props;

    const prepareHorizontalLine = () => {
        const left = `${ attributes.x }px`;
        const top = `${ attributes.y }px`;

        shapeStyles.left = left;
        shapeStyles.top = top;

        shapeStyles.width = `${ attributes.length }px`;
        shapeStyles.height = `2px`;

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

export default HorizontalLine;
