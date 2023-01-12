import { Container, ListGroup, Badge, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";
import { useFormik } from "formik";
import * as Yup from "yup";

function Details() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      rating: Yup.number().min(0).max(5).required("Required"),
      review: Yup.string().required("Required"),
    }),
  });

  return (
    <>
      <Container className="detailpage-container">
        <h2 className="text-capitalize">{allDetail && allDetail.name}</h2>
        <Container className="detail-container">
          <div className="detail-box">
            <div className="detail-info">
              <div className="detail-img">
                <img
                  src={allDetail && allDetail.imageUrl}
                  alt={allDetail && allDetail.name}
                />
              </div>
              <div className="detail-text">
                <h3 className="text-capitalize">
                  {allDetail && allDetail.name}
                </h3>
                <p>
                  <i
                    className="bi bi-blockquote-left"
                    style={{ color: "#4B6587" }}
                  ></i>{" "}
                  {allDetail && allDetail.description}
                </p>
                <p>
                  <i
                    className="bi bi-card-checklist"
                    style={{ color: "#4B6587" }}
                  ></i>{" "}
                  {allDetail &&
                    allDetail.ingredients.map((m, index) => {
                      return <span key={index}>{(index ? ", " : "") + m}</span>;
                    })}
                </p>
              </div>
            </div>
            <div className="card-footer detail-footer">
              <div className="detail-footer-2">
                <div className="detail-icons">
                  <i
                    className="bi bi-star-fill"
                    style={{ color: "#FFCC00" }}
                  ></i>{" "}
                  {allDetail && allDetail.rating} |{" "}
                  <i
                    className="bi bi-heart-fill"
                    style={{ color: "#DD4A48" }}
                  ></i>{" "}
                  {allDetail && allDetail.totalLikes}
                </div>
                <div className="text-end details-rate">
                  <Button
                    type="button"
                    className="rate-button"
                    data-bs-toggle="modal"
                    data-bs-target={`#rating${allDetail && allDetail.id}`}
                  >
                    Rate Food
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-start">
            <h3 className="fs-4">Reviews</h3>
          </div>
          <Container className="listgroup-container">
            {rating &&
              rating.map((rate) => {
                return (
                  <ListGroup as="ol" key={rate.id} className="listgroup-items">
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="listgroup-img">
                        <img
                          src={rate.user.profilePictureUrl}
                          alt={rate.user.name}
                        />
                      </div>
                      <div className="ms-2 me-auto">
                        <div
                          className="fw-bold"
                          style={{ fontFamily: "'General Sans', sans-serif" }}
                        >
                          {rate.user.name}
                        </div>
                        <div className="listgroup-review">{rate.review}</div>
                      </div>
                      <Badge
                        bg="none"
                        pill
                        style={{ color: "#444", fontSize: "14px" }}
                      >
                        <i
                          className="bi bi-star-fill"
                          style={{ color: "#FFCC00" }}
                        ></i>{" "}
                        {rate.rating}
                      </Badge>
                    </ListGroup.Item>
                  </ListGroup>
                );
              })}
          </Container>

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
                  <Container>
                    <div className="text-center">
                      <h2 className="fs-3">Rate This Food</h2>
                      <img
                        src={allDetail && allDetail.imageUrl}
                        className="img-fluid"
                        alt={allDetail && allDetail.name}
                        style={{ marginBottom: "10px", borderRadius: "8px" }}
                      />
                    </div>
                    <form onSubmit={(e) => handleSubmit(e, allDetail.id)}>
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
                        className="form-control mb-2"
                        id="rating"
                        placeholder="Rate this food (1-5)"
                      />
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
                      <div
                        className="text-center mt-3"
                        style={{ width: "100%" }}
                      >
                        <Button type="submit" className="addfood-button">
                          Submit
                        </Button>
                      </div>
                    </form>
                  </Container>
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
