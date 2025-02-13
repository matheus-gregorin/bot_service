
// Css
import "../pages/css/Lists.css"

// Components
import Filter from "../components/Filter"

// Hooks
import { useEffect, useState } from "react"
import CardList from "../components/CardList"
import Swal from "sweetalert2"
import ApiService from "../useCases/fetchUseCase"

//Url
const url = process.env.REACT_APP_API_URL

const Lists = () => {

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
                console.log("DATA AQUI", data)
                setLists(data.lists)

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
        
        fetchData();

    }, [token, uriSearch, paginator]);

    const HandleSearch = ( newPaginator ) => {

        const api = new ApiService(url)

        api.get(uriSearch + newPaginator)
          .then(response => {
            
            // Failed
            if(!response.success){
              Swal.fire({
                title: 'Erro!',
                text: response.message,
                icon: 'error',
                confirmButtonText: 'Fechar'
              });
              return
            }

            console.log(response, uriSearch + newPaginator)
            setLists(response.lists)
            setPaginator(newPaginator)
          });
        return

    }

    return (
        <div className="lists">
            <div className="lists-container">

                <Filter setUriSearch={setUriSearch} paginator={paginator} type={"lists"} setData={setLists}/>

                <CardList lists={lists}/>

                <div className="search-container">
                    <button disabled={ (paginator <= 10) ? true : false } onClick={ ()=> HandleSearch( paginator - 10 ) } > Anterior </button>  
                    <button disabled={ (paginator >= Object.keys(lists).length) ? true : false } onClick={ ()=> HandleSearch( paginator + 10 ) } > Próximo </button>
                </div>

            </div>
        </div>
    )
}

export default Lists