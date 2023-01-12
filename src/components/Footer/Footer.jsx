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
                <ul className="footer-ul">
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
                <ul className="footer-ul">
                  <li>FAQ</li>
                  <li>Subscriptions</li>
                  <li>How Foodieasy Works</li>
                  <li>Cookie Preferences</li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Recipes</h4>
                <ul className="footer-ul">
                  <li>Main Course</li>
                  <li>Snacks</li>
                  <li>Dessert</li>
                  <li>Beverages</li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Follow Us</h4>
                <div className="social-media">
                  <ul className="footer-ul">
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
          </Container>
        </div>
      ) : null}
    </>
  );
}

export default Footer;
