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
      {/* <div className="card mb-3" style={{ maxWidth: "500000" }}>
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
      </div> */}

      {/* ///// New Profile */}
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-xl-6 col-md-12">
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-4 bg-c-lite-green user-profile">
                    <div className="card-block text-center text-white">
                      <div className="m-b-25">
                        <img
                          src="https://img.icons8.com/bubbles/100/000000/user.png"
                          className="img-radius"
                          alt="User-Profile-Image"
                        />
                      </div>
                      <h6 className="f-w-600">
                        Hembo000000000000000000 Tingor
                      </h6>
                      <p>Web Designer</p>
                      <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="card-block">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                        Information
                      </h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Email</p>
                          <h6 className="text-muted f-w-400">
                            rntng@gmail.com
                          </h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Phone</p>
                          <h6 className="text-muted f-w-400">98979989898</h6>
                        </div>
                      </div>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        Projects
                      </h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Recent</p>
                          <h6 className="text-muted f-w-400">Sam Disuja</h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Most Viewed</p>
                          <h6 className="text-muted f-w-400">
                            Dinoter husainm
                          </h6>
                        </div>
                      </div>
                      <ul className="social-link list-unstyled m-t-40 m-b-10">
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="facebook"
                            data-abc="true"
                          >
                            <i
                              className="mdi mdi-facebook feather icon-facebook facebook"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="twitter"
                            data-abc="true"
                          >
                            <i
                              className="mdi mdi-twitter feather icon-twitter twitter"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="instagram"
                            data-abc="true"
                          >
                            <i
                              className="mdi mdi-instagram feather icon-instagram instagram"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
