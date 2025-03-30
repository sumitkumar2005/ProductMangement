import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        imageUrl: '',
        description: '',
        rating: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            // Convert price and rating to numbers
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                rating: parseFloat(formData.rating)
            };

            const token = localStorage.getItem('token');

            const response = await axios.post('http://localhost:5000/product/create', productData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            setMessage(response.data.message || 'Product created successfully!');
            setFormData({
                name: '',
                category: '',
                price: '',
                imageUrl: '',
                description: '',
                rating: ''
            });

            // Call the onSuccess callback after 1.5 seconds to show the success message
            setTimeout(() => {
                if (onSuccess) onSuccess();
            }, 1500);

        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create product. Please try again.');
            console.error('Error creating product:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{message}</div>}
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="name">
                        Product Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="category">
                        Category *
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="price">
                        Price *
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="imageUrl">
                        Image URL *
                    </label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows="4"
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="rating">
                        Rating (0-5)
                    </label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        min="0"
                        max="5"
                        step="0.1"
                    />
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Add Product'}
                    </button>

                    <button
                        type="button"
                        onClick={onSuccess}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;