import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";


import Socket from "../../../sockets/socket";

import LoadingCircle from "../../../components/GeneralComponents/LoadingCircle/LoadingCircle";
import HierarchyPanel from "./HierarchyPanel";
import DrawingPanel from "./DrawingPanel";

import UserDetailsContext from "../../../contexts/userDetails";

import "../Styles/boardStyles.css";

const Board = props => {
    const [ socket, setSocket ] = useState(null);

    const shapesRef = useRef([]);
    const [ shapes, setShapes ] = useState([]);

    const onAShapeUpdated = updatedShape => {
        socket && socket.sendShape(updatedShape)
    };

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


    const { id } = useParams();
    const history = useHistory();

    const [ selected, setSelected ] = useState();
    const changeSelection = select => setSelected(select);

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
                <HierarchyPanel shapes={ shapes } onAShapeUpdated={ onAShapeUpdated } onSelectedChange={ changeSelection }/>
                <DrawingPanel shapes={ shapes } selected={ selected } onAShapeUpdated={ onAShapeUpdated } paintable={ true }/>
            </div>
        );
    }
};

export default Board;
