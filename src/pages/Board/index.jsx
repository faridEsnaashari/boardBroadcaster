import { useState } from "react";

import HierarchyPanel from "./Components/HierarchyPanel";
import DrawingPanel from "./Components/DrawingPanel";

import "./Styles/indexStyles.css";

const Board = props => {
    const [ shapes, setShapes ] = useState([]);
    const onShapesUpdated = updatedShapes => {
setShapes(updatedShapes)
    };

    const [ selected, setSelected ] = useState();
    const changeSelection = select => setSelected(select);

    return(
        <div className="panels-container">
            <HierarchyPanel shapes={ shapes } onShapesUpdated={ onShapesUpdated } onSelectedChange={ changeSelection }/>
            <DrawingPanel shapes={ shapes } selected={ selected } onShapesUpdated={ onShapesUpdated }/>
        </div>
    );
};

export default Board;
