import React from "react";
import { useState } from "react";
import { Formik, Form, useField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Container } from "react-bootstrap";
import AttachImage from "../../components/Attach Image/AttachImage";
import "./AddFood.css";

const AddFood = ({ onSuccess }) => {
  const [savePicture, setSavePicture] = useState("");

  const onSubmit = (values, { resetForm }) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}api/v1/create-food`,
      data: {
        name: values.name,
        description: values.description,
        imageUrl: savePicture,
        ingredients: values.ingredients,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: process.env.REACT_APP_APIKEY,
      },
    })
      .then((response) => {
        alert(`${response.data.message}`);
        window.location.href = "/food-list";
        resetForm({ values: "" });
        onSuccess();
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
          <div className="text-error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  return (
    <>
      <Container fluid className="addfood-page">
        <Formik
          initialValues={{
            name: "",
            imageUrl: savePicture,
            description: "",
            ingredients: [""],
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
          })}
          onSubmit={onSubmit}
        >
          <Container className="addfood-container">
            <div className="text-center">
              <h2>Add Food</h2>
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

                  <div className="form-label">
                    Upload Picture (JPG/PNG/JPEG)
                  </div>
                  <AttachImage
                    name="imageUrl"
                    onChange={(value) => setSavePicture(value)}
                  />

                  <div className="mb-3">
                    <label>Food Ingredients</label>
                    <FieldArray name="ingredients">
                      {(fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps;
                        const { values } = form;
                        const { ingredients } = values;
                        return (
                          <div>
                            {ingredients.map((ingredient, index) => (
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
                                    className="minus-button btn btn-outline-primary"
                                    onClick={() => remove(index)}
                                  >
                                    -
                                  </button>
                                )}
                                <button
                                  type="button"
                                  className="plus-button btn btn-outline-primary"
                                  onClick={() => push("")}
                                >
                                  +
                                </button>
                              </div>
                            ))}
                          </div>
                        );
                      }}
                    </FieldArray>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="addfood-button btn btn-primary"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </Container>
        </Formik>
      </Container>
    </>
  );
};

export default AddFood;
