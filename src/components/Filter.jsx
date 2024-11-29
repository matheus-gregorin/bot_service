import React from 'react'

import "./css/Filter.css"

//Url
const url = process.env.REACT_APP_API_URL
const token = sessionStorage.getItem('x-t')

const Filter = ({ setClients }) => {

    const HandleFilter = () => {

        var endpoint = '/api/clients/all?paginator=10'

        var name = document.getElementById('name').value
        var date = document.getElementById('date_of_birth').value
        var active = document.getElementById('active').checked
        var order = document.getElementById('order_by').checked

        if(name !== null){
            endpoint += "&name=" + name

        }
        if(date !== null){
            endpoint += "&date_of_birth=" + date

        }
        if(active !== null && active){
            endpoint += "&active=true"

        }
        if(order !== null && order){
            endpoint += "&order_by=desc"

        }

        const fetchData = async () => {
            try {
      
              const response = await fetch(url + endpoint, {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': 'Bearer ' + token
                }
              });
      
              const data = await response.json();

              setClients(data.clients)
      
            } catch (error) {
              console.error('Erro ao buscar dados:', error);
            }
          };
        
          fetchData();
      
    }

  return (
    <div className='filter-container'>

        <div className='filter-label'> <p> Barra de pesquisa: </p> </div>

        <div className='filter-input-container'>
            Nome: <input id="name" type="text" />
        </div>

        <div className='filter-input-container'>
            Data de Nascimento: <input id="date_of_birth" type="text" />
        </div>

        <div className='filter-input-container'>
            Ativo: <input id="active" type="checkbox" />
            Order decrescente: <input id='order_by' type="checkbox"/>
        </div> 

        <div className='filter-button-container'>
            <button onClick={HandleFilter}> Filtrar </button>
        </div>

    </div>
  )
}

export default Filter