import React from "react";
import styles from "./DirectorSlider.module.css";
import Slider from "react-slick";
import { axiosInstance } from "../apis/config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DirectorSlider({ DirectorId }) {
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

  const [media, setMedia] = useState([]);

  useEffect(() => {
    getAllMedia();
  }, [DirectorId]);

  function getAllMedia() {
    axiosInstance.get(`Director/${DirectorId}`).then((res) => {
      console.log(res.data.data);
      if (res.data.isSuccess) {
        const { series, movies } = res.data.data;
        const allMedia = [...series, ...movies];
        setMedia(allMedia);
      } else {
        setMedia([]);
      }
    });
  }

  return (
    <>
      {media !== null && (
        <Slider {...settings}>
          {media.map((m) => (
            <div key={m.id}>
              <div className="me-3">
                <img
                  className="w-100"
                  height={200}
                  src={m.posterImage}
                  alt={m.title}
                />
              </div>
              <h2 className="h6 pt-2">{m.title}</h2>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
}
