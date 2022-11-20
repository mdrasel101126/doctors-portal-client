import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";
import About from "../Pages/About/About";
import Appointment from "../Pages/Appointment/Appointment/Appointment";
import AddDoctor from "../Pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ManageDoctors from "../Pages/Dashboard/ManageDoctors/ManageDoctors";
import MyAppointment from "../Pages/Dashboard/MyAppointment/MyAppointment";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login/Login";
import Register from "../Pages/Login/Register/Register";
import Reviews from "../Pages/Reviews/Reviews/Reviews";
import DisplayError from "../Pages/Shared/DisplayError/DisplayError";
import AdminRoutes from "./AdminRoutes";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/reviews",
        element: <Reviews></Reviews>,
      },
      {
        path: "/appointment",
        element: <Appointment></Appointment>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/dashboard",
        element: <MyAppointment></MyAppointment>,
      },
      {
        path: "/dashboard/users",
        element: (
          <AdminRoutes>
            <AllUsers></AllUsers>
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/adddoctor",
        element: (
          <AdminRoutes>
            <AddDoctor></AddDoctor>
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/managedoctors",
        element: (
          <AdminRoutes>
            <ManageDoctors></ManageDoctors>
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <AdminRoutes>
            <Payment></Payment>
          </AdminRoutes>
        ),
        loader: async ({ params }) =>
          await fetch(`http://localhost:5000/bookings/${params.id}`),
      },
    ],
  },
]);

export default routes;
