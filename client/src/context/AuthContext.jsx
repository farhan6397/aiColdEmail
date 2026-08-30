import React, { useState, useEffect, useContext } from "react";
import api from "../utils/api.js";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        const token = localStorage.getItem('token');
        if (userInfo && token) {
            try {
                setUser(JSON.parse(userInfo));
            } catch (error) {
                console.error("Failed to parse userInfo:", error);
                localStorage.removeItem('token');
                localStorage.removeItem('userInfo');
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    const register = async ({ username, email, password }) => {
        const response = await api.post('/auth/register', { username, email, password });
        return response.data;
    };

    const verifyOtp = async ({ email, otp }) => {
        const response = await api.post('/auth/verify-otp', { email, otp });
        if (response.data?.token && response.data?.user) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userInfo', JSON.stringify(response.data.user));
            setUser(response.data.user);
        }
        return response.data;
    };

    const login = async ({ email, password }) => {
        const response = await api.post('/auth/login', { email, password });
        if (response.data?.token && response.data?.user) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userInfo', JSON.stringify(response.data.user));
            setUser(response.data.user);
        }
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, verifyOtp, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, AuthContext, useAuth };