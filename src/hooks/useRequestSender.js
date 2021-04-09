import axios from "axios";
import baseUrl from "../tools/config";
import { useState } from "react";

const useRequestSender = () => {
    const [ fetching, setFetching ] = useState(false);

    axios.defaults.baseURL = baseUrl;

    axios.interceptors.request.use(config => { 
        setFetching(true);
        return config;
    }, () => { setFetching(false) });

    axios.interceptors.response.use(() => setFetching(false));

    return { fetching, axios };
};
export default useRequestSender;
