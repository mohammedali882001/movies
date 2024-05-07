import React, { useEffect, useState } from "react";
import styles from "./DirectorDetails.module.css";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../apis/config";
import DirectorSlider from "../DirectorSlider/DirectorSlider";
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
      <div
        className="card mb-5 gy-5"
        style={{ maxWidth: "500000", height: 600 }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={director.image}
              style={{ height: 500 }}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title fw-bold fs-1">{director.name}</h2>
              <p className="fw-bold fs-4 ">Overview</p>
              <p className="card-text " style={{ color: "black" }}>
                {director.overview}
              </p>
              <p className="fw-bold fs-4 ">Known For</p>
              <DirectorSlider DirectorId={id}></DirectorSlider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
