import { Outlet } from 'react-router-dom';
import TheHeader from './TheHeader';
import TheFooter from './TheFooter';
import ChatBot from '../../modules/app/home/ChatBot';

export default function TheLayout() {
  return (
    <div className="w-full flex flex-col justify-between items-center min-h-screen">
      <TheHeader />
      <Outlet />
      <TheFooter />
      <ChatBot />
    </div>
  );
}
