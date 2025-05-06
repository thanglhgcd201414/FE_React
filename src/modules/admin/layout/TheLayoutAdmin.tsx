import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import { DEFINE_ROUTERS_ADMIN } from "../../../constants/route-mapper";
import { isAdmin } from "../../../utils/localStorage";

export default function TheLayoutAdmin() {
  const admin = isAdmin();

  if (!admin) {
    return (
      <div className="h-full w-full justify-center flex-col space-y-5 mt-10 flex items-center text-3xl font-bold text-red-600">
        Unauthorized
        <Navigate to={DEFINE_ROUTERS_ADMIN.loginAdmin} replace />
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="px-4 w-full py-10 h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
