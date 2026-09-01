import axios from 'axios';



// Localhost (For Local Testing):
// const baseURL = 'http://localhost:5000/api';

// Production (For Render Deployment):
const baseURL = 'https://aicoldemail.onrender.com/api';


const api = axios.create({
    baseURL: baseURL.endsWith('/api') ? baseURL : `${baseURL.replace(/\/+$/, '')}/api`,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;