import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/user";

//pages
import AuthPage from "../pages/Auth";
import HomePage, { loader } from "../pages/Home";
import RootLayout from "../pages/Root";
import NotFoundPage from "../pages/404";
import DashboardPage from "../pages/Dashboard";
import AdminPage from "../pages/Admin";
import Loader from "../components/modules/Loader";
import AddPostPage from "../pages/AddPost";

function Router() {
  const { data, isLoading } = useQuery(["profile"], getProfile);

  if (isLoading) {
    return <Loader />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <HomePage />, loader: loader },
        {
          path: "dashboard",
          element: data ? <DashboardPage /> : <Navigate to={"/auth"} />,
        },
        {
          path: "addpost",
          element: data ? <AddPostPage /> : <Navigate to={"/auth"} />,
        },
        {
          path: "auth",
          element: !data ? <AuthPage /> : <Navigate to={"/dashboard"} />,
        },
        {
          path: "admin",
          element:
            data && data.data.role === "ADMIN" ? (
              <AdminPage />
            ) : (
              <Navigate to={"/"} />
            ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
