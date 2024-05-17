import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import FavoriteMovieCart from "../FavoriteMovieCart/FavoriteMovieCart";
export default function FavoriteMovie() {
  const [favList, setFavList] = useState([]);
  const token = localStorage.getItem("userToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let GetAllFavMovies = () => {
    axiosInstance
      .get(`FavMovie`, config)
      .then((res) => {
        console.log(res.data.data);
        if (res.data.isSuccess) {
          setFavList(res.data.data);
        } else {
          setFavList([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetAllFavMovies();
  }, []);

  useEffect(() => {
    GetAllFavMovies();
  }, [favList]);

  return (
    <>
      <div className="row">
        {favList.map((fav) => (
          <div key={fav.id} className="col col-3 mb-5">
            <FavoriteMovieCart FavMovie={fav}></FavoriteMovieCart>
          </div>
        ))}
      </div>
    </>
  );
}
