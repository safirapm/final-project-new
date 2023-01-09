import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "../MyFavorite/MyFavorite.css";
import { Col, Row, Card, Button, Container, Carousel } from "react-bootstrap";

function Favorites() {
  const [myFavorite, setMyFavorite] = useState();

  const getLikeFoods = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}api/v1/like-foods`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: process.env.REACT_APP_APIKEY,
        },
      })
      .then((res) => {
        setMyFavorite(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getLikeFoods();
  }, []);

  const handleLikes = (id, isLiked) => {
    if (!isLiked) {
      axios
        .post(`${process.env.REACT_APP_BASEURL}api/v1/like`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: process.env.REACT_APP_APIKEY,
          },
          data: {
            foodId: id.foodId,
          },
        })
        .then((res) => {
          console.log(res);
          getLikeFoods();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_BASEURL}api/v1/unlike`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: process.env.REACT_APP_APIKEY,
          },
          data: {
            foodId: id.foodId,
          },
        })
        .then((response) => {
          console.log(response);
          getLikeFoods();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <section>
        <div className="bg-food">
          <h2 className="mt-5 fw-bold text-center">My Favorite</h2>
          <div className="img-center">
            <div className="grid-img">
              {myFavorite &&
                myFavorite.map((liked, i) => {
                  return (
                    <div className="card-myFavorite" key={i}>
                      <img
                        src={liked.imageUrl}
                        className="mt-3 card-img-top mx-auto"
                        alt={liked.name}
                      />
                      <div className="card-body-myFavorite">
                        <div className="card-body">
                          <h5 className="card-title text-center">
                            {liked.name}
                          </h5>
                          <div className="d-flex gap-2 mt-2">
                            <i
                              class="bi bi-card-list"
                              style={{ color: "#0d6efd", fontSize: "16px" }}
                            ></i>
                            <p className="text-desc">
                              <span style={{ fontWeight: "bold" }}>Desc:</span>{" "}
                              {liked.description}
                            </p>
                          </div>
                          <div
                            className="d-flex gap-2"
                            style={{ marginTop: "-20px" }}
                          >
                            <i
                              className="bi bi-card-checklist"
                              style={{ color: "#0d6efd", fontSize: "16px" }}
                            ></i>
                            <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                              Ingredients:
                              {liked.ingredients.map((ingredient, index) => {
                                return (
                                  <span
                                    className="text-ingredients"
                                    key={index}
                                  >
                                    {(index ? ", " : " ") + ingredient}
                                  </span>
                                );
                              })}
                            </p>
                          </div>
                        </div>
                        <div
                          className=""
                          style={{
                            borderTop: "1px solid #9b9fb3",
                            width: "100%",
                          }}
                        >
                          <small className="text-muted">
                            <Link to={`/rating/${liked.id}`}>
                              <i
                                className="fa-solid fa-star m-1"
                                style={{ color: `gold` }}
                              ></i>
                            </Link>
                            {liked.rating}
                          </small>
                          <small className="text-muted">
                            <i
                              className="bi bi-heart-fill"
                              style={{ color: `${liked.isLiked ? "red" : ""}` }}
                              onClick={() =>
                                handleLikes(liked.id, liked.isLiked)
                              }
                            ></i>
                            {liked.totalLikes}
                          </small>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Favorites;
