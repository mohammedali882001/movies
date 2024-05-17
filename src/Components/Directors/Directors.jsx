import React, { useEffect, useState } from "react";
import styles from "./Directors.module.css";
import { axiosInstance } from "../apis/config";

import DirectorCard from "../DirectorCard/DirectorCard";

export default function Directors() {
  const [directors, setDirectors] = useState([]);
  const [searchDirector, setSearchDirector] = useState("");
  const [originalDirectors, setOriginalDirectors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let getAllDirectors = () => {
    setIsLoading(true);
    axiosInstance.get(`Director`).then((res) => {
      if (res.data.isSuccess) {
        setDirectors(res.data.data);
        setOriginalDirectors(res.data.data);
        setIsLoading(false);
        console.log(res.data.data);
      } else {
        setDirectors([]);
        setOriginalDirectors([]);
        setIsLoading(false);
        console.log(res.data);
      }
    });
  };

  const handleSearchDirector = (searchString) => {
    setIsLoading(true);
    setSearchDirector(searchString);
    setDirectors(originalDirectors);
    axiosInstance.get(`Director/${searchString}`).then((res) => {
      if (res.data.isSuccess) {
        setDirectors(res.data.data);
        setIsLoading(false);
      } else {
        setDirectors([]);
        setIsLoading(false);
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
      <div className="container mt-5 p-5">
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

      {isLoading ? (
        <div className=" text-center  ">
          <i className=" fas fa-spinner fa-spin fa-3x text-main "></i>
        </div>
      ) : (
        <>
          <div className="row">
            {directors.map((director) => (
              <div key={director.id} className="col-md-3 gy-5">
                <DirectorCard director={director} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
