import "./Register.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

function Register() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      role: "",
      profilePictureUrl: "",
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
      profilePictureUrl: Yup.string().required("Required"),
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
          profilePictureUrl: values.profilePictureUrl,
          phoneNumber: values.phoneNumber,
        },
      })
        .then((res) => {
          console.log(res);
          alert("Your account is registered. Log in to access Foodieasy.");
          window.location.reload();
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
        <div className="register-box">
          <div>Join to become a part of us!</div>
          <p>Already have an account? Log in here.</p>
        </div>
        <Container className="input-container">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-8 input-label mobile-login">Name</div>
            <input
              className="register-input"
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
              className="register-input"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="no-input">{formik.errors.email}</div>
            ) : null}

            <div className="mt-10 mb-8 input-label">Password</div>
            <input
              className="register-input"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />

            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}

            <div>Confirm Password</div>
            <input
              className="register-input"
              id="passwordRepeat"
              name="passwordRepeat"
              type="password"
              placeholder="Confirm password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordRepeat}
            />
            {formik.touched.passwordRepeat && formik.errors.passwordRepeat ? (
              <div>{formik.errors.passwordRepeat}</div>
            ) : null}
            <div>Role</div>
            <select
              className="register-input"
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

            <div>Profile Picture URL</div>
            <input
              className="register-input"
              id="profilePictureUrl"
              name="profilePictureUrl"
              type="url"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.profilePictureUrl}
            />
            {formik.touched.profilePictureUrl &&
            formik.errors.profilePictureUrl ? (
              <div>{formik.errors.profilePictureUrl}</div>
            ) : null}
            <div>Phone Number</div>
            <input
              className="register-input"
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div>{formik.errors.phoneNumber}</div>
            ) : null}

            <input className="register-btn" type="submit" value="Register" />
          </form>
        </Container>
      </Container>
    </>
  );
}

export default Register;
