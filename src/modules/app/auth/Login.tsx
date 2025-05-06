// src/pages/LoginPage.tsx
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../../services/authService';
import Logo from '../../../components/icons/Logo';
import { DEFINE_USER_ROUTERS } from '../../../constants/route-mapper';
import { setUserData, setToken } from '../../../utils/localStorage';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //================== từ form lấy ra email và password truyền vào values
  //================ hoặc có thể hiểu là trong values có email và password
const onFinish = async (values: { email: string, password: string }) => 
  {
    try {
      setLoading(true);
      // đi vào file services và đi đến function phía sau services này ( kèm truyền values )
      const response = await authService.login(values);

      if (response.data) {
        setUserData(response.data.user);

        setToken(response.data.accessToken);

        message.success('Đăng nhập thành công!');
        navigate(DEFINE_USER_ROUTERS.home);
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col justify-center items-center mb-4">
        <Logo />
        <span className="text-2xl font-bold text-gray-900">WinMobile</span>
      </div>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
        // truyền giá trị này lên form ( values ở trên)
          name="email"
        //  
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ' },
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-gray-300" />}
            placeholder="Email"
            size="middle"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-300" />}
            placeholder="Mật khẩu"
            size="middle"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className="rounded-lg h-12 font-semibold hover:scale-[1.01] transition-transform"
            loading={loading}
          >
            Đăng nhập
          </Button>
        </Form.Item>

        <div className="text-center">
          <span className="text-gray-600">Chưa có tài khoản? </span>
          <Link
            to="/register"
            className="text-primary hover:text-primary-dark font-semibold"
          >
            Đăng ký ngay
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
