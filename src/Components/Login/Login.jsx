import React, { useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ SaveUserData }) {
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  let HandleLogin = (values) => {
    setIsLoading(true);
    axios
      .post(`http://localhost:5212/api/Account/Login`, values)
      .then((response) => {
        if (response.data.isSuccess) {
          setIsLoading(false);
          //console.log(response.data.isSuccess);

          localStorage.setItem("userToken", response.data.data.token);
          SaveUserData();
          //console.log(response.data);
          navigate("/");
        } else {
          setIsLoading(false);
          //console.log(response.data.data.value);
          setErrorMsg(response.data.data.value);
          //console.log(response.data.data[0].description)
        }
      })
      .catch((err) => {
        //setErrorMsg(`${err.response.data.param}: ${err.response.data.msg}`)
      });
  };
  //   if(data.message==='success')
  //   {
  //     localStorage.setItem('userToken',data.token);
  //     SaveUserData();
  //     navigate('/');
  //   }
  //   //console.log(values);
  // };

  let Validation = Yup.object({
    userName: Yup.string()
      .required("User Name is Required")
      .min(3, "User Name Must Be greater than 3")
      .max(10, "User Name Must Be less than 10"),
    // .email("plz enter correct email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "The password must be at least 8 characters long and contain at least one alphabet character, one digit, and one special character among @$!%*?&."
      ),
  });

  let formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: HandleLogin,
    validationSchema: Validation,
  });
  return (
    <>
      <div className=" w-75 mx-mx-auto py-4 ">
        <h3>Login Now : </h3>

        {errorMsg.length > 0 ? (
          <div className="alert alert-danger">{errorMsg}</div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="userName">UserName : </label>
          <input
            type="userName"
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

          <label htmlFor="password">Password : </label>
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
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}
