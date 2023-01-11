import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Formik, useField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Container, Col, Card, Button, Modal } from "react-bootstrap";
import "./FoodList.css";

function FoodList() {
  const [allFoods, setAllFoods] = useState([]);

  const getFood = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}api/v1/foods`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        },
      })
      .then((res) => {
        setAllFoods(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("An error has occurred. Please reload the page.");
      });
  };

  useEffect(() => {
    getFood();
  }, []);

  const onSubmit = (values) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}api/v1/update-food/${values.id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: process.env.REACT_APP_APIKEY,
      },
      data: {
        name: values.name,
        description: values.description,
        imageUrl: values.imageUrl,
        ingredients: values.ingredients,
      },
    })
      .then((response) => {
        console.log(response);
        getFood();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this recipe? This change cannot be undone."
      )
    ) {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_BASEURL}api/v1/delete-food/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: process.env.REACT_APP_APIKEY,
        },
      })
        .then((response) => {
          console.log(response);
          getFood();
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

  return (
    <>
      <Container className="favorite-section pd-10">
        <h2>Food List</h2>
        <Container className="foodcard1-all">
          {allFoods &&
            allFoods.map((food) => {
              return (
                <Container className="foodcard1-all" key={food.id}>
                  <div className="foodcard1-box">
                    <div className="foodcard1-img">
                      <img src={food.imageUrl} />
                    </div>
                    <div className="foodcard1-box-text">
                      <a key={food.id} href={`/details/${food.id}`}>
                        <h4 className="text-capitalize">{food.name}</h4>
                      </a>
                      <span
                        className="card-symbols"
                        style={{ marginLeft: "1px" }}
                      >
                        <i
                          className="bi bi-star-fill"
                          style={{ color: "#FFCC00" }}
                        ></i>{" "}
                        {food.rating} |{" "}
                        <i
                          className="bi bi-heart-fill"
                          style={{
                            color: "#DD4A48",
                          }}
                        ></i>{" "}
                        {food.totalLikes}
                      </span>
                    </div>
                    <div className="card-footer foodlist-button">
                      <div className="btn-group" role="group">
                        <Button
                          className="update-button"
                          data-bs-toggle="modal"
                          data-bs-target={`#staticBackdrop_${food.id}`}
                        >
                          Update
                        </Button>
                        <Button
                          className="delete-button"
                          onClick={() => handleDelete(food.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal fade"
                    id={`staticBackdrop_${food.id}`}
                    tabIndex="-1"
                    aria-labelledby="modal-title"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-md">
                      <div className="modal-content">
                        <div className="modal-body">
                          <Formik
                            initialValues={{
                              name: food.name,
                              description: food.description,
                              imageUrl: food.imageUrl,
                              ingredients: food.ingredients,
                              id: food.id,
                            }}
                            validationSchema={Yup.object({
                              name: Yup.string().required("Required"),
                              description: Yup.string().required("Required"),
                              imageUrl: Yup.string().required("Required"),
                            })}
                            onSubmit={onSubmit}
                          >
                            <div className="container-md my-3">
                              <div className="text-center">
                                <h2>Update Food</h2>
                                <img
                                  src={food.imageUrl}
                                  alt={food.name}
                                  className="food-card-image"
                                />
                              </div>
                              <div className="row justify-content-center">
                                <div className="col-md-12">
                                  <Form>
                                    <MyTextInput
                                      label="Food Name"
                                      name="name"
                                      type="text"
                                      placeholder="Food name"
                                    />

                                    <MyTextInput
                                      label="Food Description"
                                      name="description"
                                      type="text"
                                      placeholder="Food Description"
                                    />

                                    <MyTextInput
                                      label="Food Image URL"
                                      name="imageUrl"
                                      type="url"
                                      placeholder="Food Image URL"
                                    />
                                    <div className="mb-3">
                                      <label>Food Ingredients</label>
                                      <FieldArray name="ingredients">
                                        {(fieldArrayProps) => {
                                          const { push, remove, form } =
                                            fieldArrayProps;
                                          const { values } = form;
                                          const { ingredients } = values;
                                          return (
                                            <div>
                                              {ingredients.map(
                                                (ingredient, index) => (
                                                  <div
                                                    key={index}
                                                    className="d-flex input-group mb-1"
                                                  >
                                                    <Field
                                                      name={`ingredients[${index}]`}
                                                      placeholder="Food Ingredients"
                                                      className="form-control"
                                                    />
                                                    {index > 0 && (
                                                      <button
                                                        type="button"
                                                        className="btn  btn-outline-warning "
                                                        onClick={() =>
                                                          remove(index)
                                                        }
                                                      >
                                                        -
                                                      </button>
                                                    )}
                                                    <button
                                                      type="button"
                                                      className="btn btn-outline-warning "
                                                      onClick={() => push("")}
                                                    >
                                                      +
                                                    </button>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          );
                                        }}
                                      </FieldArray>
                                    </div>

                                    <div className="text-center">
                                      <button
                                        type="submit"
                                        className="btn bgcolor1 text-light btn-warning shadow"
                                      >
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
              );
            })}
        </Container>
      </Container>
    </>
  );
}

export default FoodList;
