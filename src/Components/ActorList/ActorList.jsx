import React, { useEffect, useState } from "react";
import styles from "./ActorList.module.css";
import { axiosInstance } from "../apis/config";
import ActorCard from "../ActorCard/ActorCard";
export default function ActorList() {
  const [Actors, setActors] = useState([]);
  let GetAllActors = () => {
    axiosInstance.get(`Actor`).then((res) => {
      if (res.data.isSuccess) {
        setActors(res.data.data);
      } else {
        setActors([]);
      }
    });
  };

  useEffect(() => {
    GetAllActors();
  }, []);

  return (
    <>
      <div className=" row  ">
        {Actors.map((Actor) => (
          <div key={Actor.id} className=" col col-3  mb-5  ">
            <ActorCard Actor={Actor}></ActorCard>
          </div>
        ))}
      </div>
    </>
  );
}
