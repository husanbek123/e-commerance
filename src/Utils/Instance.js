import axios from "axios";

let Instance = axios.create({
    baseURL: "http://3.19.30.204/api/",
    timeout: 10000
})

export default Instance