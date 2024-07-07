import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditProductForm from './EditProductForm'; // Import the EditProductForm component

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null); // State for the product being edited

  useEffect(() => {
    axios.get('http://localhost:8000/api/product/products')
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/product/delete/${id}`);
      setProducts(products.filter(product => product._id !== id));
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error('Error deleting product');
      console.error(error);
    }
  };

  const handleSave = (updatedProduct) => {
    setProducts(products.map(product => product._id === updatedProduct._id ? updatedProduct : product));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="flex-grow max-w-sm px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <Link to='/add-product' className='ml-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow'>
            Add Food Items
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between h-full">
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4 flex-grow">
                  <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                  <p className="text-gray-700">{product.description}</p>
                </div>
                <div className="flex justify-between items-center p-4 py-2">
                  <button
                    className="text-blue-600 hover:text-blue-700"
                    onClick={() => setEditingProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No products found.
            </div>
          )}
        </div>
      </div>
      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default ProductList;
