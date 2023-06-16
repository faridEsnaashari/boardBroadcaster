import { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";

import useAPICaller from "../../../APIs/APICallers/APICallers";
import { SUCCESS_MSG } from "../../../tools/statusCodes";

import Socket from "../../../sockets/socket";

import LoadingCircle from "../../../components/GeneralComponents/LoadingCircle/LoadingCircle";
import DrawingPanel from "./DrawingPanel";

import "../Styles/boardStyles.css";

const Board = props => {
    const shapesRef = useRef([]);
    const [ shapes, setShapes ] = useState([]);

    const onDraw = updatedShape => {
        let shapeWasExisted = false;

        const updatedShapes = shapesRef.current.map(shape => {
            if(shape.name !== updatedShape.name){
                return shape;
            }

            shapeWasExisted = true;
            return updatedShape;
        });

        shapeWasExisted ? shapesRef.current = updatedShapes : shapesRef.current = [ ...updatedShapes, updatedShape ];
        setShapes(shapesRef.current)
    };

    const getShapes = () => shapesRef.current;

    const initShapes = shapes => {
        shapesRef.current = shapes;
        setShapes(shapes);
    };

    const history = useHistory();

    const [ doesBoardExistAction, doesBoardExistResult ] = useAPICaller().doesBoardExistCaller;

    const { id } = useParams();

    useEffect(() => {
        doesBoardExistAction({ id })

        new Socket(onDraw, getShapes, initShapes, id);
    }, []);

    if(doesBoardExistResult.status === SUCCESS_MSG){
        return(
            <div className="panels-container">
                <DrawingPanel shapes={ shapes } paintable={ false }/>
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
