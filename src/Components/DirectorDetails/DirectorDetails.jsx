import React, { useEffect, useState } from "react";
import styles from "./DirectorDetails.module.css";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../apis/config";
export default function DirectorDetails() {
  let { id } = useParams();
  const [director, setDirector] = useState({});
  let GetDirector = () => {
    axiosInstance
      .get(`Director/${id}`)
      .then((res) => {
        // console.log(res.data.data);
        setDirector(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetDirector();
  }, []);
  return (
    <>
      <div className="card mb-3" style={{ maxWidth: "500000" }}>
        <div className="row g-3">
          <div className="col-md-4">
            <img
              src={director.image}
              style={{ height: 400 }}
              className="img-fluid rounded-start w-100 "
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{director.name}</h2>
              <p className="card-text">{director.overview}</p>
              <p className="card-text">
                <small className="text-muted">Age : {director.age}</small>
              </p>
            </div>

            <h6>Movies:</h6>
            <ul>
              {director.movies && director.movies.length > 0 ? (
                director.movies.map((movie) => (
                  <li key={movie.id}>
                    <Link
                      className="text-main"
                      style={{ textDecoration: "none" }}
                      to={`/movies/${movie.id}`}
                    >
                      {movie.title}
                    </Link>
                  </li>
                ))
              ) : (
                <span>0</span>
              )}
            </ul>
            <h6>Series:</h6>
            <ul>
              {director.series && director.series.length > 0 ? (
                director.series.map((series) => (
                  <li key={series.id}>
                    <Link
                      className="text-main"
                      style={{ textDecoration: "none" }}
                      to={`/series/${series.id}`}
                    >
                      {series.title}
                    </Link>
                  </li>
                ))
              ) : (
                <span>0</span>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
