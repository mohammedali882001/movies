import React from "react";
import styles from "./DirectorCard.module.css";
import { Link } from "react-router-dom";
export default function DirectorCard({ director }) {
  return (
    <Link to={`/directorDetails/${director.id}`}>
      <div className={`card ${styles.directorCard}`}>
        <img
          src={director.image}
          alt={director.name}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{director.name}</h5>
          <p className="card-text">Age: {director.age}</p>
          <p className="card-text">Overview: {director.overview}</p>
        </div>
      </div>
    </Link>
  );
}
