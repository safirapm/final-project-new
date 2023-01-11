import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Formik, useFormik, useField } from "formik";
import * as Yup from "yup";
import { Container, Button } from "react-bootstrap";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState();
  const getProfile = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}api/v1/user`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
    })
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((error) => {
        console.log(error);
        alert("An error has occurred. Please reload the page.");
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  const onSubmit = (values) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}api/v1/update-profile`,
      data: {
        name: values.name,
        email: values.email,
        profilePictureUrl: values.profilePictureUrl,
        phoneNumber: values.phoneNumber,
      },
      headers: {
        apiKey: process.env.REACT_APP_APIKEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log(response);
        axios({
          method: "post",
          url: `${process.env.REACT_APP_BASEURL}api/v1/update-user-role/${
            profile && profile.id
          }`,
          data: {
            role: values.role,
          },
          headers: {
            apiKey: process.env.REACT_APP_APIKEY,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => {
            console.log(response);
            localStorage.setItem("role", values.role);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="mb-3">
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input form-control" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="mb-3">
        <label htmlFor={props.id || props.name}>{label}</label>
        <select className="form-select" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  return (
    <>
      <Container className="profile-container">
        <h2>My Profile</h2>
        <Container className="profile-box">
          <div className="profile-data">
            <div className="profile-img">
              <img src={profile && profile.profilePictureUrl} />
            </div>
            <div className="profile-text">
              <h3>{profile && profile.name}</h3>
              <p>
                <i class="bi bi-envelope-at-fill"></i>{" "}
                {profile && profile.email}
              </p>
              <p>
                <i class="bi bi-phone-vibrate-fill"></i>{" "}
                {profile && profile.phoneNumber}
              </p>
              <p>
                <i class="bi bi-file-person-fill text-capitalize"></i>{" "}
                {profile && profile.role}
              </p>
            </div>
            <div className="card-footer profile-footer">
              <Button
                className="profile-button"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </Container>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="modal-title"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-body">
                <Formik
                  initialValues={{
                    name: profile && profile.name,
                    email: profile && profile.email,
                    profilePictureUrl: profile && profile.profilePictureUrl,
                    phoneNumber: profile && profile.phoneNumber,
                    role: profile && profile.role,
                  }}
                  enableReinitialize={true}
                  validationSchema={Yup.object({
                    name: Yup.string()
                      .min(5, "Must be 5 characters or more")
                      .max(20, "Must be 20 characters or less"),
                    email: Yup.string().email("Invalid email address"),
                    profilePictureUrl: Yup.string(),
                    phoneNumber: Yup.string()
                      .min(10, "Must be 10 characters or more")
                      .max(12, "Must be 12 characters or less")
                      .matches(/^[0-9]{10,12}$/, "Must be in digit"),
                    role: Yup.string().oneOf(
                      ["admin", "general"],
                      "Invalid Job Type"
                    ),
                  })}
                  onSubmit={onSubmit}
                >
                  <div className="container-md my-3">
                    <div className="text-center">
                      <h2>My Profile</h2>
                    </div>
                    <div className="row justify-content-center my-3">
                      <div className="col-md-12">
                        <img
                          src={profile && profile.profilePictureUrl}
                          className="img-fluid user-card-image mx-auto d-block"
                          alt={profile && profile.name}
                        />
                        <Form>
                          <MyTextInput label="Name" name="name" type="text" />

                          <MyTextInput
                            label="Email Address"
                            name="email"
                            type="email"
                          />

                          <MyTextInput
                            label="Profile Picture URL"
                            name="profilePictureUrl"
                            type="url"
                          />

                          <MyTextInput
                            label="Phone Number"
                            name="phoneNumber"
                            type="tel"
                          />

                          {localStorage.getItem("role") === "admin" ? (
                            <MySelect label="Role" name="role">
                              <option value="">Select a Role</option>
                              <option value="admin">Admin</option>
                              <option value="general">General</option>
                            </MySelect>
                          ) : null}

                          <div className="text-center">
                            <button type="submit" className="btn btn-dark">
                              Save
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Profile;
