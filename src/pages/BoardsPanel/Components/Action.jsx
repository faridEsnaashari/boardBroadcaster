import React, { useEffect, useRef, useState } from "react";

import LoadingCircle from "../../../components/GeneralComponents/LoadingCircle/LoadingCircle";

import "../Styles/actionStyle.css";

const Action = props => {

    const {
        onClick,
        color,
        tooltipText,
        icon: Icon,
        isLoading,
        done,
    } = props;

    useEffect(() => {
        if(!done){
            return;
        }

        const doneDOM = doneRef.current;
        console.log(doneDOM);
        doneDOM.classList.remove("done-hide");
        doneDOM.classList.add("done-show");

        setTimeout(() => {
            doneDOM.classList.remove("done-show");
            doneDOM.classList.add("done-hide");
        }, 2000);
    }, [done]);

    const [ resetTooltipPostionTimeout, setResetTooltipPostitionTimeOut ] = useState(null);

    const tooltipRef = useRef(null);

    const doneRef = useRef(null);

    useEffect(() => tooltipRef.current && (tooltipRef.current.innerHTML = tooltipText), [tooltipText]);

    useEffect(() => {
        const tooltip = document.createElement("p");
        tooltip.classList.add("tooltip");
        tooltip.innerHTML = tooltipText;

        tooltipRef.current = tooltip;

        document.body.appendChild(tooltip);

        return () => document.body.removeChild(tooltip);
    }, []);

    const getTooltipPosition = (tooltip, action) => {
        const tooltipBoundingClientRect = tooltip.getBoundingClientRect();
        const actionBoundingClientRect = action.getBoundingClientRect();

        return {
            top: actionBoundingClientRect.top - tooltipBoundingClientRect.height - 5,
            left: actionBoundingClientRect.left + (actionBoundingClientRect.width / 2) - (tooltipBoundingClientRect.width / 2),
        };
    }

    const toggleTooltipShowStatus = (e, showStatus) => {
        if(!tooltipRef.current){
            return; 
        }

        if(showStatus){
            tooltipRef.current.style.top = getTooltipPosition(tooltipRef.current, e.target).top + "px";
            tooltipRef.current.style.left = getTooltipPosition(tooltipRef.current, e.target).left + "px";

            if(resetTooltipPostionTimeout){
                clearTimeout(resetTooltipPostionTimeout);
            }

            tooltipRef.current.classList.add("tooltip-show");
        }
        else{
            setResetTooltipPostitionTimeOut(setTimeout(() => {
                tooltipRef.current.style.top = 0 + "px";
                tooltipRef.current.style.left = 0 + "px";
            }, 300));

            tooltipRef.current.classList.remove("tooltip-show");
        }
    };

    return(
        <div 
            className="actions-container"
            onClick={ onClick }
            style={{ backgroundColor: color }}
            onMouseOver={ (e) => toggleTooltipShowStatus(e, true) }
            onMouseLeave={ (e) => toggleTooltipShowStatus(e, false) }
        >
            <div className={ `actions ${ isLoading && "actions-loading" }` }>
                <div ref={ doneRef } style={{ backgroundColor: color }} className="done-hide done-container">
                    <div></div>
                </div>
                <div>
                    <LoadingCircle size="3" color="#fff"/>
                </div>
                <img src={ Icon }/>
            </div>
        </div>
    );
};

export default Action;
