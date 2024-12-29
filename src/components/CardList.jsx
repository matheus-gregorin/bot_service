// Css
import "./css/CardList.css"

// Tools
import ApiService from "../useCases/fetchUseCase"
import Swal from "sweetalert2"

//Url
const url = process.env.REACT_APP_API_URL

const CardList = ({ setLists, lists, uriSearch, paginator, setPaginator }) => {

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

            console.log(uriSearch + newPaginator)

            setLists(response.lists)
            setPaginator(newPaginator)
          });
        return

  }

  return (
    <div className="card-list">

        <table>
          <thead>
            <tr>
              <th>Uuid</th>
              <th>Status</th>
              <th>Cliente</th>
              <th>Forma de pagamento</th>
              <th>Data de agendamento</th>
            </tr>
          </thead>
          <tbody>
            {
              lists.map((list) => (
              
                <tr key={ list.uuid }>
                  <td>{ list.uuid }</td>
                  <td>{ list.status }</td>
                  <td> Clique aqui </td>
                  <td>{ list.form_purchase }</td>
                  <td>{ list.date_schedule }</td>
                </tr>

              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <button disabled={ (paginator <= 10) ? true : false } onClick={ ()=> HandleSearch( paginator - 10 ) } > Anterior </button>  
              <button disabled={ (paginator >= Object.keys(lists).length) ? true : false } onClick={ ()=> HandleSearch( paginator + 10 ) } > Próximo </button>
            </tr>
          </tfoot>
        </table>

    </div>
  )
}

export default CardList