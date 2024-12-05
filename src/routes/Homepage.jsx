import Footer from "../components/Home/Footer";
import Welcome from "../components/Home/Welcome";
import Navbar from "../components/navbar/Navbar";
import About from "./About";

// Deslizamineto solo debe funcionar en desktop mas no en mobile
const HomePage = () => {
  return (
    <div>
      <Welcome />
      <About />
    </div>
  );
};

export default HomePage;
