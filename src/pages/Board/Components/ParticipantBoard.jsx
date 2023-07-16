import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";

import useAPICaller from "../../../APIs/APICallers/APICallers";
import { SUCCESS_MSG } from "../../../tools/statusCodes";

import Socket from "../../../sockets/socket";

import LoadingCircle from "../../../components/GeneralComponents/LoadingCircle/LoadingCircle";
import DrawingPanel from "./DrawingPanel";

import "../Styles/boardStyles.css";

const Board = () => {
    const shapesRef = useRef([]);
    const [ shapes, setShapes ] = useState([]);

    const [ drawingPanelSize, setDrawingPanelSize ] = useState({ width: 0, height: 0 });
    const drawingPanelSizeRef = useRef({ width: 0, height: 0 });
    useEffect(() => drawingPanelSizeRef.current = drawingPanelSize, [drawingPanelSize]);

    const changePixelToRelative = (value, axis) => value / (drawingPanelSizeRef.current)[axis === "x" ? "width" : "height"];

    const changeRelativeToPixel = (value, axis) => (drawingPanelSizeRef.current)[axis === "x" ? "width" : "height"] * value;

    const changeShapeValues = (type, shapeType, attributes) => {
        
        let { 
            x,
            y,
            length,
            x1,
            x2,
            y1,
            y2,
            width,
            height,
            ...rest
        } = attributes;

        switch(shapeType){
            case "horizontalLine" :
                return {
                    ...rest,
                    x: type === "relative" ? changePixelToRelative(x, "x") : changeRelativeToPixel(x, "x"),
                    y: type === "relative" ? changePixelToRelative(y, "y") : changeRelativeToPixel(y, "y"),
                    length: type === "relative" ? changePixelToRelative(length, "x") : changeRelativeToPixel(length, "x"),
                }

            case "verticalLine" :
                return {
                    ...rest,
                    x: type === "relative" ? changePixelToRelative(x, "x") : changeRelativeToPixel(x, "x"),
                    y: type === "relative" ? changePixelToRelative(y, "y") : changeRelativeToPixel(y, "y"),
                    length: type === "relative" ? changePixelToRelative(length, "y") : changeRelativeToPixel(length, "y"),
                }

            case "rectongle" :
                return {
                    ...rest,
                    x: type === "relative" ? changePixelToRelative(x, "x") : changeRelativeToPixel(x, "x"),
                    y: type === "relative" ? changePixelToRelative(y, "y") : changeRelativeToPixel(y, "y"),
                    width: type === "relative" ? changePixelToRelative(width, "x") : changeRelativeToPixel(width, "x"),
                    height: type === "relative" ? changePixelToRelative(height, "y") : changeRelativeToPixel(height, "y"),
                }

            case "normalLine" :
                return {
                    ...rest,
                    x1: type === "relative" ? changePixelToRelative(x1, "x") : changeRelativeToPixel(x1, "x"),
                    y1: type === "relative" ? changePixelToRelative(y1, "y") : changeRelativeToPixel(y1, "y"),
                    y2: type === "relative" ? changePixelToRelative(y2, "y") : changeRelativeToPixel(y2, "y"),
                    x2: type === "relative" ? changePixelToRelative(x2, "x") : changeRelativeToPixel(x2, "x"),
                }
        }
    };

    const onDraw = updatedShape => {
        let shapeWasExisted = false;

        const preparedUpdatedShape = {
            ...updatedShape,
            attributes: changeShapeValues("pixel", updatedShape.type, updatedShape.attributes),
        }

        const updatedShapes = shapesRef.current.map(shape => {
            if(shape.name !== preparedUpdatedShape.name){
                return shape;
            }

            shapeWasExisted = true;
            return preparedUpdatedShape;
        });

        shapeWasExisted ? shapesRef.current = updatedShapes : shapesRef.current = [ ...updatedShapes, preparedUpdatedShape ];
        setShapes(shapesRef.current)
    };

    const initShapes = shapes => {
        const updatedShapes = shapes.map(shape => ({
            ...shape,
            attributes: changeShapeValues("pixel", shape.type, shape.attributes),
        }));

        shapesRef.current = updatedShapes;
        setShapes(updatedShapes);
    };

    const history = useHistory();

    const [ doesBoardExistAction, doesBoardExistResult ] = useAPICaller().doesBoardExistCaller;

    const { id } = useParams();

    useEffect(() => {
        doesBoardExistAction({ id })

        new Socket(id, initShapes, onDraw, onDelete);
    }, []);

    const onDelete = deletedShape => {
        let updatedShapes = [];

        if(deletedShape){
            updatedShapes = shapesRef.current.filter(shape => shape.name !== deletedShape.name);
        }

        setShapes(updatedShapes);
        shapesRef.current = updatedShapes;
    };

    if(doesBoardExistResult.status === SUCCESS_MSG){
        return(
            <div className="panels-container">
                <DrawingPanel 
                    shapes={ shapes } 
                    paintable={ false } 
                    setDrawingPanelSize={ setDrawingPanelSize }
                />
            </div>
        );
    }

    else if(doesBoardExistResult.error){
        history.push("/board/not_found");

        return(<div>board not found</div>);
    }

    else
        return (
            <div className="private-route-loading-container">
                <div className="private-route-loading-main">
                    <LoadingCircle/>
                </div>
            </div>
        );
};

export default Board;
