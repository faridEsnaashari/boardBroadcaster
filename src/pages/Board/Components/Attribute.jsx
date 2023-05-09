import "../Styles/attributeStyles.css";

const Attribute = props => {
    const {
        attribute,
        shapeName,
        value,
        onAttributesChanged,
    } = props;

    return(
        <div className="attribute">
            <label>{ attribute }</label>
            <br></br>
            <input 
                type="text" 
                name={ attribute } 
                id={ shapeName } 
                value={ value } 
                onChange={ e => onAttributesChanged(e.target.name, e.target.value) }
            />
        </div>
    );
};

export default Attribute;
