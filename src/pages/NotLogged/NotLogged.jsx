import "./NotLogged.css";
import { Container, Button } from "react-bootstrap";
import imgNotLogged from "../../img/notlogged.gif";

function NotLogged() {
  return (
    <>
      <Container className="not-logged">
        <div className="not-logged-box">
          <img
            src={imgNotLogged}
            alt="Not Logged"
            style={{ maxWidth: "65%" }}
          />
          <h4>
            Uh oh! You are not logged in to
            <br />
            your Foodieasy account.
          </h4>

          <Button className="submithome-button" href="/">
            Login Here
          </Button>
          <div></div>
        </div>
      </Container>
    </>
  );
}

export default NotLogged;
