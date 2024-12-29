
// Css
import "../pages/css/Home.css"

// Components
import Filter from "../components/Filter"

// Hooks
import { useEffect, useState } from "react"

//Url
const url = process.env.REACT_APP_API_URL

const Home = () => {

    //Token
    const token = sessionStorage.getItem('x-t')

    const [paginator, setPaginator] = useState(10)
    const [uriSearch, setUriSearch] = useState('/api/list/all?order_by=desc&paginator=')

    const [lists, setLists] = useState([])

    // Função que puxa todos as ultimas 10 listas
    useEffect(() => {

        const fetchData = async () => {
            try {

                const response = await fetch(url + uriSearch + paginator, {
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

    }, [token, uriSearch, paginator]);

    console.log(lists)

    return (
        <div className="home">
            <div className="home-container">

                <Filter setUriSearch={setUriSearch} paginator={paginator} type={"lists"} setData={setLists}/>

                { lists.map((list) => ( <h2 key={ list.uuid }> { list.status } </h2> )) }

            </div>
        </div>
    )
}

export default Home