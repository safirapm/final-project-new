import "./Home.css";
import { Container } from "react-bootstrap";
import FoodCard from "../../components/Food Card/FoodCard";
import MostFav from "../../components/MostFav/MostFav";
import ImgPic1Section1 from "../../img/pic4-section1.jpeg";
import ImgPic2Section1 from "../../img/pic5-section1.jpeg";
import ImgPic3Section1 from "../../img/pic6-section1.webp";
function Home() {
  return (
    <>
      <Container className="home-background">
        <div className="hero-header">
          <div className="text-header">
            <h1 className="h1-header">
              cooking is <span className="h1-food">easier</span> with{" "}
              <span className="h1-food">foodieasy</span>.
            </h1>
            <p className="p-header">
              Explore recipes from all over the world and
              <br /> share your own to people across the globe.
            </p>
          </div>
        </div>

        <Container className="section-1">
          <h1>What's New</h1>
          <Container className="section1-all">
            <div className="section1-box">
              <div className="section1-img">
                <img src={ImgPic1Section1} alt="Hokagay - Anime Food" />
              </div>
              <div className="section1-box-text">
                <h4>Making Anime Food into Reality with HOKAGAY</h4>
                <p>
                  Anime's global popularity has given creativity for creators to
                  share their love towards anime. One of them is Stacey Nikolay,
                  also known as Hokagay...{" "}
                  <span className="section1-readmore">Read More</span>
                </p>
              </div>
            </div>
            <div className="section1-box">
              <div className="section1-img">
                <img src={ImgPic2Section1} alt="Chicken Tikka Masala" />
              </div>
              <div className="section1-box-text">
                <h4>Chicken Tikka Masala is Not from India?</h4>
                <p>
                  Chicken Tikka Masala is a widely loved dish among people all
                  over the world. However, there's a misconception of this food
                  is from India, when it is...{" "}
                  <span className="section1-readmore">Read More</span>
                </p>
              </div>
            </div>
            <div className="section1-box">
              <div className="section1-img">
                <img src={ImgPic3Section1} alt="Russian Culinary" />
              </div>
              <div className="section1-box-text">
                <h4>Food Travels #1: The Underrated Russian Culinary</h4>
                <p>
                  Amidst the cold weather, Pelmeni, or Russian dumplings dipped
                  in yogurt sauce will be an ideal food to eat.{" "}
                  <span className="section1-readmore">Read More</span>
                </p>
              </div>
            </div>
          </Container>
        </Container>

        <Container fluid className="section-2">
          <h2>
            with <span className="section2-span">Foodieasy</span>, you can:
          </h2>
          <h3>explore, share, and like recipes.</h3>
          <h3>it's easy, isn't it? (no pun intended)</h3>
        </Container>

        <Container
          fluid
          className="section-1 section-3"
          style={{ marginTop: "0" }}
        >
          <div className="text-foodcard" style={{ marginTop: "10px" }}>
            <h1>Most Favorite Foods</h1>
          </div>
          <MostFav />
        </Container>

        <Container className="section-1">
          <div className="text-foodcard">
            <h1>Explore All Recipes</h1>
          </div>
          <FoodCard />
        </Container>
      </Container>
    </>
  );
}

export default Home;
