import { useState } from "react";

import HierarchyPanel from "./HierarchyPanel";
import DrawingPanel from "./DrawingPanel";

const Board = props => {
    const [ shapes, setShapes ] = useState();
    const onShapesUpdated = updatedShapes => setShapes(updatedShapes);

    return(
        <>
            <HierarchyPanel onShapesUpdated={ onShapesUpdated }/>
            <DrawingPanel shapes={ shapes }/>
        </>
    );
};

export default Board;
