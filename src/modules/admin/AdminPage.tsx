import { Navigate } from "react-router-dom";
import { DEFINE_ROUTERS_ADMIN } from "../../constants/route-mapper";

export default function AdminPage() {
  return <Navigate to={DEFINE_ROUTERS_ADMIN.dashboard} replace />;
}
