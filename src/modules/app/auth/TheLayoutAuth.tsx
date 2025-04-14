import TheFooter from '../../../components/layout/TheFooter'
import TheHeader from '../../../components/layout/TheHeader'
import { Outlet } from 'react-router-dom'
export default function TheLayoutAuth() {
  return (
    <div className="h-screen bg-gray-50 flex flex-col items-center justify-between">
      <TheHeader />
      <div className="w-full flex flex-col justify-center items-center mt-10">
        <Outlet />
      </div>
      <TheFooter />
    </div>
  )
}