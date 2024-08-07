import React, { useState } from 'react';
import axios from 'axios';

function FoodDonationForm() {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    name: '',
    quantity: '',
    description: '',
    expiryDate: '',
    image: null,
    imagePreview: null,
    editMode: false,
    editIndex: -1
  });

  const handleProductChange = (e) => {
    const { name, value, files } = e.target;
    setProductData({
      ...productData,
      [name]: files ? files[0] : value,
      imagePreview: files ? URL.createObjectURL(files[0]) : productData.imagePreview
    });
  };

  const addOrUpdateProduct = () => {
    if (productData.editMode) {
      const updatedProducts = products.map((item, index) =>
        index === productData.editIndex ? { ...productData, editMode: false, editIndex: -1, imagePreview: null } : item
      );
      setProducts(updatedProducts);
    } else {
      setProducts([...products, { ...productData, imagePreview: productData.image ? URL.createObjectURL(productData.image) : null }]);
    }
    resetProductForm();
  };

  const resetProductForm = () => {
    setProductData({
      name: '',
      quantity: '',
      description: '',
      expiryDate: '',
      image: null,
      imagePreview: null,
      editMode: false,
      editIndex: -1
    });
  };

  const editProduct = (index) => {
    const product = products[index];
    setProductData({
      ...product,
      editMode: true,
      editIndex: index
    });
  };

  const deleteProduct = (index) => {
    const filteredProducts = products.filter((_, i) => i !== index);
    setProducts(filteredProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    products.forEach((product, index) => {
      formData.append(`name${index}`, product.name);
      formData.append(`quantity${index}`, product.quantity);
      formData.append(`description${index}`, product.description);
      formData.append(`expiryDate${index}`, product.expiryDate);
      if (product.image) {
        formData.append(`image`, product.image, product.image.name);
      }
    });

    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    if (user.email) {
      formData.append('email', user.email)
    }

    try {
      const response = await axios.post('http://localhost:8000/api/donate/addOrder', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      if(response.data.message) {
        alert(response.data.message)
      }else
      alert('Donation added successfully!');
      setProducts([]);
    } catch (error) {
      console.error('Error adding donation:', error);
      alert('Failed to add donation.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto', backgroundColor: '#f9f9f9', borderRadius: '12px', boxShadow: '0 6px 20px rgba(0,0,0,0.10)', border: '1px solid #e3e3e3' }}>
      <h1 style={{ textAlign: 'center', color: '#333', margin: '20px 0' }}>Add Food Donation</h1>
      <div>
        {products.map((product, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', transition: 'transform 0.3s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img src={product.imagePreview} alt="Preview" style={{ width: '180px', height: '180px', marginBottom: '10px', borderRadius: '50%' }} />
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Expiry Date:</strong> {product.expiryDate}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={() => editProduct(index)} style={{ background: '#ffc107', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer', transition: 'background 0.3s' }}>Edit</button>
              <button onClick={() => deleteProduct(index)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer', transition: 'background 0.3s' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={productData.name}
          onChange={handleProductChange}
          
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={productData.quantity}
          onChange={handleProductChange}
          
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={productData.description}
          onChange={handleProductChange}
          
          style={{ width: '100%', padding: '8px', height: '100px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="date"
          name="expiryDate"
          value={productData.expiryDate}
          onChange={handleProductChange}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="file"
          name="image"
          onChange={handleProductChange}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          accept="image/*"
        />
        <button onClick={addOrUpdateProduct} type="button" style={{ padding: '10px', background: '#17a2b8', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', transition: 'background 0.3s' }}>
          {productData.editMode ? 'Update Product' : 'Add Product'}
        </button>
        <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', transition: 'background 0.3s' }}>
          Submit All Donations
        </button>
      </form>
    </div>
  );
}

export default FoodDonationForm;
