import "bootstrap/dist/css/bootstrap.min.css";
import NavHome from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import AboutUs from "./pages/AboutUs/AboutUs";
import AddFood from "./pages/AddFood/AddFood";
import AllUser from "./pages/AllUsers/AllUsers";
import NotLogged from "./pages/NotLogged/NotLogged";
import Details from "./pages/Details/Details";
import FoodRate from "./pages/FoodRate/FoodRate";
import FoodList from "./pages/FoodList/FoodList";
import Profile from "./pages/Profile/Profile";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavHome />
        <Outlet />
        <Footer />
      </>
    ),
    errorElement: <p>Page Not Found</p>,
    children: [
      {
        path: "/",
        element: localStorage.getItem("token") ? <Home /> : <Login />,
      },
      {
        path: "/add-food",
        element: localStorage.getItem("token") ? <AddFood /> : <NotLogged />,
      },
      {
        path: "/favorites",
        element: localStorage.getItem("token") ? <Favorites /> : <NotLogged />,
      },
      {
        path: "/about",
        element: localStorage.getItem("token") ? <AboutUs /> : <NotLogged />,
      },
      {
        path: "/all-users",
        element: localStorage.getItem("token") ? <AllUser /> : <NotLogged />,
      },
      {
        path: "/details/:foodID",
        element: localStorage.getItem("token") ? <Details /> : <NotLogged />,
      },
      {
        path: "/food-rate/:foodID",
        element: localStorage.getItem("token") ? <FoodRate /> : <NotLogged />,
      },
      {
        path: "/food-list",
        element: localStorage.getItem("token") ? <FoodList /> : <NotLogged />,
      },
      {
        path: "/profile",
        element: localStorage.getItem("token") ? <Profile /> : <NotLogged />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

reportWebVitals();
