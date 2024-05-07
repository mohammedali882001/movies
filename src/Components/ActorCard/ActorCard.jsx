import React, { useEffect, useState } from "react";
import styles from "./ActorCard.module.css";
import { axiosInstance } from "../apis/config";
import { Link } from "react-router-dom";
export default function ActorCard({ Actor }) {
  return (
    <>
      <Link
        style={{ textDecoration: "none" }}
        to={`/actorsDetails/${Actor.id}`}
      >
        <div
          className="card border-primary cursor-pointer"
          style={{ maxWidth: "18rem" }}
        >
          <img src={Actor.image} className="card-img-top" alt="image Name" />
          <div className="card-body">
            <h5 className="card-title text-primary fw-bolder">{Actor.name}</h5>
            <p className="card-text">
              <span className=" text-primary fw-bolder  "> Overview :</span>{" "}
              {Actor.overview}
            </p>
            <p className="card-text">
              <small className="text-muted">
                {" "}
                <span className=" text-primary fw-bolder ">Age :</span>{" "}
                {Actor.age}
              </small>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
