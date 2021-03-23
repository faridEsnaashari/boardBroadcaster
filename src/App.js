import { useState } from "react";

import "./App.css";

import DrawingPanel from "./pages/DrawingPanel/index";
import HierarchyPanel from "./pages/HierarchyPanel/index";

const App = () => {
    const [shapes, setShapes] = useState([]);

    const updateShapes = shapes => setShapes(shapes);

    return(
        <div className="panels-container">
            <HierarchyPanel onShapesUpdated={ updateShapes }></HierarchyPanel>
            <DrawingPanel shapes={ shapes }></DrawingPanel>
        </div>
    )
};
export default App;
