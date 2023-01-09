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
            Foodieasy is the most trusted cooking brand in the world. The
            longtime home to the Bon Appétit and Gourmet recipe archives,
            Epicurious has grown to include original recipes from the Epicurious
            Test Kitchen, daily advice from the cooking-savvy Epicurious staff,
            and some of the fastest-growing food video series on YouTube. What
            started in 1995 as a website is now also an iOS app, a vibrant
            YouTube channel, a series of newsletters, a Facebook Group and, in
            2018, a book ("COOK90: The 30-Day Plan for Faster, Healthier,
            Happier Meals").
          </p>
          <h3>Our Team</h3>
          <img className="aboutimg" src={imgPicXAbout1} />
          <p style={{ display: "flex", justifyContent: "center" }}>
            It started with three, and now we're with with thousands of new
            adventurers.
          </p>
        </div>
      </Container>
    </>
  );
}

export default AboutUs;
