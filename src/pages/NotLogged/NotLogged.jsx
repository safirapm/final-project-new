import "./NotLogged.css";
import { Container } from "react-bootstrap";
import imgNotLogged from "../../img/notlogged.gif";

function NotLogged() {
  return (
    <>
      <Container className="not-logged">
        <div className="not-logged-box">
          <img
            src={imgNotLogged}
            alt="Not Logged"
            style={{ maxWidth: "25%" }}
          />
          <h1>
            Uh oh! You are not logged in to
            <br />
            your Foodieasy account.
          </h1>
          <p>
            Please{" "}
            <a className="href-p" href="/">
              log in here
            </a>
            .
          </p>
          <div></div>
        </div>
      </Container>
    </>
  );
}

export default NotLogged;
