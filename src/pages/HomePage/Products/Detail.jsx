import React from 'react';
import { Button, Col, Drawer, Image, InputNumber, Row, Space, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

function Detail({ product, open, onClose }) {
  const onChange = (value) => {
    console.log('changed', value);
  };
  return (
    <Drawer title={product.name} width={720} onClose={onClose} open={open}>
      <Row gutter={5}>
        <Col span={12}>
          <Image width="100%" height="100%" src={product.image} />
        </Col>
        <Col span={12}>
          <Space direction="vertical">
            <Title level={2}>{product.name}</Title>

            <Tag className="text-lg text-emerald-600">${product.price}</Tag>

            <Text className="text-lg">Sku: {product.sku}</Text>

            <InputNumber
              min={1}
              max={100000}
              defaultValue={1}
              onChange={onChange}
            />
            <Paragraph>{product.description}</Paragraph>
            <Button type="primary" icon={<ShoppingCartOutlined />}>
              ADD TO CART
            </Button>
          </Space>
        </Col>
      </Row>
    </Drawer>
  );
}

export default Detail;
