
// Css
import "../pages/css/Home.css"

// Components
import Kpis from "../components/Kpis"

// Hooks
import Tags from "../components/Tags"

const Home = () => {

    return (
        <div className="home">
            <div className="home-container">

                <Kpis />

                <Tags />

            </div>
        </div>
    )
}

export default Home