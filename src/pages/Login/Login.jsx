import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, Form } from "react-bootstrap";
import imgLogo from "../../img/logo.webp";
import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required"),
    }),

    onSubmit: (values) => {
      axios
        .post(`${process.env.REACT_APP_BASEURL}api/v1/login`, values, {
          headers: {
            apiKey: `${process.env.REACT_APP_APIKEY}`,
          },
          data: {
            email: values.email,
            password: values.password,
          },
        })
        .then((res) => {
          const token = res.data.token;
          console.log(token);
          localStorage.setItem("token", token);

          const role = res.data.user.role;
          localStorage.setItem("role", role);

          const name = res.data.user.name;
          localStorage.setItem("name", name);

          window.location.href = "/";
        })
        .catch((error) => {
          console.error(error);
          alert("Invalid email and/or password.");
        });
    },
  });

  return (
    <>
      <Container className="login-container">
        <div className="login-box">
          <Container className="input-container">
            <div className="logo-container">
              <img src={imgLogo} alt="Foodieasy" />
              <h3 className="text-center">Foodieasy</h3>
            </div>
            <h5 className="text-center">Log In</h5>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-1" htmlFor="email">
                Email
              </div>
              <input
                className="form-control"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Type your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="no-input">{formik.errors.email}</div>
              ) : null}
              <div
                className="mt-2 mb-1 input-label mobile-login"
                htmlFor="password"
              >
                Password
              </div>
              <input
                className="form-control"
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="Type your password"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="no-input">{formik.errors.password}</div>
              ) : null}
              <>
                {["Show Password"].map((type) => (
                  <div key={`${type}`} className="mt-2 show-password">
                    <Form.Check
                      type="checkbox"
                      id={`${type}`}
                      label={`${type}`}
                      onClick={togglePassword}
                    />
                  </div>
                ))}
              </>
              <button
                type="submit"
                value="Login"
                className="btn btn-primary submit-btn"
              >
                Log In
              </button>
            </form>
          </Container>
        </div>

        <div className="bottom-container text-center">
          <p>
            Are you new?{" "}
            <span>
              <a href="/register" className="bottom-hyperlink">
                Sign up here.
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

export default Login;
