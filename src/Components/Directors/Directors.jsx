import React, { useEffect, useState } from "react";
import styles from "./Directors.module.css";
import { axiosInstance } from "../apis/config";

import DirectorCard from "../DirectorCard/DirectorCard";

export default function Directors() {
  const [directors, setDirectors] = useState([]);
  const [searchDirector, setSearchDirector] = useState("");
  const [originalDirectors, setOriginalDirectors] = useState([]);

  let getAllDirectors = () => {
    axiosInstance.get(`Director`).then((res) => {
      if (res.data.isSuccess) {
        setDirectors(res.data.data);
        setOriginalDirectors(res.data.data);
      } else {
        setDirectors([]);
        setOriginalDirectors([]);
      }
    });
  };

  const handleSearchDirector = (searchString) => {
    setSearchDirector(searchString);
    setDirectors(originalDirectors);
    axiosInstance.get(`Director/${searchString}`).then((res) => {
      if (res.data.isSuccess) {
        setDirectors(res.data.data);
      } else {
        setDirectors([]);
      }
    });
  };

  const resetSearch = () => {
    setSearchDirector("");
    setDirectors(originalDirectors);
  };

  useEffect(() => {
    getAllDirectors();
  }, []);

  useEffect(() => {
    handleSearchDirector(searchDirector);
  }, [searchDirector]);

  return (
    <>
      <div className="container mt-5">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search For Director"
            aria-describedby="button-addon2"
            id="searchDirector"
            value={searchDirector}
            onChange={(e) => handleSearchDirector(e.target.value)}
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
        {directors.map((director) => (
          <div key={director.id} className="col-md-4 gy-5">
            <DirectorCard director={director} />
          </div>
        ))}
      </div>
    </>
  );
}
