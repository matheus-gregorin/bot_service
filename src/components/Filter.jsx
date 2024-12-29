// Css
import Swal from "sweetalert2"
import ApiService from "../useCases/fetchUseCase"
import "./css/Filter.css"

// Tools
import { AiOutlineSearch } from "react-icons/ai"

//Url
const url = process.env.REACT_APP_API_URL

const Filter = ({ setUriSearch, paginator, type, setData }) => {

  const HandleType = () => {

    switch (type) {

      case 'clients':
        return <div>
          Clients
        </div>

      case 'lists':
        return <div className="filter-list">
          
          <label htmlFor=""> Buscar em ordem decrescente:</label>
          <input type="checkbox" id="desc" />

        </div>

      case 'items':
        return <div>
          Items 
        </div>

      default:
        return <div>
          Filtro indefinido 
        </div>

    }
  }

  const HandleSearch = () => {

    const api = new ApiService(url)

    switch (type) {
      case 'clients':
        console.log('clients')
        return

      case 'lists':

        var uri = '/api/list/all'

        var desc = document.getElementById("desc").checked
        var isFirst = true

        if(desc){
          if(isFirst){
            uri += '?order_by=desc'
            isFirst = false
          }
        }

        if(isFirst){
          setUriSearch(uri + '?paginator=')
          uri += '?paginator=' + paginator
        } else {
          setUriSearch(uri + '&paginator=')
          uri += '&paginator=' + paginator
        }

        api.get(uri)
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

            setData(response.lists)
          });
        return

      case 'items':
        console.log('items')
        return

      default:
        console.log('default')
        return

    }
  }

  return (
    <div className="filter">
      <h2> Pesquisar <AiOutlineSearch /> </h2>
      { HandleType() }
      <button onClick={() => { HandleSearch() }}> Pesquisar </button>
    </div>
  )
}

export default Filter