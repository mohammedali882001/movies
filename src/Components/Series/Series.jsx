import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import { Link } from "react-router-dom";

export default function SeriesCategories() {
  const [seriesCat, setSeriesCat] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [seriesData, setSeriesData] = useState([]);

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
  );
}
