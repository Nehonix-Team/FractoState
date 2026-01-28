import { useFlow } from "fractostate";
import { AuthFlow } from "../store/auth";
import { Navigate, useLocation, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const [auth, { isHydrating }] = useFlow(AuthFlow);
  const location = useLocation();

  if (isHydrating) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin mb-4" />
        <p className="text-white/40 text-sm font-bold tracking-widest animate-pulse">
          RECOVERING SESSION...
        </p>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
