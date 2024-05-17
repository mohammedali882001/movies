import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

import toast, { Toaster } from "react-hot-toast";
export default function Movies() {
  const [seriesCat, setSeriesCat] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [seriesData, setSeriesData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [firstID, setFirstId] = useState(0);

  let getFirstId = async () => {
    await axiosInstance
      .get("Category/firstCat")
      .then((res) => {
        if (res.data.isSuccess) {
          console.log(res.data.data);
          setFirstId(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFirstId();
    setSelectedCategory(firstID);
    console.log(selectedCategory);
    const getSeriesCategories = async () => {
      try {
        const response = await axiosInstance.get("Category");
        if (response.data.isSuccess) {
          setSeriesCat(response.data.data);
        } else {
          setSeriesCat([]);
        }
      } catch (error) {
        console.error("Error fetching series categories:)", error);
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
      const response = await axiosInstance.get(`FavMovie/${id}`, config);
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
          `CategoryMovie/${selectedCategory}`
        );
        if (response.data.isSuccess) {
          const updatedSeriesData = await Promise.all(
            response.data.data.map(async (series) => {
              const isFav = await GetIsFavorite(series.id);
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
      await axiosInstance.post(`FavMovie/${id}`, null, config);
      setSeriesData((prevSeriesData) =>
        prevSeriesData.map((series) => {
          if (series.id === id) {
            //////////////////////////////////////////////////
            series.isFavorite = true;
          }

          return series;
        })
      );
      toast.success("Add Successfully", { duration: 1000 });
    } catch (error) {
      console.log(error);
    }
  };

  let DeleteSeriesFromFavorite = async (id) => {
    try {
      await axiosInstance.delete(`FavMovie/${id}`, config);
      setSeriesData((prevSeriesData) =>
        prevSeriesData.map((series) => {
          if (series.id === id) {
            series.isFavorite = false;
          }
          return series;
        })
      );
      toast.error("Removed Successfully", { duration: 1000 });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <>
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
                <div key={series.seriesId} className="col-md-3 mb-4">
                  <div className="card">
                    <Link to={`/movieDetails/${series.id}`}>
                      <img
                        src={series.posterImage}
                        className="card-img-top"
                        alt={series.title}
                      />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">{series.title}</h5>
                      <p className="card-text">{series.description}</p>

                      {series.isFavorite ? (
                        <span
                          className="favorite-icon cursor-pointer favorited"
                          onClick={() => DeleteSeriesFromFavorite(series.id)}
                        >
                          ❤️
                        </span>
                      ) : (
                        <span
                          className="favorite-icon cursor-pointer"
                          onClick={() => AddSeriesToFavorite(series.id)}
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
