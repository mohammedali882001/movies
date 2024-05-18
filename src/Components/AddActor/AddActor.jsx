import React, { useContext, useEffect, useState } from "react";
import styles from "./AddActor.module.css";
import { ActorContext } from "../../Context/ActorContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function AddActor() {
  const { addActor } = useContext(ActorContext);
  const [actorData, setActorData] = useState({
    name: "",
    age: "",
    image: "",
    overview: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActorData({ ...actorData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addActor(actorData);
      toast.success("Actor Added Successfully");
      //console.log(response);
      // Handle success and error messages
    } catch (error) {
      console.error("Error adding actor:", error);
      // Handle error message
    }
  };

  return (
    <>
      <title>Add Actor</title>

      <div className={styles.container}>
        <h1>Add Actor</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={actorData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={actorData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="image">Image:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={actorData.image}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="overview">Overview:</label>
            <textarea
              id="overview"
              name="overview"
              value={actorData.overview}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Add Actor</button>
        </form>
        <Link to="/">Back to Home</Link>
      </div>
    </>
  );
}
