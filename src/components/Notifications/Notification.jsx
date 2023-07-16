import React from "react";

import "./notificationStyles.css";

const Notification = props => {

    const {
        type,
        message,
    } = props;

    return(
        <div className={ ` 
            notification-container 
            ${ !type && "notification-container-close" } 
            ${ "notification-container-" + type }
            `}>
            <div>{ message }</div>
        </div>
    );
};

export default Notification;
