import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import styles from "./Series.module.css";

import toast, { Toaster } from "react-hot-toast";
export default function SeriesCategories() {
  const [seriesCat, setSeriesCat] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [seriesData, setSeriesData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getSeriesCategories = async () => {
      try {
        const response = await axiosInstance.get("Category");
        if (response.data.isSuccess) {
          setSeriesCat(response.data.data);
        } else {
          setSeriesCat([]);
        }
      } catch (error) {
        console.error("Error fetching series categories:", error);
      }
    };

    getSeriesCategories();
  }, []);

  const token = localStorage.getItem("userToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let GetIsFavorite = async (id) => {
    try {
      const response = await axiosInstance.get(
        `FavSeries/series/${id}`,
        config
      );
      return response.data.isSuccess;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const fetchData = async () => {
    if (selectedCategory) {
      try {
        const response = await axiosInstance.get(
          `CategorySeries/${selectedCategory}`
        );
        if (response.data.isSuccess) {
          const updatedSeriesData = await Promise.all(
            response.data.data.map(async (series) => {
              const isFav = await GetIsFavorite(series.seriesId);
              series.isFavorite = isFav;
              return series;
            })
          );
          setSeriesData(updatedSeriesData);
        } else {
          setSeriesData([]);
        }
      } catch (error) {
        console.error("Error fetching series data:", error);
      }
    } else {
      setSeriesData([]);
    }
  };

  const toggleFavorite = (seriesId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(seriesId)
        ? prevFavorites.filter((id) => id !== seriesId)
        : [...prevFavorites, seriesId]
    );
  };

  const isFavorite = (seriesId) => favorites.includes(seriesId);

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  let AddSeriesToFavorite = async (id) => {
    try {
      await axiosInstance.post(`FavSeries/${id}`, null, config);
      setSeriesData((prevSeriesData) =>
        prevSeriesData.map((series) => {
          if (series.seriesId === id) {
            series.isFavorite = true;
            // toast.success("Add Successfully", { duration: 1000 });
          }
          return series;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  let DeleteSeriesFromFavorite = async (id) => {
    try {
      await axiosInstance.delete(`FavSeries/${id}`, config);
      setSeriesData((prevSeriesData) =>
        prevSeriesData.map((series) => {
          if (series.seriesId === id) {
            series.isFavorite = false;
            // toast.error("Removed Successfully", { duration: 1000 });
          }
          return series;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <>
      <h2 className="text-center py-3">Series</h2>
      <div className="container p-5">
        <div className="d-flex justify-content-end">
          <select
            className={`form-select  ${styles.selectPosition}`}
            aria-label="Default select example"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">Select Category</option>
            {seriesCat.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3">
          {seriesData.length > 0 ? (
            <div className="row row-cols-1 row-cols-4">
              {seriesData.map((series) => (
                <div key={series.seriesId} className="col">
                  <div
                    className="card h-100"
                    style={{ border: "none", width: "200px" }}
                  >
                    <img
                      src={series.posterImage}
                      className="card-img-top"
                      alt={series.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body position-relative">
                      <button
                        className={`btn btn-link position-absolute top-0 end-0 m-2 ${styles.favoriteButton}`}
                        onClick={() => toggleFavorite(series.seriesId)}
                      >
                        <FontAwesomeIcon
                          icon={
                            isFavorite(series.seriesId)
                              ? solidHeart
                              : regularHeart
                          }
                          style={{
                            color: isFavorite(series.seriesId) ? "red" : "grey",
                          }}
                        />
                      </button>
                      <h5 className="card-title pb-2">{series.title}</h5>
                      <Link
                        className={`btn btn-primary ${styles.detailsLink}`}
                        to={`/seriesDetails/${series.seriesId}`}
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">
              No series found for the selected category.
            </p>
          )}
        </div>
      </div>

      <div className="container mt-5 p-5">
        <select
          className="form-select"
          aria-label="Default select example"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">Select Category</option>
          {seriesCat.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <div className="mt-3">
          {seriesData.length > 0 ? (
            <div className="row">
              {seriesData.map((series) => (
                <div key={series.seriesId} className="col-md-4 mb-4">
                  <div className="card">
                    <img
                      src={series.posterImage}
                      className="card-img-top"
                      alt={series.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{series.title}</h5>
                      <p className="card-text">{series.description}</p>
                      <Link
                        className="btn btn-primary"
                        to={`/seriesDetails/${series.seriesId}`}
                      >
                        Details
                      </Link>
                      {series.isFavorite ? (
                        <span
                          className="favorite-icon cursor-pointer favorited"
                          onClick={() =>
                            DeleteSeriesFromFavorite(series.seriesId)
                          }
                        >
                          ❤️
                        </span>
                      ) : (
                        <span
                          className="favorite-icon cursor-pointer"
                          onClick={() => AddSeriesToFavorite(series.seriesId)}
                        >
                          🤍
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No series found for the selected category.</p>
          )}
        </div>
      </div>
    </>
  );
}
