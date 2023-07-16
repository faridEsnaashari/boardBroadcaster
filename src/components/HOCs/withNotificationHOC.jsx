import React, { useState } from "react";

import NotificationsContext from "../../contexts/notificationsContext";

import Notification from "../Notifications/Notification";

const withNotification = Component => {
    const WithNotification = () => {
        const [ notif, setNotif ] = useState({ type: null, message: "" });

        const SHOW_ERROR_TIME = 3000;

        const resetNotif = time => setTimeout(() => setNotif({ type: null, message: "" }), time || SHOW_ERROR_TIME);

        const success = (message, time) => {
            setNotif({ type: "success", message });
            resetNotif(time);
        };
        const error = (message, time) => {
            setNotif({ type: "error", message });
            resetNotif(time);
        };
        const warning = (message, time) => {
            setNotif({ type: "warning", message })
            resetNotif(time);
        };
        const info = (message, time) => {
            setNotif({ type: "info", message })
            resetNotif(time);
        };

        return (
            <>
                <NotificationsContext.Provider value={{  error, warning, info, success  }}>
                    <Component></Component>
                </NotificationsContext.Provider>
                <Notification type={ notif.type } message={ notif.message }></Notification>
            </>
        );
    }

    return WithNotification;
};

export default withNotification;
