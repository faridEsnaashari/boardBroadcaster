import { createContext } from "react";

export const userDetailsContext = {
    user: {},
    updateUserDetails: null,
};

const UserDetailsContext = createContext(userDetailsContext);
export default UserDetailsContext;
