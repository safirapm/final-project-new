import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Col, Card, Button, Modal } from "react-bootstrap";
import "./FoodCard.css";

function FoodCard() {
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
        alert("Oops! Please reload the page.");
      });
  };

  useEffect(() => {
    getFood();
  }, []);

  const handleLikes = (id, isLike) => {
    if (!isLike) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}api/v1/like`,
        data: {
          foodId: id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: process.env.REACT_APP_APIKEY,
        },
      })
        .then((res) => {
          console.log(res);
          getFood();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}api/v1/unlike`,
        data: {
          foodId: id,
        },
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

  return (
    <>
      {allFoods &&
        allFoods.map((food) => {
          return (
            <Col key={food.id} md={4} className="food-card">
              <Card
                className="food-card-2 flex-column"
                style={{ width: "20rem" }}
              >
                <Card.Img
                  variant="top"
                  src={food.imageUrl}
                  className="mx-auto"
                  style={{
                    height: "340px",
                    objectFit: "cover",
                  }}
                />
                <Card.ImgOverlay className="card-overlay card-textbox-1 p-2"></Card.ImgOverlay>
                <Card.ImgOverlay className="card-overlay card-textbox-2 p-2">
                  <Card.Title className="card-name text-capitalize fs-6 mb-1">
                    <h4>{food.name}</h4>
                    <span
                      className="card-symbols"
                      style={{ marginLeft: "1px" }}
                    >
                      <i className="bi bi-star-fill"></i> {food.rating} |{" "}
                      <i
                        className="bi bi-heart-fill"
                        style={{
                          color: `${food.isLike ? "#DD4A48" : "#F5EEDC"}`,
                          cursor: "pointer",
                        }}
                        onClick={() => handleLikes(food.id, food.isLike)}
                      ></i>{" "}
                      {food.totalLikes}
                    </span>{" "}
                  </Card.Title>
                  <a
                    key={food.id}
                    href={`/details/${food.id}`}
                    className="card-name-2"
                  >
                    <i className="bi bi-info-circle-fill"></i>
                  </a>
                </Card.ImgOverlay>
              </Card>
            </Col>
          );
        })}
    </>
  );
}

export default FoodCard;
