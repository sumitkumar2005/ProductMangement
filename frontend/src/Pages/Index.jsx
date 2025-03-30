import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function Index() {
    const { isAuthenticated, currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        if (isAuthenticated()) {

            navigate('/dashboard');
        } else {

            navigate('/login');
        }
    }, [isAuthenticated, navigate, currentUser]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-700">Checking authentication...</h2>
                <div className="mt-4">
                    <div className="w-12 h-12 border-t-4 border-b-4 border-indigo-500 rounded-full animate-spin mx-auto"></div>
                </div>
            </div>
        </div>
    );
}

export default Index;