import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Rating = () => {
  let { foodID } = useParams();

  const [food, setFood] = useState("");
  const [rating, setRating] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/food/${foodID}`,
      headers: {
        apiKey: process.env.REACT_APP_APIKEY,
      },
    })
      .then((res) => {
        console.log(res);
        setFood(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [foodID]);

  const getRating = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/food-rating/${foodID}`,
      headers: {
        apiKey: process.env.REACT_APP_APIKEY,
      },
    })
      .then((res) => {
        console.log(res);
        setRating(res.data.data);
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
      url: `${process.env.REACT_APP_BASEURL}/api/v1/rate-food/${foodID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: process.env.REACT_APP_APIKEY,
      },
      data: {
        rating: values.rating,
        review: values.review,
      },
    })
      .then((res) => {
        console.log(res);
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
      <div style={{ padding: "120px" }}>
        <div
          className="card mb-3 mx-auto  shadow"
          style={{ maxWidth: `540px` }}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={food && food.imageUrl}
                className="img-fluid m-2 shadow"
                style={{ height: "250px" }}
                alt={food && food.name}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: "26px" }}>
                  {food && food.name}
                </h5>
                <div className="d-flex gap-2 mt-4">
                  <i class="bi bi-card-list" style={{ fontSize: "16px" }}></i>
                  <p className="text-desc" style={{ fontSize: "16px" }}>
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Desc:
                    </span>{" "}
                    {food && food.description}
                  </p>
                </div>
                <div className="d-flex gap-2" style={{ marginTop: "-20px" }}>
                  <i
                    className="bi bi-card-checklist"
                    style={{ color: "#0d6efd", fontSize: "16px" }}
                  ></i>
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                    Ingredients:
                    {food &&
                      food.ingredients.map((i, index) => {
                        return (
                          <span
                            style={{ fontWeight: "normal", fontSize: "16px" }}
                            key={index}
                          >
                            {(index ? ", " : " ") + i}
                          </span>
                        );
                      })}
                  </p>
                </div>
                <p className="card-text">
                  <i
                    className="fa-solid fa-star m-1"
                    style={{ color: `gold` }}
                  ></i>
                  {food && food.rating}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            className="btn-create shadow fw-bold"
            data-bs-toggle="modal"
            data-bs-target={`#rating${food && food.id}`}
          >
            Create Rating
          </button>
        </div>
        <div
          className="modal fade"
          id={`rating${food && food.id}`}
          tabIndex="-1"
          aria-labelledby="modal-title"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-body">
                <form
                  className="box-addFoods"
                  onSubmit={(e) => handleSubmit(e, food.id)}
                >
                  <div className="text-center">
                    <h2
                      style={{
                        color: "#0d6efd",
                        position: "relative",
                        right: "-30px",
                      }}
                    >
                      Create Rating
                    </h2>
                    <h4 className="color1 fw-bolder">
                      {/* {food && food.name} */}
                    </h4>
                  </div>
                  <div
                    style={{ position: "relative", right: "40px" }}
                    className="row gap-4"
                  >
                    <div className="col-md-6">
                      <label htmlFor="inputName" className="form-label">
                        Rating
                      </label>
                      <input
                        value={formik.values.rating}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="number"
                        className="add-input"
                        id="rating"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlfor="inputName" className="form-label">
                        Review
                      </label>
                      <input
                        value={formik.values.review}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        className="add-input"
                        id="review"
                      />
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">
                        Create
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {rating &&
          rating.map((rate) => {
            return (
              <div key={rate.id}>
                <div className="col-6 list-group mt-3 mx-auto  ">
                  <li className="d-flex justify-content-between align-items-start food-card shadow list-group-item">
                    <div className="d-flex gap-3">
                      <img
                        src={rate.user.profilePictureUrl}
                        className="set-img"
                        alt={rate.user.name}
                      />
                      <div className=" ">
                        <div className="fw-bold" style={{ color: "#0d6efd" }}>
                          {rate.user.name}
                        </div>
                        {rate.review}
                      </div>
                    </div>

                    <div>
                      <i
                        className="fa-solid fa-star m-1"
                        style={{ color: `gold` }}
                      ></i>
                      {rate.rating}
                    </div>
                  </li>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Rating;
