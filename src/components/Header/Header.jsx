import React, { useState } from 'react';
import { Row, Col, Layout, Space, Button } from 'antd';
import { LogoutOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { ReactComponent as Img } from '../../assets/svgs/user.svg';
import Dropdown from 'antd/es/dropdown/dropdown';
import { userInfoLocal } from '../../services/local.service';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../redux/userSlice';

import logoAnimation from '../../assets/animate/logo.json';
import Lottie from 'lottie-react';
import Cart from '../Cart/Cart';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSlice);
  const { totalQuantity } = useSelector((state) => state.addToCartSlice);
  const [openCart, setOpenCart] = useState(false);

  const onOpenCart = () => {
    setOpenCart(true);
  };

  const onCloseCart = () => {
    setOpenCart(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    userInfoLocal.remove();
    dispatch(setUserInfo({}));
    setTimeout(() => {
      navigate('/login');
    }, 200);
  };

  const items = [
    {
      key: '1',
      label: (
        <a onClick={handleLogout}>{userInfo.userName ? 'Logout' : 'Login'} </a>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <>
      <Layout.Header className="bg-emerald-600 text-white w-full h-auto fixed top-0 z-40">
        <Row align="middle">
          <Col className="text-start w-16 h-16">
            <a className="w-full h-full" href="/">
              <Lottie animationData={logoAnimation} loop={true} />
            </a>
          </Col>
          <Col flex={1} />
          <Col>
            <Button
              type="text"
              className="bg-emerald-600 text-white border-none"
              onClick={onOpenCart}
              icon={<ShoppingCartOutlined />}
            >
              {totalQuantity}
            </Button>
          </Col>
          <Col className="text-right ml-6">
            {userInfo.userName ? `Welcome ${userInfo.userName}` : ''}
          </Col>
          <Col>
            <div className="flex justify-center items-center ml-3">
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <div className="h-10 w-10 bg-slate-400 flex justify-center items-center rounded-full">
                      <Img className="w-4 h-4" />
                    </div>
                  </Space>
                </a>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Layout.Header>

      <Cart onClose={onCloseCart} open={openCart} />
    </>
  );
}

export default Header;
