import axios from "axios";
import { getToken } from "../auth";

export const BASE_URL = 'http://localhost:9091/api/v1';

export const myAxios = axios.create({
    baseURL:BASE_URL,
});

//private axios for JWT (tokens)
export const privateAxios = axios.create({
    baseURL:BASE_URL
});

//intercept request which are going through private axios
privateAxios.interceptors.request.use((config)=>{

    const token = getToken();
    
    //
    if (token)
    {
        

        //ensures that the header object is defined
        // config.headers = config.headers || {};

        // //ensures that the common property within headers is defined
        // config.headers.common = config.headers.common || {};

        // config.headers.common.Authorization = `Bearer ${token}`
        // console.log("---");
        // console.log(config.headers.common.Authorization);
        // console.log("---");
        // console.log("I M HEMLOOO VROO");
        config.headers.Authorization =`Bearer ${token}`
        return config;
    }
}, (error)=> Promise.reject(error))