import "./Footer.css";
import { Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <>
      {localStorage.getItem("token") ? (
        <div className="footer">
          <Container className="footer-container">
            <Row className="footer-row">
              <div className="footer-col">
                <h4>Foodieasy</h4>
                <ul className="footer-ul text-light">
                  <li>
                    <a href="/about">About Us</a>
                  </li>
                  <li>Our Services</li>
                  <li>Privacy Policy</li>
                  <li>Affiliate Program</li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Get Help</h4>
                <ul className="footer-ul text-light">
                  <li>FAQ</li>
                  <li>Subscriptions</li>
                  <li>How Foodieasy Works</li>
                  <li>Cookie Preferences</li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Recipes</h4>
                <ul className="footer-ul text-light">
                  <li>Main Course</li>
                  <li>Snacks</li>
                  <li>Dessert</li>
                  <li>Beverages</li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Follow Us</h4>
                <div className="social-media">
                  <ul className="footer-ul text-light">
                    <li>
                      <i className="bi bi-facebook"></i>
                    </li>
                    <li>
                      <i className="bi bi-twitter"></i>
                    </li>
                    <li>
                      <i className="bi bi-instagram"></i>
                    </li>
                    <li>
                      <i className="bi bi-github"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </Row>
            <div className="footer-name text-center text-light">
              © All Rights Reserved 2023. Created by{" "}
              <b>Safira Paramita Mustamsir</b>.
            </div>
          </Container>
        </div>
      ) : null}
    </>
  );
}

export default Footer;
