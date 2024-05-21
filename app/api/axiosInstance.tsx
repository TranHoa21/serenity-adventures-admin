import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true, // Tự động gửi và nhận cookie
    baseURL: 'https://serenity-adventures-demo.onrender.com/api/v1', // Điều chỉnh baseURL của Axios nếu cần thiết
});

export default axiosInstance;