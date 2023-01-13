import "./Register.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import AttachImage from "../../components/Attach Image/AttachImage";
import React, { useState } from "react";

function Register() {
  const [savePicture, setSavePicture] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      role: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Must be 5 characters or more")
        .max(15, "Must be less than 15 characters")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .max(15, "Must be less than 15 characters")
        .matches(
          /^.*(?=.*\d)((?=.*[a-zA-Z]){1}).*$/,
          "Password must contain atleast one letter and one number"
        )
        .required("Required"),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref("password")], "Password does not match")
        .required("Required"),
      role: Yup.string()
        .oneOf(["admin", "user"], "Select Role")
        .required("Required"),
      phoneNumber: Yup.string()
        .min(10, "Must be 10 characters or more")
        .max(12, "Must be 12 characters or less")
        .matches(/^[0-9]{10,12}$/, "Must be in digit")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}api/v1/register`,
        values,
        headers: {
          apiKey: process.env.REACT_APP_APIKEY,
        },
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
          passwordRepeat: values.passwordRepeat,
          role: values.role,
          profilePictureUrl: savePicture,
          phoneNumber: values.phoneNumber,
        },
      })
        .then((res) => {
          console.log(res);
          alert("Your account is registered. Log in to access Foodieasy.");
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
          alert("Registration failed. Please try again!");
        });
    },
  });
  return (
    <>
      <Container className="login-container">
        <Container className="register-container">
          <h5 className="text-center">Register Account</h5>
          <form onSubmit={formik.handleSubmit}>
            <div className="input-label">Name</div>
            <input
              className="form-control"
              id="name"
              name="name"
              type="text"
              placeholder="Enter Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="no-input">{formik.errors.name}</div>
            ) : null}

            <div className="mt-10 mb-8 input-label">Email</div>
            <input
              className="form-control"
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="no-input">{formik.errors.email}</div>
            ) : null}

            <div className="mt-10 mb-8 input-label">Password</div>
            <input
              className="form-control"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />

            {formik.touched.password && formik.errors.password ? (
              <div className="no-input">{formik.errors.password}</div>
            ) : null}

            <div>Confirm Password</div>
            <input
              className="form-control"
              id="passwordRepeat"
              name="passwordRepeat"
              type="password"
              placeholder="Confirm password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordRepeat}
            />
            {formik.touched.passwordRepeat && formik.errors.passwordRepeat ? (
              <div className="no-input">{formik.errors.passwordRepeat}</div>
            ) : null}
            <div>Role</div>
            <select
              className="form-select"
              id="role"
              name="role"
              component="select"
              multiple={false}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            <div>Phone Number</div>
            <input
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              placeholder="Enter phone number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="no-input">{formik.errors.phoneNumber}</div>
            ) : null}

            <div>Profile Picture (JPG/PNG/JPEG)</div>
            <AttachImage onChange={(value) => setSavePicture(value)} />

            <Button className="submit-btn" type="submit" value="Register">
              Register
            </Button>
          </form>
        </Container>

        <div className="bottom-container text-center">
          <p>
            Have an account?{" "}
            <span>
              <a href="/" className="bottom-hyperlink">
                Sign in here.
              </a>
            </span>
          </p>
        </div>
      </Container>

      <div className="footer footer-before text-center text-light">
        © All Rights Reserved 2023. Created by <b>Safira Paramita Mustamsir</b>.
      </div>
    </>
  );
}

export default Register;
