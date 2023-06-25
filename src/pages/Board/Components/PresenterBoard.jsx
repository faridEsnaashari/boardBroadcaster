import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";


import Socket from "../../../sockets/socket";

import LoadingCircle from "../../../components/GeneralComponents/LoadingCircle/LoadingCircle";
import HierarchyPanel from "./HierarchyPanel";
import DrawingPanel from "./DrawingPanel";
import ShapesList from "./ShapesList";

import UserDetailsContext from "../../../contexts/userDetails";

import "../Styles/boardStyles.css";

const Board = props => {
    const [ socket, setSocket ] = useState(null);

    const [ drawingPanelSize, setDrawingPanelSize ] = useState({ width: 0, height: 0 });
    const drawingPanelSizeRef = useRef({ width: 0, height: 0 });
    useEffect(() => drawingPanelSizeRef.current = drawingPanelSize, [drawingPanelSize]);

    const [ hoverdShape, setHoveredShape ] = useState(null);

    const [ shapesListOpening, setShapesListOpening ] = useState(false);

    const shapesRef = useRef([]);
    const [ shapes, setShapes ] = useState([]);

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

    const onAShapeUpdated = updatedShape => {
        const preparedUpdatedShape = {
            ...updatedShape,
            attributes: changeShapeValues("relative", updatedShape.type, updatedShape.attributes),
        };

        socket && socket.sendShape(preparedUpdatedShape)
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

    const getShapes = () => shapesRef.current.map(shape => ({
        ...shape,
        attributes: changeShapeValues("relative", shape.type, shape.attributes),
    }));

    const initShapes = shapes => {
        const updatedShapes = shapes.map(shape => ({
            ...shape,
            attributes: changeShapeValues("pixel", shape.type, shape.attributes),
        }));

        shapesRef.current = updatedShapes;
        setShapes(updatedShapes);
    };

    const { id } = useParams();
    const history = useHistory();

    const [ selected, setSelected ] = useState();
    const changeSelection = select => setSelected({ ...selected, ...select });

    const userDetailsContext = useContext(UserDetailsContext);
    const [ board, setBoard ] = useState("wait");
    useEffect(() => {
        if(!userDetailsContext.user.boards){
            return;
        }

        const { boards } = userDetailsContext.user;

        setBoard(boards.find(board => board.boardIdentifier === id));
    }, [userDetailsContext]);

    useEffect(() => {
        const newSocket = new Socket(onDraw, getShapes, initShapes, id);
        setSocket(newSocket);
    }, []);

    if(!board){
        history.push("/board/not_found");

        return(<div>board not found</div>);
    }

    if(board === "wait"){
        return (
            <div className="private-route-loading-container">
                <div className="private-route-loading-main">
                    <LoadingCircle/>
                </div>
            </div>
        );
    }

    else{
        return(
            <div className="panels-container">
                <HierarchyPanel 
                    onAShapeUpdated={ onAShapeUpdated } 
                    onSelectedChange={ changeSelection }
                    onShapesListOpening={ setShapesListOpening }
                />
                <ShapesList
                    shapes={ shapes }
                    onAShapeUpdated={ onAShapeUpdated } 
                    onSelectedChange={ changeSelection }
                    shapesListOpening={ shapesListOpening }
                    selected={ selected && selected.shape }
                    onAShapeHovered={ shape => setHoveredShape(shape) }
                />
                <DrawingPanel 
                    onSelectedChange={ changeSelection }
                    shapes={ shapes } 
                    selected={ selected } 
                    onAShapeUpdated={ onAShapeUpdated } 
                    setDrawingPanelSize={ setDrawingPanelSize }
                    paintable={ true }
                    hoverdShape={ hoverdShape }
                />
            </div>
        );
    }
};

export default Board;
