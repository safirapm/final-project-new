import React, { useState, useEffect } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import Logout from "../Log Out/Logout";
import "./Navbar.css";
import imgLogo from "../../img/logo.webp";

function NavHome() {
  const [navbar, setNavbar] = useState(false);

  const changeNavbar = () => {
    if (window.scrollY >= 30) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);
  }, []);

  return (
    <>
      {localStorage.getItem("token") ? (
        <Navbar
          fixed="top"
          collapseOnSelect
          expand="lg"
          bg="light"
          className={navbar ? "navbar-active" : "navbar"}
        >
          <Container fluid>
            <Navbar.Brand href="/" className="brand">
              <img src={imgLogo} alt="Foodieasy" style={{ maxWidth: "30px" }} />{" "}
              foodieasy
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-lg"
              aria-labelledby="offcanvasNavbarLabel-expand-lg"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id="offcanvasNavbarLabel-expand-lg"
                  className="offcanvas-title"
                >
                  foodieasy
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3"></Nav>
                <Nav className="navbar-font">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/favorites">Favorites</Nav.Link>
                  <Nav.Link href="/about">About Us</Nav.Link>
                  {localStorage.getItem("role") === "admin" ? (
                    <Nav.Link href="/add-food">Add Food</Nav.Link>
                  ) : null}
                  <Nav.Link href="/food-list">Food List</Nav.Link>
                  <NavDropdown
                    align="end"
                    title={localStorage.getItem("name")}
                    id="collasible-nav-dropdown"
                    className="nav-dropdown"
                  >
                    <NavDropdown.Item href="/profile">
                      Edit Profile
                    </NavDropdown.Item>
                    {localStorage.getItem("role") === "admin" ? (
                      <NavDropdown.Item href="/all-users">
                        All Users
                      </NavDropdown.Item>
                    ) : null}
                    <NavDropdown.Item href="#">Contact Us</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <Logout />
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ) : null}
    </>
  );
}

export default NavHome;
