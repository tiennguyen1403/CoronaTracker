import "./login.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { Modal, notification } from "antd";

import InputField from "../InputField";

function Login(props) {
  const { isLoginVisible, toggleLogin } = props;
  const [userList, setUserList] = useState([]);

  const getUserList = () => {
    axios("https://corona--tracker.herokuapp.com/userlist")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Username is too short!")
      .max(15, "Username is too long!")
      .required("Required"),
    password: Yup.string()
      .min(2, "Password is too short!")
      .max(15, "Password is too long!")
      .required("Required"),
  });
  const handleUserSubmit = (values, { resetForm }) => {
    if (userList.length === 0) {
      if (values.username === "admin" && values.password === "admin") {
        localStorage.setItem("isLoggedIn", true);
        resetForm();
        openSuccessNotification();
        toggleLogin();
        return true;
      }
    }
    userList.map((userItem) => {
      if (
        values.username === userItem.username &&
        values.password === userItem.password
      ) {
        localStorage.setItem("isLoggedIn", true);
        resetForm();
        openSuccessNotification();
        toggleLogin();
        return true;
      }
      return null;
    });
    return false;
  };
  const openSuccessNotification = () => {
    notification["success"]({
      message: "Login successfully",
    });
  };
  const initialValues = {
    username: "",
    password: "",
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <Modal closable={false} visible={isLoginVisible} footer={null}>
      <div className="login">
        <h1>Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleUserSubmit}
        >
          {({ errors, touched }) => (
            <Form className="login__form">
              <FastField
                name="username"
                component={InputField}
                placeholder="Username..."
                type="text"
              />
              {errors.username && touched.username ? (
                <div className="error-box">{errors.username}</div>
              ) : null}
              <FastField
                name="password"
                component={InputField}
                placeholder="Password..."
                type="password"
              />
              {errors.password && touched.password ? (
                <div className="error-box">{errors.password}</div>
              ) : null}
              <div className="btn-group">
                <button type="reset" onClick={toggleLogin}>
                  Cancel
                </button>
                <button type="submit">Submit</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

export default Login;
