import { Link, useLocation } from 'react-router-dom';
import {
  BlockOutlined,
  LoginOutlined,
  MobileOutlined,
  ShoppingOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import isChildUrl from '../../../utils/check-active-router';
import { DEFINE_ROUTERS_ADMIN } from '../../../constants/route-mapper';
import { logout } from '../../../utils/localStorage';
import { Divider } from 'antd';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: DEFINE_ROUTERS_ADMIN.dashboard,
      label: 'Dashboard',
      icon: <PieChartOutlined />,
    },
    {
      path: DEFINE_ROUTERS_ADMIN.categoryManager,
      label: 'Categories',
      icon: <BlockOutlined />,
    },
    {
      path: DEFINE_ROUTERS_ADMIN.productManager,
      label: 'Products',
      icon: <MobileOutlined />,
    },
    {
      path: DEFINE_ROUTERS_ADMIN.orderManager,
      label: 'Orders',
      icon: <ShoppingOutlined />,
    },
  ];

  const handleLogOut = () => {
    logout();
    window.location.href = DEFINE_ROUTERS_ADMIN.homeAdmin;
  };

  return (
    <div className="flex flex-col max-w-[320px] h-screen bg-blue-950 text-white">
      <div className="flex flex-col items-center justify-center h-24">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <Divider className="w-20 bg-white !mb-0" />
      </div>
      <div className="flex flex-col mt-4 px-5 space-y-3">
        {menuItems.map((item) => {
          const isActive = isChildUrl(item.path, location.pathname);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center py-3 px-4 hover:bg-white hover:text-blue-950 transition-colors rounded-2xl whitespace-nowrap ${
                isActive ? 'bg-white text-blue-950' : ''
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
        <div
          className="flex items-center py-3 px-4 hover:cursor-pointer hover:bg-white hover:text-blue-950 transition-colors rounded-2xl"
          onClick={handleLogOut}
        >
          <span className="mr-2">{<LoginOutlined />}</span>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
