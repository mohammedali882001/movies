import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../apis/config";

import toast, { Toaster } from "react-hot-toast";

export default function FavoriteMovieCart({ FavMovie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const token = localStorage.getItem("userToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let GetIsFavorite = async () => {
    await axiosInstance
      .get(`FavMovie/${FavMovie.movieId}`, config) //////////////////////////
      .then((res) => {
        if (res.data.isSuccess) {
          // console.log(res.data);
          setIsFavorite(true);
        } else {
          // console.log(res.data);
          setIsFavorite(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let DeleteMovieFromFavorite = () => {
    axiosInstance.delete(`FavMovie/${FavMovie.movieId}`, config).then((res) => {
      if (res.data.isSuccess) {
        setIsFavorite(false);
        // console.log(res.data);
        toast.error(res.data.data, { duration: 1000 });
      } else {
        setIsFavorite(true);
        // console.log(res.data);
      }
    });
  };

  useEffect(() => {
    GetIsFavorite();
  }, []);

  return (
    <>
      <div
        className="card border-primary cursor-pointer"
        style={{ maxWidth: "18rem" }}
      >
        <Link
          style={{ textDecoration: "none" }}
          to={`/movieDetails/${FavMovie.movieId}`}
        >
          <img
            src={FavMovie.movieImage}
            className="card-img-top"
            alt="image Name"
          />
          <div className="card-body">
            <h5 className="card-title text-primary fw-bolder">
              {FavMovie.movieName}
            </h5>
            <p className="card-text">
              <span className=" text-primary fw-bolder  "> Overview :</span>{" "}
              {FavMovie.movieDescription}
            </p>
          </div>
        </Link>
        <button onClick={DeleteMovieFromFavorite} className=" btn m-0 p-0 ">
          <i className=" fa-regular text-main fa-trash-can m-2"> </i>
        </button>
      </div>
    </>
  );
}
