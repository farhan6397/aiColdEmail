import axios from 'axios';

const getBaseURL = () => {
    let url = import.meta.env.VITE_API_BASE_URL;
    if (!url) {
        return 'https://aicoldemail.onrender.com/api';
    }
    if (!url.endsWith('/api')) {
        url = url.replace(/\/+$/, '') + '/api';
    }
    return url;
};

const api = axios.create({
    baseURL: getBaseURL(),
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;