import React, { useEffect, useState } from "react";
import styles from "./ActorDetails.module.css";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../apis/config";
import ActorSeriesSlider from "../ActorSeriesSlider/ActorSeriesSlider";
export default function ActorDetails() {
  let { id } = useParams();
  const [Actor, setActor] = useState({});
  let GatActor = () => {
    axiosInstance
      .get(`Actor/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setActor(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GatActor();
  }, []);
  return (
    <>
      <br></br>
      <div
        className="card mb-5 gy-5"
        style={{ maxWidth: "500000", height: 600 }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={Actor.image}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title fw-bold fs-1">{Actor.name}</h2>
              <p className="fw-bold fs-4 ">Overview</p>
              <p className="card-text " style={{ color: "black" }}>
                {Actor.overview}
              </p>
              <p className="fw-bold fs-4 ">Known For</p>
              <ActorSeriesSlider ActorId={id}></ActorSeriesSlider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
