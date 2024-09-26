import axios from 'axios';
import _ from 'lodash';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BE_HR, // Chú ý: Sử dụng NEXT_PUBLIC cho biến môi trường
    withCredentials: true
});

// Interceptor xử lý phản hồi
instance.interceptors.response.use(
    (response) => {
        // Trả về dữ liệu trong response
        return response.data; // Trả về dữ liệu đã giải nén từ response
    },
    (error) => {
        // Xử lý lỗi khi có lỗi phản hồi từ server
        return Promise.reject(error); // Trả về lỗi để xử lý ở nơi gọi API
    }
);

export default instance;
