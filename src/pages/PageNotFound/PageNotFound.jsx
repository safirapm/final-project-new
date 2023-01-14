import { Container, Button } from "react-bootstrap";
import "./PageNotFound.css";
import notFound from "../../img/notfound.gif";

function PageNotFound() {
  return (
    <>
      <Container className="notfound-container">
        <div className="notfound-box">
          <div className="notfound-text text-center">
            <img
              src={notFound}
              alt="Page Not Found"
              style={{ width: "100%", maxWidth: "65%" }}
            />
            <h4>Uh Oh...</h4>
            <p>
              The page you are looking for might have been removed,
              <br />
              had its name changed, or is temporarily unavailable.
            </p>

            <Button className="submithome-button" href="/">
              Return to Foodieasy
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default PageNotFound;
