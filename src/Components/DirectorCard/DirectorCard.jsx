import React from "react";
import styles from "./DirectorCard.module.css";
import { Link } from "react-router-dom";
export default function DirectorCard({ director }) {
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/directorDetails/${director.id}`}
    >
      <div
        style={{ maxWidth: "18rem" }}
        className={`card border-primary cursor-pointer ${styles.directorCard}`}
      >
        <img
          src={director.image}
          alt={director.name}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title text-primary">{director.name}</h5>
          <p className="card-text">Overview: {director.overview}</p>
          <small>
            {" "}
            <p className="card-text">Age: {director.age}</p>
          </small>
        </div>
      </div>
    </Link>
  );
}
