import logo from "./logo.svg";
import "./App.css";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
// import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from "./Components/NotFound/NotFound";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function App() {

  const [userData, setUserData] = useState(null);
  function SaveUserData() {
    let enecodeToken = localStorage.getItem("userToken");
    let decodeToken = jwtDecode(enecodeToken);
    setUserData(decodeToken);
  }

  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout></Layout>,
      children: [
        {
          index: true,
          element: (
            // <ProtectedRoute>
            //   <Home></Home>
            // </ProtectedRoute>
            <Home></Home>
          ),
        },

        { path: "login", element: <Login SaveUserData={SaveUserData} /> },

        { path: "register", element: <Register></Register> },

        { path: "*", element: <NotFound></NotFound> },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={routers}></RouterProvider>
    </div>
  );
}

export default App;
