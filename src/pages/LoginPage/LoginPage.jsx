import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import loginAnimation from '../../assets/animate/login-animation.json';
import { useDispatch } from 'react-redux';
import { userInfoLocal } from '../../services/local.service';
import { accounts } from '../../common/storage';
import { Notification } from '../../utils/notification';
import { setUserInfo } from '../../redux/userSlice';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const findAcount = accounts.find(
      (item) =>
        item.account === values.account && item.password === values.password
    );
    if (findAcount) {
      userInfoLocal.set(findAcount);
      dispatch(setUserInfo(findAcount));
      Notification('success', `Welcome ${findAcount.userName}`);

      setTimeout(() => {
        navigate('/');
      }, 200);
    } else {
      Notification('error', 'An account failed to log on!');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-white-500">
      <div className="flex justify-center items-center text-center lg:w-1/2 lg:h-3/4 md:w-4/5 md:h-1/2 w-11/12 h-1/2 rounded-md shadow-2xl overflow-hidden bg-white">
        <div className="w-1/2 h-full flex justify-center items-center">
          <div className="w-3/4">
            <h1 className="lg:text-2xl md:text-2xl text-xl font-bold mb-8">
              Member Login
            </h1>
            <Form
              name="normal_login"
              className="login-form"
              onFinish={onFinish}
            >
              <Form.Item
                name="account"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  current-password="true"
                />
              </Form.Item>
              <Form.Item>
                <button className="login-form-button bg-emerald-600 text-white w-full p-2 rounded-md hover:bg-emerald-500">
                  LOG IN
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="w-1/2 h-full flex justify-center items-center bg-emerald-600">
          <Lottie animationData={loginAnimation} loop={true} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
