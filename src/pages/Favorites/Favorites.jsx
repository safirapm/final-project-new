import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";
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
          getLikeFoods();
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
          getLikeFoods();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Container className="favorite-section">
        <h2>My Favorite</h2>
        <Container className="foodcard1-all pd-10">
          {myFavorite &&
            myFavorite.map((food) => {
              return (
                <Container key={food.id} className="foodcard1-all">
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
                          style={{ color: "yellow" }}
                        ></i>{" "}
                        {food.rating} |{" "}
                        <i
                          className="bi bi-heart-fill"
                          style={{
                            color: `${food.isLike ? "#DD4A48" : "#F5EEDC"}`,
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
      </Container>
    </>
  );
}

export default Favorites;
