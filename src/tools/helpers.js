const getElementValue = id => {
    const element = document.getElementById(id);
    if(!element){
        return;
    }

    return element.value;
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) ) + min; 

export {
    getElementValue,
    getRandomNumber,
};
