// CartContextProvider.js
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../Components/apis/config";
export const ActorContext = createContext();
export function ActorContextProvider(props) {
  const [actorData, setActorData] = useState({
    name: "",
    age: "",
    image: "",
    overview: "",
  });

  const addActor = (newActorData) => {
    const token = localStorage.getItem("userToken");
    return axiosInstance
      .post(
        `Actor`,
        newActorData, // Send the new actor data directly without wrapping it in an object
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      )
      .then((res) => {
        // Extract and return only the relevant data from the response
        return res.data;
      })
      .catch((err) => {
        // Handle errors appropriately
        console.error("Error adding actor:", err);
        throw err; // Rethrow the error to propagate it to the caller
      });
  };

  return (
    <ActorContext.Provider
      value={{
        addActor,
        actorData,
      }}
    >
      {props.children}
    </ActorContext.Provider>
  );
}
