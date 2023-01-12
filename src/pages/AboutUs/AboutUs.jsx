import { Container } from "react-bootstrap";
import imgPicXAbout1 from "../../img/picx-about1.jpeg";
import "./AboutUs.css";

function AboutUs() {
  return (
    <>
      <div className="intro-1"></div>
      <Container className="about-us">
        <div className="brand-about-us">
          <h1>Welcome to Foodieasy</h1>
        </div>
        <div className="about-us-text">
          <h3>Who are we?</h3>
          <p>
            Foodieasy is a community where you connect with people through their
            love with various meals. Built in the middle of the pandemic, this
            platform is created for people all over the world to travel with
            foods at home.
          </p>
          <h3>Our Team</h3>
          <img
            className="aboutimg"
            src={imgPicXAbout1}
            alt="Foodieasy's Team"
          />
          <p style={{ display: "flex", justifyContent: "center" }}>
            It started with the three of us, and now we're with with thousands
            travelers and more thousands to come.
          </p>
        </div>
      </Container>
    </>
  );
}

export default AboutUs;
