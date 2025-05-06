import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Spin } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../../services/authService';
import Logo from '../../../components/icons/Logo';
import { DEFINE_USER_ROUTERS } from '../../../constants/route-mapper';

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: {
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
  }) => {
    try {
      setLoading(true);
      // đi vào file services và đi đến function phía sau services này
      await authService.register({
        email: values.email,
        password: values.password,
        name: values.name,
      });
      message.success('Đăng ký thành công! Vui lòng đăng nhập');
      navigate(DEFINE_USER_ROUTERS.login);
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Đăng ký thất bại');
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

      <Form name="register" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-300" />}
            placeholder="Họ và tên"
            size="middle"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="email"
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
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            { min: 6, message: 'Mật khẩu ít nhất 6 ký tự' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-300" />}
            placeholder="Mật khẩu"
            size="middle"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không khớp!'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-300" />}
            placeholder="Xác nhận mật khẩu"
            size="middle"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="middle"
            className="rounded-lg h-12 font-semibold hover:scale-[1.01] transition-transform"
            loading={loading}
          >
            Đăng ký
          </Button>
        </Form.Item>

        <div className="text-center">
          <span className="text-gray-600">Đã có tài khoản? </span>
          <Link
            to="/login"
            className="text-primary hover:text-primary-dark font-semibold"
          >
            Đăng nhập ngay
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
