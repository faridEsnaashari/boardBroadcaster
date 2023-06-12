import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import useAPICaller from "../../../APIs/APICallers/APICallers";
import { SUCCESS_MSG } from "../../../tools/statusCodes";

import LoadingCircle from "../../../components/GeneralComponents/LoadingCircle/LoadingCircle";
import HierarchyPanel from "./HierarchyPanel";
import DrawingPanel from "./DrawingPanel";

import "../Styles/boardStyles.css";

const Board = props => {
    const [ shapes, setShapes ] = useState([]);
    const onShapesUpdated = updatedShapes => {
        setShapes(updatedShapes)
    };

    const history = useHistory();

    const [ doesBoardExistAction, doesBoardExistResult ] = useAPICaller().doesBoardExistCaller;

    const { id } = useParams();

    useEffect(() => doesBoardExistAction({ id }), []);

    const [ selected, setSelected ] = useState();
    const changeSelection = select => setSelected(select);

    if(doesBoardExistResult.status === SUCCESS_MSG){
        return(
            <div className="panels-container">
                <HierarchyPanel shapes={ shapes } onShapesUpdated={ onShapesUpdated } onSelectedChange={ changeSelection }/>
                <DrawingPanel shapes={ shapes } selected={ selected } onShapesUpdated={ onShapesUpdated }/>
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
