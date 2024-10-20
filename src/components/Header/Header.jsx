import React from 'react';
import { Row, Col, Layout, Space } from 'antd';
import { LogoutOutlined, MailOutlined } from '@ant-design/icons';
import { ReactComponent as Img } from '../../assets/svgs/user.svg';
import Dropdown from 'antd/es/dropdown/dropdown';
import { userInfoLocal } from '../../services/local.service';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/userSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      label: <a onClick={handleLogout}>Logout</a>,
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Layout.Header className="bg-emerald-600 text-white w-full h-auto fixed top-0">
      <Row align="middle">
        <Col flex={2} className="text-start">
          Logo Project
        </Col>
        <Col>
          55 <MailOutlined />
        </Col>
        <Col className="text-right ml-6">Welcome John Cena</Col>
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
  );
}

export default Header;
