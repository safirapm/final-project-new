import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
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
        alert("An error has occurred. Please reload the page.");
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
      <Container className="foodcard1-all pd-10">
        {allFoods &&
          allFoods.map((food) => {
            return (
              <Container key={food.id} className="foodcard1-all">
                <div className="foodcard1-box d-flex flex-column">
                  <div className="foodcard1-img">
                    <img src={food.imageUrl} alt={food.name} />
                  </div>
                  <div className="foodcard1-box-text">
                    <a key={food.id} href={`/details/${food.id}`}>
                      <h4 className="text-capitalize">{food.name}</h4>
                    </a>
                    <p>{food.description}</p>
                    <span className="card-symbols">
                      <i
                        className="bi bi-star-fill"
                        style={{ color: "#FFCC00" }}
                      ></i>{" "}
                      {food.rating} |{" "}
                      <i
                        className="bi bi-heart-fill"
                        style={{
                          color: `${food.isLike ? "#DD4A48" : "#C8C6C6"}`,
                          cursor: "pointer",
                        }}
                        onClick={() => handleLikes(food.id, food.isLike)}
                      ></i>{" "}
                      {food.totalLikes}
                    </span>
                  </div>
                </div>
              </Container>
            );
          })}
      </Container>
    </>
  );
}

export default FoodCard;
