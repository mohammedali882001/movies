import React, { useEffect, useState } from "react";
import styles from "./Directors.module.css";
import { axiosInstance } from "../apis/config";

import DirectorCard from "../DirectorCard/DirectorCard";

export default function Directors() {
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    const getAllDirectors = async () => {
      try {
        const response = await axiosInstance.get(`Director`);
        if (response.data.isSuccess) {
          setDirectors(response.data.data);
        } else {
          setDirectors([]);
        }
      } catch (error) {
        console.error("Error fetching directors:", error);
      }
    };

    getAllDirectors();
  }, []);

  return (
    <>
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
