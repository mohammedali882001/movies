import React, { useEffect, useState } from "react";
import styles from "./ActorDetails.module.css";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../apis/config";
export default function ActorDetails() {
  let { id } = useParams();
  const [Actor, setActor] = useState({});
  let GatActor = () => {
    axiosInstance
      .get(`Actor/${id}`)
      .then((res) => {
        // console.log(res.data.data);
        setActor(res.data.data);
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
      <div className="card mb-3" style={{ maxWidth: "500000" }}>
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
              <h2 className="card-title">{Actor.name}</h2>
              <p className="card-text">{Actor.overview}</p>
              <p className="card-text">
                <small className="text-muted">Age : {Actor.age}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
