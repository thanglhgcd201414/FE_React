import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Badge, Dropdown, Space, Avatar } from 'antd';
import type { MenuProps } from 'antd';
import Logo from '../icons/Logo';
import { IRootState } from '../../lib/store';
import cookiesStore from '../../plugins/cookiesStore';
import { DEFINE_USER_ROUTERS } from '../../constants/route-mapper';
import { cartService } from '../../services';
import { setUser } from '../../lib/reducer/userSlice';
import {
  addCartInfo,
  clearCart,
  selectCartItemCount,
} from '../../lib/reducer/cartSlice';
import { useAppSelector } from '../../hooks/app.hook';
import buildImageUrl from '../../utils/build-image-url';

export default function TheHeader() {
  const { userData } = useSelector((state: IRootState) => state.user);
  const itemCount = useAppSelector(selectCartItemCount);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();

  const handleGetCart = async () => {
    try {
      if (!userData?._id) return;
      const rs = await cartService.find();
      dispatch(addCartInfo(rs.data));
    } catch (error) {
      // dispatch(setUser(undefined));
    }
  };

  useEffect(() => {
    if (userData?._id) handleGetCart();
  }, []);

  const handleLogout = () => {
    cookiesStore.remove('admin');
    cookiesStore.remove('access_token');
    dispatch(setUser(undefined));
    dispatch(clearCart());
  };

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: <NavLink to={DEFINE_USER_ROUTERS.profile}>Hồ sơ</NavLink>,
    },
    {
      key: '3',
      label: (
        <NavLink to={DEFINE_USER_ROUTERS.orderHistory}>
          Danh sách đơn đã đặt
        </NavLink>
      ),
    },
    {
      key: '2',
      label: (
        <NavLink onClick={handleLogout} to={DEFINE_USER_ROUTERS.login}>
          Đăng xuất
        </NavLink>
      ),
    },
  ];

  const navLinks = [
    { to: DEFINE_USER_ROUTERS.home, label: 'Trang chủ' },
    { to: DEFINE_USER_ROUTERS.listProduct, label: 'Sản phẩm' },
    { to: DEFINE_USER_ROUTERS.aboutUs, label: 'Về chúng tôi' },
    { to: DEFINE_USER_ROUTERS.contactUs, label: 'Liên hệ' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm transition-all duration-300 w-full">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <NavLink
            to="/"
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Logo />
            <span className="text-xl font-bold text-gray-900">
              WinMobile
            </span>
          </NavLink>

          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary relative pb-2 ${
                    isActive
                      ? 'text-primary !font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary'
                      : 'text-gray-700'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <NavLink
              to={DEFINE_USER_ROUTERS.myCart}
              className="flex items-center gap-1 text-gray-700 transition-colors hover:text-primary"
            >
              <Badge count={itemCount} className="flex items-center">
                <ShoppingCartOutlined className="text-2xl" />
              </Badge>
            </NavLink>

            {userData ? (
              <Dropdown menu={{ items: menuItems }} placement="bottomRight">
                <Space className="cursor-pointer hover:text-primary">
                  <Avatar
                    src={buildImageUrl(userData.avatar) ?? '/logo.png'}
                    icon={<UserOutlined />}
                    className="border-primary"
                  />
                  <span className="hidden sm:inline text-black">
                    {userData.email ?? userData.name}
                  </span>
                </Space>
              </Dropdown>
            ) : (
              <div className="hidden md:flex md:items-center md:gap-4">
                <NavLink
                  to="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                >
                  Đăng nhập
                </NavLink>
                <NavLink
                  to="/register"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                  Đăng ký
                </NavLink>
              </div>
            )}

            <button
              className="md:hidden p-2 text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuOutlined className="text-xl" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2 pt-4 border-t">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `block px-4 py-2 transition-colors ${
                      isActive
                        ? 'text-primary font-medium border-l-4 border-primary bg-primary/10'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              {!userData && (
                <>
                  <NavLink
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Đăng nhập
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Đăng ký
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
