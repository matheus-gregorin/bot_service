
// Css
import Kpis from "../components/Kpis"
import "../pages/css/Home.css"

// Components

// Hooks
import { useEffect, useState } from "react"

//Url
const url = process.env.REACT_APP_API_URL

const Home = () => {

    //Token
    const token = sessionStorage.getItem('x-t')

    const [lists, setLists] = useState([])

    // Função que puxa todos as ultimas 10 listas
    useEffect(() => {

        const fetchData = async () => {
            try {

                const response = await fetch(url + '/api/list/all?order_by=desc', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
                });

                const data = await response.json();
                setLists(data.lists)

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
        
        fetchData();

    }, [token]);

    return (
        <div className="home">
            <div className="home-container">

                <Kpis lists={lists} />

                <div> 2222 </div>

            </div>
        </div>
    )
}

export default Home