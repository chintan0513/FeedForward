
// 2

// import React, { useState } from 'react';
// import FoodItem from './FoodItem';

// // Mock data
// const foodItems = [
//   {
//     "id": 1,
//     "name": "Canned Beans",
//     "description": "Rich in protein and fibers.",
//     "image": "https://via.placeholder.com/150"
//   },
//   {
//     "id": 2,
//     "name": "Bread Loaf",
//     "description": "Freshly baked white bread.",
//     "image": "https://via.placeholder.com/150"
//   },
//   {
//     "id": 3,
//     "name": "Fresh Apples",
//     "description": "Organic and juicy apples.",
//     "image": "https://via.placeholder.com/150"
//   },
//   {
//     "id": 4,
//     "name": "Fresh Apples",
//     "description": "Organic and juicy apples.",
//     "image": "https://via.placeholder.com/150"
//   },
//   {
//     "id": 5,
//     "name": "Fresh Apples",
//     "description": "Organic and juicy apples.",
//     "image": "https://via.placeholder.com/150"
//   },
//   {
//     "id": 6,
//     "name": "Fresh Apples",
//     "description": "Organic and juicy apples.",
//     "image": "https://via.placeholder.com/150"
//   },
//   {
//     "id": 7,
//     "name": "Fresh Apples",
//     "description": "Organic and juicy apples.",
//     "image": "https://via.placeholder.com/150"
//   },
//   {
//     "id": 8,
//     "name": "Fresh Apples",
//     "description": "Organic and juicy apples.",
//     "image": "https://via.placeholder.com/150"
//   }
// ];



import React, { useState } from 'react';
import FoodItem from './FoodItem';

// Example food items data
const foodItems = [
  { id: 1, name: "Canned Beans", description: "Rich in protein and fibers.", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Bread Loaf", description: "Freshly baked white bread.", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Fresh Apples", description: "Organic and juicy apples.", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Fresh Apples", description: "Organic and juicy apples.", image: "https://via.placeholder.com/150" },
  { id: 5, name: "Fresh Apples", description: "Organic and juicy apples.", image: "https://via.placeholder.com/150" },
  { id: 6, name: "Fresh Apples", description: "Organic and juicy apples.", image: "https://via.placeholder.com/150" }
];

function FoodDonationList() {
  const [donations, setDonations] = useState([]);

  const handleDonate = (item) => {
    setDonations(prev => [...prev, item]);
    // alert(`Thank you for donating ${item.name}!`);
  };

  return (
    <div className="p-4 flex flex-wrap justify-center">
      {foodItems.map(item => (
        <FoodItem key={item.id} item={item} onDonate={handleDonate} />
      ))}
    </div>
  );
}

export default FoodDonationList;
