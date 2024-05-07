import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";

export default function SeriesCategories() {
  const [seriesCat, setSeriesCat] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    const getSeriesCategories = () => {
      axiosInstance.get(`Category`).then((res) => {
        if (res.data.isSuccess) {
          setSeriesCat(res.data.data);
        } else {
          setSeriesCat([]);
        }
      });
    };

    getSeriesCategories();
  }, []);

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      try {
        const response = await axiosInstance.get(
          `CategorySeries/${categoryId}`
        );
        if (response.data.isSuccess) {
          setSeriesData(response.data.data);
          console.log(response.data.data);
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
          <ul>
            {seriesData.map((series) => (
              <li key={series.id}>{series.title}</li>
            ))}
          </ul>
        ) : (
          <p>No series found for the selected category.</p>
        )}
      </div>
    </div>
  );
}
