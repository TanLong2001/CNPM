import axios from 'axios'


const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000',
    
})
// axiosInstance.defaults.withCredentials = true
export default axiosInstance;
