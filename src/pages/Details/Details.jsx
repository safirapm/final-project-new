import { Container, Modal, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";
import { useFormik } from "formik";
import * as Yup from "yup";

function Details() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [allDetail, setAllDetail] = useState("");

  const [rating, setRating] = useState();
  const { foodID } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}api/v1/foods/${foodID}`, {
        headers: {
          apiKey: process.env.REACT_APP_APIKEY,
        },
      })
      .then((response) => {
        setAllDetail(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [foodID]);

  const getRating = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}api/v1/food-rating/${foodID}`,
      headers: {
        apiKey: process.env.REACT_APP_APIKEY,
      },
    })
      .then((response) => {
        console.log(response);
        setRating(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRating();
  }, [foodID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = formik.values;
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}api/v1/rate-food/${foodID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: process.env.REACT_APP_APIKEY,
      },
      data: {
        rating: values.rating,
        review: values.review,
      },
    })
      .then((response) => {
        console.log(response);
        getRating();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: {
      rating: "",
      review: "",
    },
    validationSchema: Yup.object({
      rating: Yup.string().required("Required"),
      review: Yup.string().required("Required"),
    }),
  });

  return (
    <>
      <Container className="detailpage-container">
        <Container className="main-detail-container">
          <div className="detail-container">
            <div className="detail-info">
              <img src={allDetail && allDetail.imageUrl} />
              <h3 className="text-capitalize">{allDetail && allDetail.name}</h3>
              <p>
                <i className="bi bi-pen"></i>{" "}
                {allDetail && allDetail.description}
              </p>
              <p>
                <i className="bi bi-cart3"></i>{" "}
                {allDetail &&
                  allDetail.ingredients.map((m, index) => {
                    return <span key={index}>{(index ? ", " : "") + m}</span>;
                  })}
              </p>
            </div>
            <div className="detail-footer">
              <div className="detail-icons">
                <i className="bi bi-star-fill"></i>{" "}
                {allDetail && allDetail.rating} |{" "}
                <i
                  className="bi bi-heart-fill"
                  style={{ color: "#DD4A48" }}
                ></i>{" "}
                {allDetail && allDetail.totalLikes}
              </div>
            </div>
          </div>
          <br />
          <button
            type="button"
            className="btn text-light btn-success shadow d-flex align-items-center py-1"
            data-bs-toggle="modal"
            data-bs-target={`#rating${allDetail && allDetail.id}`}
          >
            Rate Food
          </button>

          <div className="text-start">
            <h3 className="fs-4">Reviews</h3>
          </div>
          {rating &&
            rating.map((rate) => {
              return (
                <div key={rate.id}>
                  <ul className="list-group mt-3">
                    <li className="list-group-item shadow">
                      <div className="d-flex justify-content-start gap-2">
                        <div className="d-flex">
                          <img
                            src={rate.user.profilePictureUrl}
                            className="img-fluid img-profile"
                            alt={rate.user.name}
                          />
                        </div>
                        <div className="d-flex">
                          <div>
                            <p className="fw-bold review-name mb-1">
                              {rate.user.name}
                            </p>
                            <p className="d-flex align-items-center review-name">
                              <i className="ri-star-fill me-1"></i>
                              {rate.rating}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-start review-comment">
                        <p>{rate.review}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })}

          <div
            className="modal fade"
            id={`rating${allDetail && allDetail.id}`}
            tabIndex="-1"
            aria-labelledby="modal-title"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content p-3">
                <div className="modal-body">
                  <div className="text-center">
                    <h2 className="fs-3">Rate This Food</h2>
                    <img
                      src={allDetail && allDetail.imageUrl}
                      className="img-fluid img-food-rate my-3"
                      alt={allDetail && allDetail.name}
                    />
                  </div>
                  <form onSubmit={(e) => handleSubmit(e, allDetail.id)}>
                    <div className="row mb-3">
                      <div className="col-lg-12">
                        <label
                          htmlFor="inputName"
                          className="form-label fw-bold mb-1"
                        >
                          Rating
                        </label>
                        <input
                          value={formik.values.rating}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="number"
                          className="form-control"
                          id="rating"
                          placeholder="Rate this food (1-5)"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-12">
                        <label
                          htmlFor="inputName"
                          className="form-label fw-bold mb-1"
                        >
                          Review
                        </label>
                        <textarea
                          value={formik.values.review}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          className="form-control"
                          id="review"
                          placeholder="Review this food"
                        />
                      </div>
                    </div>
                    <div className="text-start mt-3">
                      <button
                        type="submit"
                        className="btn text-light shadow btn-success"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
}

export default Details;
