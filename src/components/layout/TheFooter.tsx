import { Divider, Typography } from 'antd';
import Logo from '../icons/Logo';
import { NavLink } from 'react-router-dom';

const { Text } = Typography;

export default function TheFooter() {
  return (
    <footer className="bg-gray-900 text-white mt-20 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center">
          {/* Brand Info - Centered */}
          <div className="space-y-4 max-w-lg text-center">
            <NavLink
              to="/"
              className="flex items-center justify-center gap-2 transition-transform hover:scale-105"
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
          </div>
        </div>

        <Divider className="bg-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-center space-y-2 md:space-y-0">
          <Text className="text-gray-400">
            © {new Date().getFullYear()} WinMobile. Quyền truy cập của Lê Hữu Thắng
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
