import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
// import "./assets/css/all.min.css";
// import "./assets/css/main.css";
// import "./assets/css/style.css";
// import "./assets/js/script.js";
// import "./js/fav.js";
// import "./js/script.js";
// import "./js/showfav.js";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
