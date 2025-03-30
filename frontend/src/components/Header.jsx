import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function Header() {
    const { currentUser, logout } = useAuth();

    // Extract user information (in a real app, you would store and retrieve this)

    const userName = currentUser?.name || 'User';
    const userEmail = currentUser?.email || 'user@example.com';

    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/dashboard" className="text-xl font-bold text-indigo-600">
                                Product Management
                            </Link>
                        </div>
                        <nav className="ml-6 flex items-center space-x-4">
                            <Link
                                to="/dashboard"
                                className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-indigo-600"
                            >
                                Dashboard
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center">
                        <div className="relative group">
                            <button className="flex items-center max-w-xs bg-gray-100 p-2 rounded-full focus:outline-none">
                                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                                    {userName.charAt(0).toUpperCase()}
                                </div>
                                <span className="ml-2 text-sm font-medium text-gray-700">{userName}</span>
                                <svg className="ml-1 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <div className="absolute right-0 mt-2 w-48 py-1 bg-white rounded-md shadow-lg hidden group-hover:block">
                                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                    <p className="font-medium">{userName}</p>
                                    <p className="text-xs text-gray-500">{userEmail}</p>
                                </div>
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Your Profile
                                </Link>
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;