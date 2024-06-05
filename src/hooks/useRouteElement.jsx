/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import {
  ForgotPassword,
  Home,
  Login,
  Profile,
  Register,
  ResetPassword,
} from "../pages";
import { AuthLayout } from "../layouts";
import RecoverPassword from "../pages/ResetPassword/RecoverPassword";
import VerifyEmail from "../pages/VerifyEmail";
import Sidebar from "../components/Sidebar/Sidebar";
import Page404 from "../pages/404Page/Page.404";
import { useContext } from "react";
import { AppContext } from "../contexts/App.context";

const ProtectedRoute = () => {
  const { isAuthentication } = useContext(AppContext);
  // console.log("isAuthentication: ", isAuthentication);
  return isAuthentication ? <Outlet /> : <Navigate to="/login" />;
};
const RejectedRoute = () => {
  const { isAuthentication } = useContext(AppContext);
  // console.log("isAuthentication: ", isAuthentication);
  return isAuthentication ? <Navigate to="/" /> : <Outlet />;
};

const useRouteElement = () => {
  // console.log("re-render useRouteElement");
  const routeElements = useRoutes([
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: (
            <Sidebar>
              <Home />
            </Sidebar>
          ),
        },
        {
          path: "/profile/:id",
          element: (
            <Sidebar>
              <Profile />
            </Sidebar>
          ),
        },
      ],
    },
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: "/login",
          element: (
            <AuthLayout>
              <Login />
            </AuthLayout>
          ),
        },
        {
          path: "/register",
          element: (
            <AuthLayout>
              <Register />
            </AuthLayout>
          ),
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/recover/:userId",
          element: <RecoverPassword />,
        },
        {
          path: "/reset-password/:userId/:code",
          element: <ResetPassword />,
        },
        {
          path: "/verify/:userId/:token",
          element: <VerifyEmail />,
        },
      ],
    },
    {
      path: "*",
      element: <Page404></Page404>,
    },
  ]);
  return routeElements;
};

export default useRouteElement;
