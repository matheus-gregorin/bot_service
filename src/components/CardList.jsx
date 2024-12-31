// Css
import "./css/CardList.css"

// Tools

//Url

const CardList = ({ lists }) => {

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
        </table>

    </div>
  )
}

export default CardList