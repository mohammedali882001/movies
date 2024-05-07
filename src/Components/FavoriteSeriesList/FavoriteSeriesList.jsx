import React, { useEffect, useState } from "react";
import styles from "./FavoriteSeriesList.module.css";
import { axiosInstance } from "../apis/config";
import FavoriteSeriesCart from "../FavoriteSeriesCart/FavoriteSeriesCart";
export default function FavoriteSeriesList() {
  const [favList, setFavList] = useState([]);
  const token = localStorage.getItem("userToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let GetAllFavSeries = () => {
    axiosInstance
      .get(`FavSeries`, config)
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
    GetAllFavSeries();
  }, []);

  useEffect(() => {
    GetAllFavSeries();
  }, [favList]);

  return (
    <>
      <div className="row">
        {favList.map((fav) => (
          <div key={fav.id} className="col col-3 mb-5">
            <FavoriteSeriesCart FavSeries={fav}></FavoriteSeriesCart>
          </div>
        ))}
      </div>
    </>
  );
}
