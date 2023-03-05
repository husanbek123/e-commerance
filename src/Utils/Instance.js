import axios from "axios";

let Instance = axios.create({
    // baseURL: "http://3.19.30.204/",
    baseURL: "https://jsonplaceholder.typicode.com/",
    timeout: 10000,
    headers: {
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        "Access-Control-Allow-Origin": "*"
    }
})

export default Instance
