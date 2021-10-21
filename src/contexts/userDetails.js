import { createContext } from "react";

export const userDetailsContext = {
    user: {},
    boards: {},
    updateUserDetails: null,
};

const UserDetailsContext = createContext(userDetailsContext);
export default UserDetailsContext;
