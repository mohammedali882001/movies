import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../apis/config";

export default function Register() {
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);
  let [msgError, setMsgError] = useState("");

  const HandleRegister = async (values) => {
    setIsLoading(true);

    const response = await axiosInstance
      .post(`Account/register`, values)
      .then((res) => {
        if (res.data && res.data.isSuccess) {
          setIsLoading(false);
          navigate("/login");
        } else {
          setIsLoading(false);
          // console.log(res.data.data[0].description);
          setMsgError(res.data.data[0].description);
        }
      });
  };

  let Validation = Yup.object({
    firstName: Yup.string()
      .required("First Name is Required")
      .min(3, "First Name Must Be greater than 3")
      .max(10, "First Name Must Be less than 10"),
    lastName: Yup.string()
      .required("Last Name is Required")
      .min(3, "Last Name Must Be greater than 3")
      .max(10, "Last Name Must Be less than 10"),
    userName: Yup.string()
      .required("User Name is Required")
      .min(3, "User Name Must Be greater than 3")
      .max(10, "User Name Must Be less than 10"),
    yourFavirotePerson: Yup.string()
      .required("your Favorite Person Name is Required")
      .min(3, "your Favorite Person Name Must Be greater than 3")
      .max(10, "your Favorite Person Name Must Be less than 10"),
    email: Yup.string()
      .required("email is Required")
      .email("plz enter correct email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "The password must be at least 8 characters long and contain at least one alphabet character, one digit, and one special character among @$!%*?&."
      ),
  });

  let formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      yourFavirotePerson: "",
    },
    onSubmit: HandleRegister,
    validationSchema: Validation,
  });

  return (
    <>
      <div className=" w-75 mx-mx-auto py-4 ">
        <h3>Register Now : </h3>

        <form onSubmit={formik.handleSubmit}>
          {msgError.length > 0 ? (
            <div className=" alert  alert-danger ">{msgError}</div>
          ) : null}

          <label htmlFor="firstName">First Name :</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" form-control mb-2 "
          ></input>
          {formik.errors.firstName && formik.touched.firstName ? (
            <div className=" alert  alert-danger ">
              {formik.errors.firstName}
            </div>
          ) : null}

          <label htmlFor="lastName">Last Name :</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" form-control mb-2 "
          ></input>
          {formik.errors.lastName && formik.touched.lastName ? (
            <div className=" alert  alert-danger ">
              {formik.errors.lastName}
            </div>
          ) : null}

          <label htmlFor="userName">User Name :</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" form-control mb-2 "
          ></input>
          {formik.errors.userName && formik.touched.userName ? (
            <div className=" alert  alert-danger ">
              {formik.errors.userName}
            </div>
          ) : null}

          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" form-control mb-2 "
          ></input>
          {formik.errors.email && formik.touched.email ? (
            <div className=" alert  alert-danger ">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" form-control mb-2 "
          ></input>
          {formik.errors.password && formik.touched.password ? (
            <div className=" alert  alert-danger ">
              {formik.errors.password}
            </div>
          ) : null}

          <label htmlFor="yourFavirotePerson">Your Favorite Person :</label>
          <input
            type="text"
            id="yourFavirotePerson"
            name="yourFavirotePerson"
            value={formik.values.yourFavirotePerson}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" form-control mb-2 "
          ></input>
          {formik.errors.yourFavirotePerson &&
          formik.touched.yourFavirotePerson ? (
            <div className=" alert  alert-danger ">
              {formik.errors.yourFavirotePerson}
            </div>
          ) : null}

          {isLoading ? (
            <button type="button" className=" btn bg-main text-white ">
              <i className="  fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.dirty && formik.isValid)}
              type="submit"
              className="  btn bg-main text-white "
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
