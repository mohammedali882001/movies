import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import styles from "./MovieDetails.module.css";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
export default function MovieDetails() {
  const [movies, setMovies] = useState(null);
  let { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiTW9oYW1tZWQyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI0NjMxNTk3Yy0yMTAwLTRmOWYtOTRlMS01MDE1MzVmNzc3NzUiLCJqdGkiOiI2MDUxODY4YS1lMDk5LTQzOWItOWNkMC05YmJlNjRkOWJjNDIiLCJleHAiOjE3MTUwODUwMTAsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzQ5NTEvIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.e2h4NAJSWPDPFdE1ZFbyDhHmsmXRCwO2Yy9QVaQ8ueE"; // Replace with your actual token
  const token = localStorage.getItem("userToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let GetIsFavorite = async () => {
    await axiosInstance
      .get(`FavMovie/${id}`, config)
      .then((res) => {
        if (res.data.isSuccess) {
          // console.log(res.data);
          setIsFavorite(true);
        } else {
          // console.log(res.data);
          setIsFavorite(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let AddMovieToFavorite = () => {
    axiosInstance.post(`FavMovie/${id}`, null, config).then((res) => {
      if (res.data.isSuccess) {
        setIsFavorite(true);
        // toggleFavorite();
        // console.log(res.data);
        toast.success(res.data.data, { duration: 1000 });
      } else {
        setIsFavorite(false);
        // toggleFavorite();
        // console.log(res.data);
      }
    });
  };

  let DeleteMovieFromFavorite = () => {
    axiosInstance.delete(`FavMovie/${id}`, config).then((res) => {
      if (res.data.isSuccess) {
        setIsFavorite(false);
        // console.log(res.data);
        toast.error(res.data.data, { duration: 1000 });
      } else {
        setIsFavorite(true);
        // console.log(res.data);
      }
    });
  };

  let getMovieData = () => {
    axiosInstance.get(`Movie/${id}`).then((res) => {
      // Assuming 5 is the ID of the series
      if (res.data.isSuccess) {
        setMovies(res.data.data);
        console.log(res.data.data);
      } else {
        setMovies(null);
      }
      // console.log(res.data.data);
    });
  };

  useEffect(() => {
    getMovieData();
    GetIsFavorite();
  }, []);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Add logic to update favorite status in the backend
  };

  //////
  // let GetIsFavorite2 = async () => {
  //   try {
  //     const token = "YOUR_ACCESS_TOKEN"; // Replace with your actual token
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };

  //     const response = await axiosInstance.get("FavSeries/series/5", config);

  //     if (response.data) {
  //       console.log(response.data);
  //     } else {
  //       console.log("No data received.");
  //     }
  //   } catch (error) {
  //     console.log("Error:", error.message);
  //   }
  // };

  return (
    <>
      {movies && (
        <div className="container mt-5 p-5">
          <div className="row">
            <div className="col-md-4">
              <img
                src={movies.posterImage}
                className="img-fluid rounded h-100"
                alt={movies.title}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <div className="head d-flex align-items-center justify-content-between ">
                  <h2 className={`card-title ${styles.title}`}>
                    {movies.title}
                  </h2>
                  {isFavorite ? (
                    <span
                      className={`favorite-icon cursor-pointer ${
                        isFavorite ? "favorited" : ""
                      }`}
                      onClick={DeleteMovieFromFavorite}
                    >
                      ❤️
                    </span>
                  ) : (
                    <>
                      <span
                        className={`favorite-icon cursor-pointer ${
                          isFavorite ? "favorited" : ""
                        }`}
                        onClick={AddMovieToFavorite}
                      >
                        🤍
                      </span>
                    </>
                  )}
                </div>

                <div>
                  <strong className={styles.overView}>Overview</strong>
                  <p className={styles.description}>{movies.description}</p>
                </div>
                <hr />

                <div className="d-flex justify-content-start">
                  <div className="me-5">
                    <strong className={styles.overView}>Released Date </strong>{" "}
                    <div className={styles.description}>
                      {movies.createdYear}
                    </div>
                  </div>
                  <div>
                    <strong className={styles.overView}>Duration </strong>{" "}
                    <div className={styles.description}>
                      {movies.lengthMinutes}
                    </div>
                  </div>
                </div>
                <hr />
                <p className="card-text d-inline">
                  <strong className={styles.overView}>Director </strong>
                  <h3 className={styles.description}>{movies.directorName}</h3>
                </p>

                <div className="d-flex justify-content-end">
                  <button
                    className={`btn btn-primary ${styles.watchNowButton}`}
                  >
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
