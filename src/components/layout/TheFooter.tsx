import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Button, Divider, Input, Typography } from 'antd';
import Logo from '../icons/Logo';
import { NavLink } from 'react-router-dom';

const { Title, Text } = Typography;

export default function TheFooter() {
  return (
    <footer className="bg-gray-900 text-white mt-20 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - Brand Info */}
          <div className="space-y-4">
            <NavLink
              to="/"
              className="flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Logo />
              <span className="text-xl font-bold text-white">
                WinMobile
              </span>
            </NavLink>
            <Text className="text-gray-400">
              Cung cấp các mẫu điện thoại chính hãng, công nghệ mới nhất với giá
              cả phải chăng.
            </Text>
            <div className="flex space-x-4 mt-4">
              <Button
                type="link"
                icon={
                  <FacebookOutlined className="text-2xl text-white hover:text-blue-500 transition-colors" />
                }
                href="#"
              />
              <Button
                type="link"
                icon={
                  <InstagramOutlined className="text-2xl text-white hover:text-pink-500 transition-colors" />
                }
                href="#"
              />
              <Button
                type="link"
                icon={
                  <TwitterOutlined className="text-2xl text-white hover:text-blue-400 transition-colors" />
                }
                href="#"
              />
              <Button
                type="link"
                icon={
                  <YoutubeOutlined className="text-2xl text-white hover:text-red-600 transition-colors" />
                }
                href="#"
              />
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <Title level={4} className="mb-4">
              <span className="text-white">Liên kết nhanh</span>
            </Title>
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Sản phẩm mới
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Bộ sưu tập điện thoại
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Khuyến mãi
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Hướng dẫn sử dụng điện thoại
              </a>
            </div>
          </div>

          {/* Column 3 - Support */}
          <div>
            <Title level={4} className="text-white mb-4">
              <span className="text-white">Hỗ trợ</span>
            </Title>
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Trung tâm trợ giúp
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Theo dõi đơn hàng
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Chính sách đổi trả
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Liên hệ với chúng tôi
              </a>
            </div>
          </div>


        </div>

        <Divider className="bg-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-center space-y-2 md:space-y-0">
          <Text className="text-gray-400">
            © {new Date().getFullYear()} WinMobile. Bảo lưu mọi quyền
          </Text>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Điều khoản sử dụng
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Chính sách bảo mật
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
