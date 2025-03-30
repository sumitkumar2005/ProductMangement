import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');

        if (token && userData) {
            try {
                setCurrentUser({ isLoggedIn: true, ...JSON.parse(userData) });
            } catch (error) {
                console.error('Error parsing user data from localStorage', error);
                setCurrentUser({ isLoggedIn: true });
            }
        }
    }, []);

    const login = async (formData) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/users/login', formData);
            localStorage.setItem('token', response.data.token);

            // Store user data from the response
            console.log(response.data);
            const userData = {
                email: response.data.email || formData.email,
                name: response.data.name || '',
                userId: response.data.userId || '',

            };

            localStorage.setItem('userData', JSON.stringify(userData));
            setCurrentUser({ isLoggedIn: true, ...userData });

            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.message || 'Login failed. Please try again.'
            };
        } finally {
            setLoading(false);
        }
    };

    const register = async (formData) => {
        try {
            setLoading(true);
            const { confirmPassword, ...registrationData } = formData;
            const response = await axios.post('http://localhost:5000/users/register', registrationData);
            return { success: true };
        } catch (err) {
            console.error(err);
            return {
                success: false,
                error: err.response?.data?.message || 'Registration failed. Please try again.'
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setCurrentUser(null);
        window.location.href = '/';
    };

    const isAuthenticated = () => {
        return !!currentUser;
    };

    const value = {
        currentUser,
        login,
        register,
        logout,
        isAuthenticated,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;