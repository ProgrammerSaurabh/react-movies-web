import { Container } from "react-bootstrap";
import RecommendedMovies from "../components/RecommendedMovies";
import MovieCarousel from "../components/MovieCarousel";
import SubHeader from "../components/SubHeader";

function Home() {
  return (
    <Container fluid className="my-2">
      <SubHeader />
      <MovieCarousel />
      <RecommendedMovies />
    </Container>
  );
}

export default Home;
