import axios from 'axios'
import { getItem, KEY_ACCESS_TOKEN, removeItem, setItem } from './localStorage';



export const axiosClient = axios.create({
    baseURL: 'http://localhost:5003',

    withCredentials: true,
});

axiosClient.interceptors.request.use(
    (request) => {
        const accessToken = getItem(KEY_ACCESS_TOKEN);
        request.headers["Authorization"] = `Bearer ${accessToken}`;
        return request
    }
);




axiosClient.interceptors.request.use(
    (request) => {
        const accessToken = getItem(KEY_ACCESS_TOKEN);
        request.headers["Authorization"] = `Bearer ${accessToken}`;

        return request;

    });


axiosClient.interceptors.response.use(
    async (response) => {
        const data = response.data;
        if (data.status === 'ok') {
            return data;
        }

        const originalRequest = response.config;
        const statusCode = data.statusCode;
        const error = data.error;

        if (// when refresh token expire s,send user to login page
            statusCode === 401 &&
            originalRequest.url === 'http://localhost:5003/auth/refresh'

        ) {
            removeItem(KEY_ACCESS_TOKEN);
            window.location.replace('/login', '_self');
            return Promise.reject(error);
        }

        if (statusCode === 401) {
            const response = await axiosClient.get('/auth/refresh');
            console.log(' response from backend ', response);
            if (response.status === 'ok') {
                setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
                originalRequest.headers['Authorization'] = `Bearer ${response.result.accessToken}`;

                return axios(originalRequest);

            }
        }
        return Promise.reject(error);
    }

);