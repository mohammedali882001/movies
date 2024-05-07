import React from "react";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <svg viewBox="0 0 960 300">
        <symbol id="s-text">
          <text
            textAnchor="middle"
            x="50%"
            y="50%"
            fontSize="150px"
            text-align="center"
          >
            404
          </text>
        </symbol>
        <g className={styles}>
          <use xlinkHref="#s-text" className={styles.text}></use>
          <use xlinkHref="#s-text" className={styles.text}></use>
          <use xlinkHref="#s-text" className={styles.text}></use>
          <use xlinkHref="#s-text" className={styles.text}></use>
          <use xlinkHref="#s-text" className={styles.text}></use>
        </g>
      </svg>
    </div>
  );
}
