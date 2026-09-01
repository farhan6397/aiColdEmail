import axios from 'axios';

let rawBaseURL = import.meta.env.VITE_API_BASE_URL || 'https://aicoldemail.onrender.com/api';

if (rawBaseURL && !rawBaseURL.endsWith('/api')) {
    rawBaseURL = rawBaseURL.replace(/\/+$/, '') + '/api';
}

const api = axios.create({
    baseURL: rawBaseURL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;