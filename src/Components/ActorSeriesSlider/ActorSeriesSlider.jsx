import React from "react";
import styles from "./ActorSeriesSlider.module.css";
import Slider from "react-slick";
import { axiosInstance } from "../apis/config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function ActorSeriesSlider({ ActorId }) {
  const [series, setSeries] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  function getAllSeries() {
    axiosInstance
      .get(`ActorSeries/actor/${ActorId}`)
      .then((res) => {
        console.log(res.data.data);
        if (res.data.isSuccess) {
          setSeries(res.data.data);
        } else {
          setSeries([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getAllSeries();
  }, []);

  return (
    <>
      <br></br>
      {series !== null && (
        <Slider {...settings}>
          {series.map((s) => (
            <div key={s.seriesId}>
              <div className="me-3">
                <img
                  className="w-100"
                  height={200}
                  src={s.posterImage}
                  alt={s.title}
                />
              </div>
              <h2 className="h6 pt-2">{s.title}</h2>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
}
