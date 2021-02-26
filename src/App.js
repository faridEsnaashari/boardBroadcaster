import "./App.css";

import DrawingPanel from "./components/DrawingPanel/index";
import HierarchyPanel from "./components/HierarchyPanel/index";

const App = () => {
    return(
        <div className="panels-container">
            <HierarchyPanel></HierarchyPanel>
            <DrawingPanel></DrawingPanel>
        </div>
    )
};
export default App;
