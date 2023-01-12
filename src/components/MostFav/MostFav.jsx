import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./MostFav.css";

function MostFav() {
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

  return (
    <>
      <Container className="mostfav-card">
        {allFoods &&
          allFoods
            .sort((b, a) => a.totalLikes - b.totalLikes)
            .splice(0, 3)
            .map((food) => {
              return (
                <Container key={food.id} md={4}>
                  <div className="mostfav-box">
                    <div className="mostfav-img">
                      <img src={food.imageUrl} alt={food.name} />
                    </div>
                    <a key={food.id} href={`/details/${food.id}`}>
                      <div className="mostfav-name text-capitalize">
                        {food.name}
                      </div>
                    </a>
                  </div>
                </Container>
              );
            })}
      </Container>
    </>
  );
}

export default MostFav;
