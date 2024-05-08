import React, { useEffect, useState } from "react";
import styles from "./FavoriteSeriesCart.module.css";
import { Link } from "react-router-dom";
import { axiosInstance } from "../apis/config";

import toast, { Toaster } from "react-hot-toast";

export default function FavoriteSeriesCart({ FavSeries }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const token = localStorage.getItem("userToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let GetIsFavorite = async () => {
    await axiosInstance
      .get(`FavSeries/series/${FavSeries.seriesId}`, config)
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
  let DeleteSeriesFromFavorite = () => {
    axiosInstance
      .delete(`FavSeries/${FavSeries.seriesId}`, config)
      .then((res) => {
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
          to={`/seriesDetails/${FavSeries.seriesId}`}
        >
          <img
            src={FavSeries.seriesImage}
            className="card-img-top"
            alt="image Name"
          />
          <div className="card-body">
            <h5 className="card-title text-primary fw-bolder">
              {FavSeries.seriesName}
            </h5>
            <p className="card-text">
              <span className=" text-primary fw-bolder  "> Overview :</span>{" "}
              {FavSeries.seriesDescription}
            </p>
          </div>
        </Link>
        <button onClick={DeleteSeriesFromFavorite} className=" btn m-0 p-0 ">
          <i className=" fa-regular text-main fa-trash-can m-2"> </i>
        </button>
      </div>
    </>
  );
}
