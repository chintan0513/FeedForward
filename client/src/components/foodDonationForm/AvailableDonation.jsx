import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the app root element for accessibility

function AvailableOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  useEffect(() => {
    // Fetch available orders when the component mounts
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/donate/available-donations');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedOrder(null);
    setEmail('');
    setMobileNumber('');
  };

  const placeOrder = async () => {
    try {
      if (!email || !mobileNumber) {
        alert('Please enter both email and mobile number.');
        return;
      }
      const response = await axios.post(`http://localhost:8000/api/donate/orders/${selectedOrder._id}/place`, { email, mobileNumber });
      alert('Order placed successfully!');
      // Optionally, update the orders state to remove the placed order or refresh the orders list
      setOrders(orders.filter(order => order._id !== selectedOrder._id));
      closeModal();
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    }
  };

  return (
    <div className='w-full px-12 py-4'>
      <h1 style={{ textAlign: 'center', color: '#333', margin: '20px 0' }}>Available Orders</h1>
      <div className='flex flex-col gap-0'>
        <div className='flex gap-4 items-center justify-between w-full pt-1 pb-3 border-b border-b-gray-300 px-6'>
          <p className='w-[18%]'><strong>Doner Name</strong></p>
          <p className='w-[18%]'><strong>Quantity</strong></p>
          <p className='w-[26%]'><strong>Items</strong></p>
          <p className='w-[26%]'><strong>Created At</strong></p>
          <p className='w-[12%] flex items-center justify-center'><strong>Action</strong></p>
        </div>
        {orders.filter(o => o.donations.length !== 0).map((order) => (
          <div key={order._id} className='flex gap-4 items-center justify-between w-full pt-1 pb-3 border-b border-b-gray-300 px-6'>
            <p className='w-[18%]'>{order.createdBy?.name}</p>
            <p className='w-[18%]'>{order.donations?.length}</p>
            <p className='w-[26%]'>{order.donations[0]?.name} and more</p>
            <p className='w-[26%]'>{new Date(order.createdAt).toLocaleDateString()}</p>
            <button onClick={() => openModal(order)} className='w-[12%]' style={{ background: '#17a2b8', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer', transition: 'background 0.3s', marginTop: '10px' }}>View Details</button>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Order Details"
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '600px',
              width: '100%',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              backgroundColor: '#f9f9f9',
              maxHeight: '80vh', // Limiting the height
              overflowY: 'auto' // Adding scroll
            }
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', color: '#333' }}>Order Details</h2>
          {selectedOrder.donations.map((donation, index) => (
            <div key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                {donation.image && (
                  <img src={`http://localhost:8000/${donation.image}`} alt="Order Image" style={{ width: '100px', height: '100px', marginRight: '10px', borderRadius: '10px', objectFit: 'cover' }} />
                )}
                <div>
                  <p><strong>Name:</strong> {donation.name}</p>
                  <p><strong>Quantity:</strong> {donation.quantity}</p>
                  <p><strong>Description:</strong> {donation.description}</p>
                  <p><strong>Expiry Date:</strong> {new Date(donation.expiryDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
            type="tel"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={placeOrder} style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', transition: 'background 0.3s', width: '48%' }}>Place Order</button>
            <button onClick={closeModal} style={{ padding: '10px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', transition: 'background 0.3s', width: '48%' }}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AvailableOrders;
