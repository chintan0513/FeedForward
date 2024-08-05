// import React from 'react';

// function FoodItem({ item, onDonate }) {
//   return (
//     <div className="card w-64 bg-base-100 shadow-xl m-4 rounded-lg overflow-hidden">
//       <figure className="h-48 bg-gray-200 flex items-center justify-center">
//         <img src={item.image} alt={item.name} className="max-h-full max-w-full" onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} />
//       </figure>
//       <div className="card-body text-center">
//         <h2 className="card-title">{item.name}</h2>
//         <p>{item.description}</p>
//         <div className="card-actions justify-center mt-4">
//           <button className="btn btn-primary" onClick={() => onDonate(item)}>Donate</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FoodItem;


// 2

// import React from 'react';

// function FoodItem({ item, onDonate }) {
//   return (
//     <div className="card transition-shadow shadow-lg hover:shadow-xl rounded-lg overflow-hidden m-4 bg-white hover:bg-gray-50">
//       <figure className="h-48 bg-gray-200 flex items-center justify-center">
//         <img src={item.image} alt={item.name} className="max-h-full max-w-full p-2" onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} />
//       </figure>
//       <div className="card-body text-center p-4">
//         <h2 className="text-lg font-semibold">{item.name}</h2>
//         <p className="text-gray-600">{item.description}</p>
//         <div className="card-actions justify-center mt-4">
//           <button className="btn btn-primary" onClick={() => onDonate(item)}>Donate</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FoodItem;



// import React from 'react';

// function FoodItem({ item, onDonate }) {
//   return (
//     <div className="flex flex-col items-center bg-white rounded-lg shadow-lg m-2 p-2 hover:shadow-xl transition-shadow w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
//       <img src={item.image} alt={item.name} className="h-32 w-32 object-cover rounded-full" onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} />
//       <div className="text-center p-4">
//         <h2 className="text-lg font-semibold">{item.name}</h2>
//         <p className="text-sm text-gray-600">{item.description}</p>
//         <button className="btn btn-primary mt-2" onClick={() => onDonate(item)}>Donate</button>
//       </div>
//     </div>
//   );
// }

// export default FoodItem;


// import React from 'react';

// function FoodItem({ item, onDonate }) {
//   return (
//     <div className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg m-3 p-2 transition-shadow w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
//       <div className="w-full h-40 bg-gray-200 flex items-center justify-center overflow-hidden rounded-t-lg">
//         <img src={item.image} alt={item.name} className="h-full w-auto" onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} />
//       </div>
//       <div className="text-center p-3">
//         <h2 className="text-md font-semibold">{item.name}</h2>
//         <p className="text-sm text-gray-600">{item.description}</p>
//         <button className="btn btn-primary mt-2" onClick={() => onDonate(item)}>Donate</button>
//       </div>
//     </div>
//   );
// }

// export default FoodItem;


// import React from 'react';
// import { Card, Button, Tooltip } from 'antd';
// import { InfoCircleOutlined } from '@ant-design/icons';

// function FoodItem({ item, onDonate }) {
//   return (
//     <Card
//       hoverable
//       style={{ width: 240, margin: '10px' }}
//       cover={
//         <img
//           alt={item.name}
//           src={item.image}
//           onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
//           style={{ height: 160, objectFit: 'cover' }}
//         />
//       }
//       actions={[
//         <Tooltip title="Click to donate this item">
//           <Button type="primary" onClick={() => onDonate(item)} icon={<InfoCircleOutlined />}>
//             Donate
//           </Button>
//         </Tooltip>
//       ]}
//     >
//       <Card.Meta
//         title={item.name}
//         description={item.description}
//       />
//     </Card>
//   );
// }

// export default FoodItem;


import React, { useState } from 'react';
import { Card, Button, Modal, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

function FoodItem({ item, onDonate }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    onDonate(item);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card
        hoverable
        style={{ width: 240, margin: '10px' }}
        cover={
          <img
            alt={item.name}
            src={item.image}
            onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
            style={{ height: 160, objectFit: 'cover' }}
            onClick={showModal}
          />
        }
        actions={[
          <Tooltip title="Click to donate this item">
            <Button type="primary" onClick={showModal} icon={<InfoCircleOutlined />}>
              More Details
            </Button>
          </Tooltip>
        ]}
      >
        <Card.Meta
          title={item.name}
          description={item.description}
        />
      </Card>

      <Modal
        title={item.name}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Donate
          </Button>,
        ]}
      >
        <p>{item.description}</p>
        <p>Would you like to donate this item to help those in need?</p>
      </Modal>
    </>
  );
}

export default FoodItem;
