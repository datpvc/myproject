import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Divider,
  Drawer,
  Image,
  InputNumber,
  Row,
  Space,
  Tag,
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import Comments from '../../../components/Comments/Comments';
import { productServices } from '../../../services/product.service';
import { useDispatch, useSelector } from 'react-redux';
import { onAdd } from '../../../redux/addToCartSlice';
import { CartItem } from '../../../models/CartItem';
import { Notification } from '../../../utils/notification';

const { Title, Paragraph, Text } = Typography;

function Detail({ product, open, onClose }) {
  const [detailProduct, setDetailProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { userInfo } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product.id) {
      setLoading(true);
      setQuantity(1);
      productServices
        .detail(product.id)
        .then((res) => {
          setDetailProduct(res.data);
        })
        .catch((err) => {
          console.log('err: ', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [product.id]);

  const onChange = (value) => {
    setQuantity(value);
  };

  const addToCart = (product) => {
    if (!userInfo.account) {
      Notification('error', 'You need to log in');
      return;
    }
    const cartItem = new CartItem(product, quantity);
    dispatch(onAdd({ ...cartItem }));
    Notification(
      'success',
      `Successfully added ${product.name} to Shopping list`
    );
  };

  return (
    <Drawer
      title={product.name}
      width={720}
      onClose={onClose}
      open={open}
      loading={loading}
    >
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
            <Button
              type="primary"
              onClick={() => {
                addToCart(product);
              }}
              icon={<ShoppingCartOutlined />}
            >
              ADD TO CART
            </Button>
          </Space>
        </Col>
      </Row>
      <Divider>Comments</Divider>
      <Comments product={detailProduct} />
    </Drawer>
  );
}

export default Detail;
