import axios from "axios";
import { API_URL } from "../tools/config";
import { useState } from "react";

const useRequestSender = () => {
    const [ fetching, setFetching ] = useState(false);

    axios.defaults.baseURL = API_URL;

    axios.interceptors.request.use(config => { 
        setFetching(true);

        const userToken = localStorage.getItem('user_token');
        if (userToken){
            config.headers.authorization = `Bearer ${ userToken }`;
        }

        return config;
    }, () => { setFetching(false) });

    axios.interceptors.response.use((response) => {
        setFetching(false);
        return response;
    });

    return { fetching, axios };
};
export default useRequestSender;
