import React, { useEffect, useState } from "react";
import styles from "./ActorCard.module.css";
import { axiosInstance } from "../apis/config";
import { Link } from "react-router-dom";
export default function ActorCard({ Actor }) {
  // const [Actor, setActor] = useState({});
  // let GatActor = () => {
  //   axiosInstance
  //     .get(`Actor/1`)
  //     .then((res) => {
  //       // console.log(res.data.data);
  //       setActor(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   GatActor();
  // }, []);

  return (
    <>
      <Link
        style={{ textDecoration: "none" }}
        to={`/actorsDetails/${Actor.id}`}
      >
        <div className="card cursor-pointer " style={{ width: "18rem" }}>
          <img src={Actor.image} className="card-img-top" alt="Actor Image" />
          <div className="card-body">
            <h5 className="card-title">{Actor.name}</h5>
            <p className="card-text">{Actor.overview}</p>
            <p className="card-text">age : {Actor.age}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
