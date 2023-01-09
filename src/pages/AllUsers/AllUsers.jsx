import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { getAllUsers } from "../../API";
import "./AllUsers.css";

function AllUsers() {
  const [allUser, setAllUser] = useState([]);

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    getAllUsers().then((result) => {
      setAllUser(result);
    });
  }, []);

  return (
    <>
      <div className="user-header">
        <div className="user-textbox">
          <h1>Get to know the members of Food Journal</h1>
        </div>
      </div>
      <Container fluid className="container-foodcard">
        <Row xs={1} md={3} lg={4} mt={3} mx-lg={4} mx={4}>
          {allUser.map((user) => {
            return (
              <Col md={4} key={user.id} className="food-card">
                <Card
                  style={{ width: "18rem" }}
                  className="food-card-2  flex-column"
                >
                  <Card.Img
                    variant="top"
                    className="mx-auto"
                    style={{
                      height: "300px",
                      objectFit: "cover",
                    }}
                    src={user.profilePictureUrl}
                    alt={user.name}
                  />
                  <Card.Body style={{ backgroundColor: "#a24f38" }}>
                    <Card.Title className="user-cardtitle">
                      {user.name}
                    </Card.Title>
                    <Card.Text className="user-cardtext">
                      <i class="bi bi-envelope-at-fill"></i> {user.email}
                      <br />
                      <i class="bi bi-file-person-fill"></i>{" "}
                      {capitalizeFirst(`${user.role}`)}
                      <br />
                      <i class="bi bi-phone-vibrate-fill"></i>{" "}
                      {user.phoneNumber}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default AllUsers;
