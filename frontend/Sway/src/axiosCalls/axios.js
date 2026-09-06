// baseUrl - 
// Header - ; content-type - json 
// cookies

import axios from "axios";

const axiosInstance = axios.create({
     baseURL : 'http://localhost:8000/',
     withCredentials : true,
     headers : {
        "Content-type" : "application/json"
     }
})

export default axiosInstance