import axios from "axios";
import API_URL from "./baseUrl";

const axiosBase = axios.create({
    baseURL: API_URL,
});

export default axiosBase;
