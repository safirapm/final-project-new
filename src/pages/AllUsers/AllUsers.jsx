import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Formik, useField } from "formik";
import * as Yup from "yup";
import { Container, Button } from "react-bootstrap";
import { getAllUsers } from "../../API";
import avatarImage from "../../img/avatar.webp";
import "./AllUsers.css";

function AllUsers() {
  const [allUser, setAllUser] = useState([]);

  const onImageError = (e) => {
    e.target.src = avatarImage;
  };

  useEffect(() => {
    getAllUsers().then((result) => {
      setAllUser(result);
    });
  }, []);

  const onSubmit = (values) => {
    if (
      window.confirm(
        "Are you sure you want to change the role? You can still update it in the future."
      )
    ) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}api/v1/update-user-role/${values.id}`,
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
          alert("Role has been updated.");
          window.location.reload();
          setAllUser();
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
      <Container className="user-container">
        <h2 className="text-center">The Foodieasy Community</h2>
        <Container className="foodcard1-all pd-10">
          {allUser.map((user) => {
            return (
              <Container key={user.id} className="foodcard1-all">
                <div className="foodcard1-box d-flex flex-column">
                  <div className="foodcard1-img">
                    <img
                      src={
                        user.profilePictureUrl
                          ? user.profilePictureUrl
                          : avatarImage
                      }
                      alt={user.name}
                      onError={onImageError}
                    />
                  </div>
                  <div className="allusers-box-text">
                    <h4 className="text-capitalize">{user.name}</h4>
                    <p>
                      <i className="bi bi-envelope-at-fill"></i> {user.email}
                    </p>
                    <p className="text-capitalize">
                      <i className="bi bi-file-person-fill"></i> {user.role}
                    </p>
                    <p>
                      <i className="bi bi-phone-vibrate-fill"></i>{" "}
                      {user.phoneNumber}
                    </p>
                  </div>
                  <div className="card-footer allusers-footer">
                    <Button
                      className="allusers-button"
                      data-bs-toggle="modal"
                      data-bs-target={`#staticBackdrop_${user.id}`}
                    >
                      Update Role
                    </Button>
                  </div>
                </div>

                <div
                  className="modal fade"
                  id={`staticBackdrop_${user.id}`}
                  tabIndex="-1"
                  aria-labelledby="modal-title"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-md">
                    <div className="modal-content">
                      <div className="modal-body">
                        <Formik
                          initialValues={{
                            role: user.role,
                            id: user.id,
                          }}
                          enableReinitialize={true}
                          validationSchema={Yup.object({
                            role: Yup.string().oneOf(
                              ["admin", "user"],
                              "Invalid Job Type"
                            ),
                          })}
                          onSubmit={onSubmit}
                        >
                          <Container className="alluser-modal">
                            <div
                              className="text-center"
                              style={{
                                fontFamily: "'General Sans', sans-serif",
                                paddingBottom: "5px",
                              }}
                            >
                              <h3>Profile</h3>
                            </div>
                            <div className="alluser-box">
                              <img
                                src={
                                  user.profilePictureUrl
                                    ? user.profilePictureUrl
                                    : avatarImage
                                }
                                alt={user.name}
                                onError={onImageError}
                              />
                              <h5 className="card-title text-center mt-2">
                                {user.name}
                              </h5>
                              <Form>
                                <MySelect label="Role" name="role">
                                  <option value="">Select a Role</option>
                                  <option value="admin">Admin</option>
                                  <option value="user">User</option>
                                </MySelect>

                                <div className="text-end">
                                  <Button className="save-button" type="submit">
                                    Save Changes
                                  </Button>
                                  <Button
                                    className="cancel-button"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </Form>
                            </div>
                          </Container>
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            );
          })}
        </Container>
      </Container>
    </>
  );
}

export default AllUsers;
