import { Container, Button } from "react-bootstrap";
import imgNotLogged from "../../img/notlogged.gif";

function NotAdmin() {
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
            Uh oh! You are not authorized to
            <br />
            enter this page.
          </h4>

          <Button className="submithome-button" href="/">
            Return to Foodieasy
          </Button>
        </div>
      </Container>
    </>
  );
}

export default NotAdmin;
