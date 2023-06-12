import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import LoadingCircle from "../../../components/GeneralComponents/LoadingCircle/LoadingCircle";
import HierarchyPanel from "./HierarchyPanel";
import DrawingPanel from "./DrawingPanel";

import UserDetailsContext from "../../../contexts/userDetails";

import "../Styles/boardStyles.css";

const Board = props => {
    const { id } = useParams();
    const history = useHistory();

    const [ shapes, setShapes ] = useState([]);
    const onShapesUpdated = updatedShapes => {
        setShapes(updatedShapes)
    };

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
    useEffect(() => console.log(board), [board]);


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
                <HierarchyPanel shapes={ shapes } onShapesUpdated={ onShapesUpdated } onSelectedChange={ changeSelection }/>
                <DrawingPanel shapes={ shapes } selected={ selected } onShapesUpdated={ onShapesUpdated }/>
            </div>
        );
    }
};

export default Board;
