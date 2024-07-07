// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// function EditProductForm({ product, onClose, onSave }) {
//   const [name, setName] = useState(product.name);
//   const [description, setDescription] = useState(product.description);
//   const [imageUrl, setImageUrl] = useState(product.imageUrl);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const updatedProduct = { name, description, imageUrl };
//       const response = await axios.put(`http://localhost:8000/api/update/${product._id}`, updatedProduct);
//       onSave(response.data);
//       toast.success('Product updated successfully!');
//       onClose();
//     } catch (error) {
//       toast.error('Error updating product!');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Product</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Product Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Product Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Image URL"
//               value={imageUrl}
//               onChange={(e) => setImageUrl(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div className="flex justify-between">
//             <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md shadow-sm">
//               Cancel
//             </button>
//             <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm">
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditProductForm;


import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditProductForm({ product, onClose, onSave }) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedProduct = { name, description, imageUrl };
      const response = await axios.put(`http://localhost:8000/api/product/update/${product._id}`, updatedProduct);
      onSave(response.data);
      toast.success('Product updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Error updating product!');
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="description">Product Description</label>
            <textarea
              id="description"
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-between mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md shadow-sm">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductForm;
