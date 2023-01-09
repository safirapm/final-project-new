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
                  <li>
                    <a href="#">Our Services</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Affiliate Program</a>
                  </li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Get Help</h4>
                <ul className="footer-ul">
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                  <li>
                    <a href="#">Subscriptions</a>
                  </li>
                  <li>
                    <a href="#">How Foodieasy Works</a>
                  </li>
                  <li>
                    <a href="#">Cookie Preferences</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Recipes</h4>
                <ul className="footer-ul">
                  <li>
                    <a href="#">Main Course</a>
                  </li>
                  <li>
                    <a href="#">Snacks</a>
                  </li>
                  <li>
                    <a href="#">Dessert</a>
                  </li>
                  <li>
                    <a href="#">Beverages</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Follow Us</h4>
                <div className="social-media">
                  <ul className="footer-ul">
                    <li>
                      <a href="#">
                        <i className="bi bi-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-github"></i>
                      </a>
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
