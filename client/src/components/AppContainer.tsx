import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import TopNav from "./layout/TopNav";
import LeftNav from "./layout/LeftNav";
import BottomNav from "./layout/BottomNav";
import LoadingPage from "./LoadingPage";

const AppContainer = () => {
  const { user, isLoading } = useAuth();
  const { pathname } = useLocation();

  console.log(user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return isLoading ? (
    <LoadingPage />
  ) : user ? (
    <div>
      <TopNav />
      <div className="xl:px-4 min-h-screen flex justify-center">
        <LeftNav />
        <div className="flex-grow max-w-[600px] lg:max-w-[880px] xl:max-w-[960px] min-h-screen py-[60px] sm:py-0">
          <Outlet />
        </div>
      </div>
      <BottomNav />
    </div>
  ) : (
    <Navigate
      to="/auth"
      replace
      state={{ redirectUrl: window.location.pathname }}
    />
  );
};

export default AppContainer;
