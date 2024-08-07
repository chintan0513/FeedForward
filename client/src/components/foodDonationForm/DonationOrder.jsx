import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function UserDonations() {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    const userItem = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await axios.get(`http://localhost:8000/api/donate/donations/byUser/${userItem.id}`);
    setDonations(response.data);
  };

  const openModal = (donation) => {
    setSelectedDonation(donation);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDonation(null);
  };

  const deleteDonation = async (donationId) => {
    await axios.delete(`http://localhost:8000/api/donate/orders/${donationId}`);
    fetchDonations(); // Refresh the list after deleting
    closeModal();
  };

  return (
    <div className='w-full max-w-4xl mx-auto px-4 py-4'>
      <h1 style={{ textAlign: 'center', color: '#333', margin: '20px 0', fontSize: '30px' }}>My Donations</h1>
      <div className='flex flex-col gap-4'>
        {donations.map((donation) => (
          <div key={donation._id} className='flex justify-between items-center p-4 bg-white shadow rounded-lg'>
            <div className='flex-1'>
              <h3 className='text-lg font-semibold'>{donation.donations.map(d => d.name).join(", ")}</h3>
              <p className='text-gray-500'>Quantity: {donation.donations.reduce((acc, d) => acc + d.quantity, 0)}</p>
              <p className='text-gray-400 text-sm'>Donated on: {new Date(donation.createdAt).toLocaleDateString()}</p>
            </div>
            <button
              onClick={() => openModal(donation)}
              className='ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedDonation && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '600px',
              width: '90%',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              backgroundColor: '#f9f9f9',
              maxHeight: '80vh',
              overflowY: 'auto'
            }
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', color: '#333' }}>Donation Details</h2>
          {selectedDonation.donations.map((donation, index) => (
            <div key={index} className='mb-4'>
              <div className='flex items-center space-x-4'>
                {donation.image && (
                  <img src={`http://localhost:8000/${donation.image}`} alt="Donation" style={{ width: '100px', height: '100px', borderRadius: '10px' }} />
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
          <button
            onClick={() => deleteDonation(selectedDonation._id)}
            style={{ width: '48%', padding: '10px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', marginRight: '4%' }}
          >
            Delete
          </button>
          <button
            onClick={closeModal}
            style={{ width: '48%', padding: '10px', background: '#6c757d', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
}

export default UserDonations;
