import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import About from "../Components/About";
import Services from "../Components/Services";
import BookService from "../Pages/BookService";
import ErrorPage from "../Components/ErrorPage";
import Bookings from "../Pages/Bookings";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/book/:id",
        element: <PrivateRoute><BookService /></PrivateRoute>,
        loader: ({params})=> fetch(`https://car-management-server-nine.vercel.app/services/${params.id}`)
      },
      {
        path: "/bookings",
        element: <PrivateRoute><Bookings></Bookings></PrivateRoute>,
      }
    ],
  },
]);

export default router;
