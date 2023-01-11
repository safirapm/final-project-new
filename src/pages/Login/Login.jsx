import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, Form } from "react-bootstrap";
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
        .catch((err) => {
          const showError = err.response.data.status_message;
          alert(showError);
        });
    },
  });

  return (
    <>
      <Container className="login-container">
        <div className="login-box">
          <Container className="input-container">
            <h2 style={{ textShadow: "#F5EEDC 1px 0 10px" }}>
              Welcome to{" "}
              <span
                style={{
                  fontWeight: "bold",
                  fontFamily: "'Poppins', sans-serif",
                  color: "#4B6587",
                  textShadow: "#F5EEDC 1px 0 10px",
                }}
              >
                Foodieasy
              </span>
            </h2>
            <p>
              Are you new? Come{" "}
              <span>
                <a href="/register">join us</a>
              </span>{" "}
              now!
            </p>
            <h2>Sign in here</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-8 input-label mobile-login" htmlFor="email">
                Email
              </div>
              <input
                className="login-input"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="foodieasy@gmail.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="no-input">{formik.errors.email}</div>
              ) : null}
              <div
                className="mt-10 mb-8 input-label mobile-login"
                htmlFor="password"
              >
                Password
              </div>
              <input
                className="login-input"
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
                  <div key={`${type}`} className="mt-10 show-password">
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
                className="btn btn-light signin-btn"
              >
                Log In
              </button>
            </form>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default Login;
