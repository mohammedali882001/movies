import React, { useEffect, useState } from "react";
import styles from "./ActorList.module.css";
import { axiosInstance } from "../apis/config";
import ActorCard from "../ActorCard/ActorCard";

export default function ActorList() {
  const [actors, setActors] = useState([]);
  const [searchActor, setSearchActor] = useState("");
  const [originalActors, setOriginalActors] = useState([]);

  const getAllActors = () => {
    axiosInstance.get(`Actor`).then((res) => {
      if (res.data.isSuccess) {
        setActors(res.data.data);
        setOriginalActors(res.data.data);
      } else {
        setActors([]);
        setOriginalActors([]);
      }
    });
  };

  const handleSearchActor = (searchString) => {
    setSearchActor(searchString);
    setActors(originalActors);
    axiosInstance.get(`Actor/${searchString}`).then((res) => {
      if (res.data.isSuccess) {
        setActors(res.data.data);
      } else {
        setActors([]);
      }
    });
  };

  const resetSearch = () => {
    setSearchActor("");
    setActors(originalActors);
  };

  useEffect(() => {
    getAllActors();
  }, []);

  useEffect(() => {
    handleSearchActor(searchActor);
  }, [searchActor]);

  return (
    <>
      <div className="container mt-5">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search For Actor"
            aria-describedby="button-addon2"
            id="searchActor"
            value={searchActor}
            onChange={(e) => handleSearchActor(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={resetSearch}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="row">
        {actors.map((actor) => (
          <div key={actor.id} className="col col-3 mb-5">
            <ActorCard Actor={actor}></ActorCard>
          </div>
        ))}
      </div>
    </>
  );
}
