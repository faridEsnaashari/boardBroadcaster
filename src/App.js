import { useState } from "react";

import "./App.css";

import DrawingPanel from "./components/DrawingPanel/index";
import HierarchyPanel from "./components/HierarchyPanel/index";

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
