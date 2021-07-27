import "./register.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { Modal, notification } from "antd";

import InputField from "../InputField";

function Register(props) {
  const { isRegisterVisible, toggleRegister } = props;
  const [userList, setUserList] = useState([]);

  const getUserList = () => {
    axios("http://localhost:8000/userlist")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const registerSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Username is too short!")
      .max(15, "Username is too long!")
      .required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(2, "Password is too short!")
      .max(15, "Password is too long!")
      .required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });
  const handleUserSubmit = (values, { resetForm }) => {
    axios
      .post("http://localhost:8000/userlist", {
        id: userList.length + 1,
        username: values.username,
        password: values.password,
        email: values.email,
      })
      .then((res) => {
        getUserList();
        resetForm();
        openSuccessNotification();
      })
      .catch((err) => {
        console.log(err.response);
      });
    // axios.delete("http://localhost:8000/userlist/7");
  };
  const openSuccessNotification = () => {
    notification["success"]({
      message: "Register successfully",
    });
  };
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  useEffect(() => {
    getUserList();
  }, []);
  return (
    <Modal closable={false} visible={isRegisterVisible} footer={null}>
      <div className="register">
        <h1>Register</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleUserSubmit}
        >
          {({ errors, touched }) => (
            <Form className="register__form">
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
                name="email"
                component={InputField}
                placeholder="Email..."
                type="email"
              />
              {errors.email && touched.email ? (
                <div className="error-box">{errors.email}</div>
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
              <FastField
                name="confirmPassword"
                component={InputField}
                placeholder="Confirm password..."
                type="password"
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className="error-box">{errors.confirmPassword}</div>
              ) : null}
              <div className="btn-group">
                <button type="reset" onClick={toggleRegister}>
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

export default Register;