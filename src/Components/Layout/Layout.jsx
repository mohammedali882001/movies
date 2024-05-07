import React from "react";
import styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout({ userData, setUserData }) {
  return (
    <>
      <div className="cotainer mb-5">
        <Navbar userData={userData} setUserData={setUserData} />
      </div>
      <div className=" container ">
        <Outlet />
      </div>
      <div className="container mt-5">
        <Footer />
      </div>
    </>
  );
}
