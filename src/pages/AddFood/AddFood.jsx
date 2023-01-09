import React from "react";
import { Formik, Form, useField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddFood = ({ onSuccess }) => {
  const onSubmit = (values, { resetForm }) => {
    axios({
      method: "post",
      url: "https://api-bootcamp.do.dibimbing.id/api/v1/create-food",
      data: {
        name: values.name,
        description: values.description,
        imageUrl: values.imageUrl,
        ingredients: values.ingredients,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: process.env.REACT_APP_APIKEY,
      },
    })
      .then((response) => {
        alert(`${response.data.message}`);
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
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  return (
    <section>
      <Formik
        initialValues={{
          name: "",
          description: "",
          imageUrl: "",
          ingredients: [""],
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
                                  className="btn  btn-outline-warning "
                                  onClick={() => remove(index)}
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
                          ))}
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
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Formik>
    </section>
  );
};

export default AddFood;

// import axios from "axios";
// import * as Yup from "yup";
// import { useFormik } from "formik";
// import React, { useState } from "react";
// import AttachImage from "../../components/Attach Image/AttachImage";

// const AddFood = () => {
//   const [ingredients, setIngredients] = useState([""]);
//   const [SavePicture, setSavePicture] = useState("");

//   const handleAddIngredients = () => {
//     setIngredients([...ingredients, ""]);
//   };

//   const handleDeleteIngredients = (index) => {
//     const values = [...ingredients];
//     values.splice(index, 1);
//     setIngredients(values);
//   };

//   const handleChangeIngredients = (index, value) => {
//     setIngredients((previous) => {
//       const values = [...previous];
//       values[index] = value;
//       return values;
//     });
//   };

//   const formAddFoods = useFormik({
//     initialValues: {
//       name: "",
//       description: "",
//       ingredients: [],
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required("Required"),
//       description: Yup.string().required("Required"),
//     }),
//     onSubmit: (values) => {
//       axios({
//         method: "post",
//         url: `${process.env.REACT_APP_BASEURL}/api/v1/create-food`,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem(`token`)}`,
//           apiKey: `${process.env.REACT_APP_APIKEY}`,
//         },
//         data: {
//           name: values.name,
//           description: values.description,
//           imageUrl: SavePicture,
//           ingredients: ingredients,
//         },
//       })
//         .then((res) => {
//           console.log(res);
//           window.location.href = "/foods";
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     },
//   });

//   return (
//     <>
//       <div className="bg-addFoods">
//         <form onSubmit={formAddFoods.handleSubmit} className="box-addFoods">
//           <h2 className="">Add Foods</h2>
//           <div className="">
//             <input
//               id="name"
//               name="name"
//               type="text"
//               className="add-input"
//               onChange={formAddFoods.handleChange}
//               onBlur={formAddFoods.handleBlur}
//               value={formAddFoods.values.name}
//               placeholder="name"
//             />
//             {formAddFoods.touched.name && formAddFoods.errors.name ? (
//               <div>{formAddFoods.errors.name}</div>
//             ) : null}
//           </div>

//           <div className="">
//             <input
//               id="description"
//               name="description"
//               type="text"
//               className="add-input"
//               onChange={formAddFoods.handleChange}
//               onBlur={formAddFoods.handleBlur}
//               value={formAddFoods.values.description}
//               placeholder="description"
//             />
//           </div>

//           {/* <div class="">
//           <input
//             id="imageUrl"
//             name="imageUrl"
//             type="url"
//             className="add-input"
//             onChange={formAddFoods.handleChange}
//             onBlur={formAddFoods.handleBlur}
//             value={formAddFoods.values.imageUrl}
//             placeholder="imageUrl"
//           />
//         </div> */}

//           <div>
//             {ingredients.map((ingredient, index) => {
//               return (
//                 <div className="d-flex gap-2" key={index}>
//                   <input
//                     id="ingredients"
//                     name="ingredients"
//                     type="text"
//                     className="add-input"
//                     onBlur={formAddFoods.handleBlur}
//                     placeholder="ingredients"
//                     value={ingredient}
//                     onChange={(event) =>
//                       handleChangeIngredients(index, event.target.value)
//                     }
//                   />
//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     style={{ fontSize: "12px" }}
//                     onClick={() => handleAddIngredients()}
//                   >
//                     Add
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-danger"
//                     style={{ fontSize: "12px" }}
//                     onClick={() => handleDeleteIngredients(index)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="input-file">
//             <div>
//               <AttachImage onChange={(value) => setSavePicture(value)} />
//             </div>
//           </div>

//           <a href="/">
//             <button type="submit" className="btn btn-primary">
//               Submit
//             </button>
//           </a>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddFood;
