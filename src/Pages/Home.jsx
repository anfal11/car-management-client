import About from "../Components/About";
import Services from "../Components/Services";
import Banner from "./Banner";

const Home = () => {
    return (
        <div id="/">
            <Banner></Banner>
            <About></About>
            <Services></Services>
        </div>
    );
};

export default Home;