import React from "react";

import "./loadingCircleStyles.css";

const LoadingCircle = props => {
    const {
        color,
        size,
    } = props;

    const getStyle = () => {
        const style = {};

        if(color){
            style.borderTopColor = color;
        }

        if(size){
            style.borderWidth = size + "px";
        }

        return style;
    };

    return(
        <div className="loading-circle-main-container">
            <div 
                style = { getStyle() }
                className="first-loading-circle"
            >
            </div>

            <div 
                style = { getStyle() }
                className="second-loading-circle"
            >
            </div>
        </div>
    );
};

export default LoadingCircle;
