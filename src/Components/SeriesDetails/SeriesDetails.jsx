import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import styles from "./SeriesDetails.module.css";

export default function SeriesDetails() {
  const [series, setSeries] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);

  let getSeriesData = () => {
    axiosInstance.get(`Series/5`).then((res) => {
      // Assuming 5 is the ID of the series
      if (res.data.isSuccess) {
        setSeries(res.data.data);
      } else {
        setSeries(null);
      }
      console.log(res.data.data);
    });
  };

  useEffect(() => {
    getSeriesData();
  }, []);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    // Add logic to update favorite status in the backend
  };

  return (
    <>
      {series && (
        <div className="container mt-5 p-5">
          <div className="row">
            <div className="col-md-4">
              <img
                src={series.posterImage}
                className="img-fluid rounded-start"
                alt={series.title}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <div className="head d-flex align-items-center justify-content-between ">
                  <h2 className={`card-title ${styles.title}`}>
                    {series.title}
                  </h2>
                  <span
                    className={`favorite-icon cursor-pointer ${
                      isFavorited ? "favorited" : ""
                    }`}
                    onClick={toggleFavorite}
                  >
                    {isFavorited ? "❤️" : "🤍"}
                  </span>
                </div>
                <p className={`card-text mb-5 ${styles.section}`}>
                  {series.filmSection === 0 ? "Anime" : series.filmSection}
                </p>
                <div>
                  <strong className={styles.overView}>Overview:</strong>
                  <p>{series.description}</p>
                </div>
                <hr />
                {series.seasons.map((season, index) => (
                  <p key={index} className="card-text">
                    <strong>Season {index + 1}:</strong> {season.numOfEpisodes}{" "}
                    episodes
                  </p>
                ))}
                <div className="d-flex justify-content-start">
                  <div className="me-5">
                    <strong>Released Date :</strong> {series.createdYear}
                  </div>
                  <div>
                    <strong>Duration :</strong> {series.lengthMinutes}
                  </div>
                </div>
                <hr />
                <p className="card-text">
                  <strong>Director : </strong>
                  {series.directorName}
                </p>

                <div className="d-flex justify-content-end">
                  <button
                    className={`btn btn-primary ${styles.watchNowButton}`}
                  >
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
