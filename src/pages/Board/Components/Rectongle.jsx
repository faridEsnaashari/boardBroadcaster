
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

export default Rectongle;
