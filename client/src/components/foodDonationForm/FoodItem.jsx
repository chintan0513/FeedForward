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
