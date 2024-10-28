import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ClearOutlined,
  DeleteOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { Drawer, InputNumber, List, Popconfirm, Button, Avatar } from 'antd';
import {
  onRemove,
  onChangeQuantity,
  onClear,
} from '../../redux/addToCartSlice';
import { Notification } from '../../utils/notification';

function Cart({ open, onClose }) {
  const { cart, totalPrice } = useSelector((state) => state.addToCartSlice);
  const { userInfo } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();

  const onChange = (cartItem) => {
    dispatch(onChangeQuantity(cartItem));
  };

  const handleDelete = (product) => {
    dispatch(onRemove(product));
    Notification(
      'success',
      `Successfully added ${product.name} to Shopping list`
    );
  };

  const handleClear = (isCheckout) => {
    dispatch(onClear());
    !isCheckout &&
      Notification('success', `Shopping list deleted successfully`);
  };

  const handleCheckout = () => {
    if (!cart.length) {
      Notification('error', `The shopping cart is empty`);
      return;
    }
    onClose();
    handleClear(true);
    Notification(
      'success',
      `Thanks ${
        userInfo.userName
      } have successfully paid: $${totalPrice.toFixed(2)}`
    );
  };

  return (
    <Drawer
      title="Shopping List"
      width={'calc(100vw - 300px)'}
      onClose={onClose}
      open={open}
    >
      <List
        size="large"
        dataSource={cart}
        footer={
          <div className="flex justify-between items-center">
            <div>
              <b className="text-red-600 text-xl">
                Total: ${totalPrice.toFixed(2)}
              </b>
            </div>
            <div className="flex justify-items-end items-center space-x-4">
              <Popconfirm
                title="Checkout Cart"
                description="Are you sure checkout Cart?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleCheckout}
              >
                <Button type="primary" icon={<CreditCardOutlined />}>
                  Checkout
                </Button>
              </Popconfirm>
              <Popconfirm
                title="Clear Shopping list"
                description="Are you sure to clear Shopping list?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleClear}
              >
                <Button type="primary" danger icon={<ClearOutlined />}>
                  Clear
                </Button>
              </Popconfirm>
            </div>
          </div>
        }
        renderItem={(cartItem, index) => (
          <List.Item
            key={index}
            actions={[
              <Popconfirm
                title={`Delete the ${cartItem.product.name}`}
                description={`Are you sure to delete this ${cartItem.product.name}?`}
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  handleDelete(cartItem.product);
                }}
              >
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              key={cartItem.product.id}
              avatar={<Avatar src={cartItem.product.image} />}
              title={
                <div>
                  <a className="block text-sm" href="#">
                    {cartItem.product.name}
                  </a>
                  <span className="text-xs block">
                    Sku: {cartItem.product.sku}
                  </span>
                </div>
              }
            />
            <b className="mr-16">${cartItem.product.price}</b>
            <InputNumber
              min={1}
              max={100000}
              defaultValue={cartItem.quantity}
              onChange={(quantity) => {
                onChange({ ...cartItem, quantity });
              }}
            />
          </List.Item>
        )}
      />
    </Drawer>
  );
}

export default Cart;
