import { useEffect, useState } from "react";

import Shape from "./Shape";

import "../Styles/DrawingPanelStyles.css";

const DrawingPanel = (props) => {
    const {
        shapes,
        selected,
        onShapesUpdated,
    } = props;

    const [ shapesShadow, setShapesShadow ] = useState(shapes);
    useEffect(() => setShapesShadow(shapes), [shapes]);
    useEffect(() => onShapesUpdated(shapesShadow), [shapesShadow]);

    const [ lastMousePosition, setLastMousePosition ] = useState({ x: 0, y: 0 });

    const [ panelClicked, setPanelClicked ] = useState(false);

    const [ panelTouched, setPanelTouched ] = useState(false);
    useEffect(() => {
        if(panelTouched){
            const windowCurrentScroll = { x: window.pageXOffset || document.documentElement.scrollLeft , y: window.pageYOffset || document.documentElement.scrollTop };
            window.onscroll = () => window.scrollTo(windowCurrentScroll.x, windowCurrentScroll.y);
            return;
        }

        window.onscroll = () => {};
    }, [panelTouched]);

    const rescaleShape = (shape, mousePostition) => {
        const { attributes, ...rest } = shape;

        let newAttributes = {};

        switch(shape.type){
            case "normalLine":
                newAttributes = {
                    x1: attributes.x1,
                    y1: attributes.y1,
                    x2: mousePostition.x,
                    y2: mousePostition.y,
                };

                return { ...rest, attributes: { ...attributes, ...newAttributes } };

            case "horizontalLine":
                newAttributes = {
                    length:  mousePostition.x - attributes.x,
                };

                return { ...rest, attributes: { ...attributes, ...newAttributes } };

            case "verticalLine":
                newAttributes = {
                    length:  mousePostition.y - attributes.y,
                };

                return { ...rest, attributes: { ...attributes, ...newAttributes } };

            case "rectongle":
                newAttributes = {
                    height:  mousePostition.y - attributes.y,
                    width:  mousePostition.x - attributes.x,
                };

                return { ...rest, attributes: { ...attributes, ...newAttributes } };
        }
    }

    const moveShape = (shape, mousePostition) => {
        const { attributes, ...rest } = shape;

        let newAttributes = {};

        switch(shape.type){
            case "normalLine":
                newAttributes = {
                    x1: mousePostition.x,
                    y1: mousePostition.y,
                    x2: attributes.x2 + mousePostition.x - attributes.x1,
                    y2: attributes.y2 + mousePostition.y - attributes.y1,
                };

                return { ...rest, attributes: { ...attributes, ...newAttributes } };

            case "horizontalLine":
                newAttributes = {
                    x: mousePostition.x,
                    y: mousePostition.y,
                };

                return { ...rest, attributes: { ...attributes, ...newAttributes } };

            case "verticalLine":
                newAttributes = {
                    x: mousePostition.x,
                    y: mousePostition.y,
                };

                return { ...rest, attributes: { ...attributes, ...newAttributes } };

            case "rectongle":
                newAttributes = {
                    x: mousePostition.x,
                    y: mousePostition.y,
                };

                return { ...rest, attributes: { ...attributes, ...newAttributes } };
        }
    }

    const updateShapeAttribute = (shape, mousePostition) => selected.mode === "rescale" ? moveShape(shape, mousePostition) : rescaleShape(shape, mousePostition);

    const paint = e => {
        if(selected.mode === "disable" || (!panelClicked && !panelTouched)){
            return;
        }

        const panelPosition = e.target.getBoundingClientRect();
        const mousePostition = { x: (e.clientX || e.touches[0].clientX) - panelPosition.x, y: (e.clientY || e.touches[0].clientY) - panelPosition.y };

        const distanceFromLastX = Math.abs(lastMousePosition.x - mousePostition.x);
        const distanceFromLastY =  Math.abs(lastMousePosition.y - mousePostition.y);

        if(distanceFromLastY < 5 && distanceFromLastX < 5){
            return;
        }

        const updatedShapes = shapesShadow.map(shape => shape.name !== selected.shape ? shape : updateShapeAttribute(shape, mousePostition));

        setShapesShadow(updatedShapes);

        setLastMousePosition({ x: mousePostition.x, y: mousePostition.y });
    };

    const getShapes = () => {
        return shapesShadow && shapesShadow.map((shape, index) => {
            const {
                attributes,
                name,
                type,
            } = shape;

            return(<Shape 
                attributes={ attributes }
                name={ name }
                type={ type }
                key={ index }
                selected={ name === selected.shape }
            />);
        });
    };

    return(
        <div 
            className="drawing-panel" 
            id="drawingPanel" 
        >
            {
                getShapes()
            }
            <div 
                className="drawing-panel-mouse-panel"
                onMouseDown={ () => setPanelClicked(true) } 
                onMouseUp={ () => setPanelClicked(false) }
                onMouseMove={ e => paint(e) }
                onTouchMove={ e => paint(e) }
                onTouchStart={ () => setPanelTouched(true) }
                onTouchEnd={ () => setPanelTouched(false) }
            >
            </div>
        </div>
    )
};

export default DrawingPanel;