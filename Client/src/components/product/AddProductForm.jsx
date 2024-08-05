import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddMultipleProductsForm() {
    const [products, setProducts] = useState([{ name: '', description: '', imageUrl: '' }]);

    const handleInputChange = (index, event) => {
        const values = [...products];
        values[index][event.target.name] = event.target.value;
        setProducts(values);
    };

    const handleAddFields = () => {
        setProducts([...products, { name: '', description: '', imageUrl: '' }]);
    };

    const handleRemoveFields = (index) => {
        const values = [...products];
        values.splice(index, 1);
        setProducts(values);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/product/add-multiple-products', products);
            toast.success('Products added successfully!');
            setProducts([{ name: '', description: '', imageUrl: '' }]);
        } catch (error) {
            toast.error('Error adding products!');
            console.error(error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Multiple Products</h2>
            <form onSubmit={handleSubmit}>
                {products.map((product, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 items-end mb-6">
                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={product.name}
                            onChange={event => handleInputChange(index, event)}
                            className="px-3 py-2 rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Product Description"
                            value={product.description}
                            onChange={event => handleInputChange(index, event)}
                            className="px-3 py-2 rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            placeholder="Image URL"
                            value={product.imageUrl}
                            onChange={event => handleInputChange(index, event)}
                            className="px-3 py-2 rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div className="flex col-span-3 justify-between mt-4">
                            <button type="button" onClick={() => handleAddFields()} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm">Add More</button>
                            {index > 0 && (
                                <button type="button" onClick={() => handleRemoveFields(index)} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm">Remove</button>
                            )}
                        </div>
                    </div>
                ))}
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Add Products</button>
            </form>
        </div>
    );
}

export default AddMultipleProductsForm;
    