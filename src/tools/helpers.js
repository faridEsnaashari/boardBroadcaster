const getElementValue = id => {
    const element = document.getElementById(id);
    if(!element){
        return;
    }

    return element.value;
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) ) + min; 

const getRandomBoardColor = () => {
    const colors = [ "#d04f4f", "#d0984f", "#a8d04f", "#4fd0ac" ];

    const randomNumber = getRandomNumber(0, 3);

    return colors[randomNumber];
};

export {
    getElementValue,
    getRandomNumber,
    getRandomBoardColor,
};
