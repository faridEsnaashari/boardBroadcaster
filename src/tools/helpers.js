const getElementValue = id => {
    const element = document.getElementById(id);
    if(!element){
        return;
    }

    return element.value;
};

export {
    getElementValue,
};
