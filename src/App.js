import logo from "./logo.svg";
import "./App.css";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import SeriesDetails from "./Components/SeriesDetails/SeriesDetails";
// import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from "./Components/NotFound/NotFound";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import ActorCard from "./Components/ActorCard/ActorCard";
import ActorList from "./Components/ActorList/ActorList";
import ActorDetails from "./Components/ActorDetails/ActorDetails";
import Directors from "./Components/Directors/Directors";
import DirectorDetails from "./Components/DirectorDetails/DirectorDetails";

import Series from "./Components/Series/Series";
import { Toaster } from "react-hot-toast";
import FavoriteSeriesList from "./Components/FavoriteSeriesList/FavoriteSeriesList";

import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { ActorContextProvider } from "./Context/ActorContext";
import AddActor from "./Components/AddActor/AddActor";

import Movies from "./Components/Movies/Movies";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import FavoriteMovie from "./Components/FavoriteMovie/FavoriteMovie";
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
      element: <Layout setUserData={setUserData} userData={userData}></Layout>,
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
        {
          path: "seriesDetails/:id",
          element: <SeriesDetails></SeriesDetails>,
        },
        {
          path: "movieDetails/:id",
          element: <MovieDetails></MovieDetails>,
        },
        {
          path: "series",
          element: (
            <ProtectedRoute>
              {" "}
              <Series></Series>{" "}
            </ProtectedRoute>
          ),
        },
        { path: "series", element: <Series></Series> },
        { path: "movies", element: <Movies></Movies> },

        // { path: "details/:id", element: <SeriesDetails></SeriesDetails> },
        { path: "actor", element: <ActorCard></ActorCard> },
        { path: "actors", element: <ActorList></ActorList> },
        { path: "actorsDetails/:id", element: <ActorDetails></ActorDetails> },

        { path: "director", element: <Directors></Directors> },
        { path: "addActor", element: <AddActor></AddActor> },
        {
          path: "getAllFavSeries",
          element: (
            <ProtectedRoute>
              <FavoriteSeriesList></FavoriteSeriesList>
            </ProtectedRoute>
          ),
        },

        {
          path: "getAllFavMovies",
          element: (
            <ProtectedRoute>
              <FavoriteMovie></FavoriteMovie>
            </ProtectedRoute>
          ),
        },

        {
          path: "directorDetails/:id",
          element: <DirectorDetails></DirectorDetails>,
        },
        { path: "*", element: <NotFound></NotFound> },
      ],
    },
  ]);
  return (
    <>
      <Toaster></Toaster>
      <div className="App">
        <ActorContextProvider>
          <RouterProvider router={routers}></RouterProvider>
        </ActorContextProvider>
      </div>
    </>
  );
}

export default App;
