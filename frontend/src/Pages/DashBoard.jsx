import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import Header from '../components/Header.jsx';
import AddProduct from '../components/AddProduct';

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { currentUser } = useAuth();
    const [showAddProductForm, setShowAddProductForm] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            const response = await axios.get('http://localhost:5000/product/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const productsData = response.data;

            if (Array.isArray(productsData)) {
                setProducts(productsData);
            }
            else if (productsData && Array.isArray(productsData.products)) {
                setProducts(productsData.products);
            }
            else {
                console.error('Unexpected API response format:', productsData);
                setProducts([]);
                setError('Received invalid data format from server.');
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            setProducts([]);
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProduct = () => {
        setShowAddProductForm(true);
    };

    const handleCloseForm = () => {
        setShowAddProductForm(false);
        fetchProducts();
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const token = localStorage.getItem('token');

                await axios.delete(`http://localhost:5000/product/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                fetchProducts();
            } catch (err) {
                console.error('Error deleting product:', err);
                setError('Failed to delete product. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {showAddProductForm ? (
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-gray-900">Add New Product</h2>
                                <button
                                    onClick={handleCloseForm}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Back to Products
                                </button>
                            </div>
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <AddProduct onSuccess={handleCloseForm} />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="text-2xl font-semibold text-gray-900">My Products</h1>
                                <button
                                    onClick={handleAddProduct}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Add New Product
                                </button>
                            </div>

                            {error && (
                                <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                                    {error}
                                </div>
                            )}

                            {loading ? (
                                <div className="flex justify-center my-8">
                                    <div className="w-12 h-12 border-t-4 border-b-4 border-indigo-500 rounded-full animate-spin"></div>
                                </div>
                            ) : products.length === 0 ? (
                                <div className="bg-white p-8 rounded-lg shadow text-center">
                                    <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                                    <p className="mt-2 text-gray-500">
                                        Get started by adding your first product.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {products.map((product) => (
                                        <div
                                            key={product._id || product.id}
                                            className="bg-white overflow-hidden shadow rounded-lg flex flex-col"
                                        >
                                            {product.image && (
                                                <div className="w-full h-48 overflow-hidden">
                                                    <img
                                                        src={product.image.startsWith('http') ? product.image : `http://localhost:5000/${product.image}`}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            {!product.image && (
                                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                                    <span className="text-gray-400">No image available</span>
                                                </div>
                                            )}
                                            <div className="p-5 flex-grow">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-medium text-gray-900 truncate">
                                                        {product.name}
                                                    </h3>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        ${product.price}
                                                    </span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                                                    {product.description}
                                                </p>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <span className="text-sm text-gray-500">
                                                        Quantity: {product.quantity}
                                                    </span>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => window.location.href = `/edit-product/${product._id || product.id}`}
                                                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteProduct(product._id || product.id)}
                                                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;