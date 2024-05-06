import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";

export default function SeriesDetails() {
  const [series, setSeries] = useState(null);

  let GetSeriesData = () => {
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
    GetSeriesData();
  }, []);

  return (
    <>
      {series && (
        <div className="container mt-5">
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={series.posterImage}
                  className="img-fluid rounded-start"
                  alt={series.title}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{series.title}</h5>
                  <p className="card-text">{series.description}</p>
                  <p className="card-text">
                    <strong>Number of Episodes:</strong> {series.numOfEpisodes}
                  </p>
                  <p className="card-text">
                    <strong>Created Year:</strong> {series.createdYear}
                  </p>
                  <p className="card-text">
                    <strong>Section:</strong> {series.filmSection}
                  </p>
                  <button className="btn btn-primary">Watch Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
