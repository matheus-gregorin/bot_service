import React from 'react'

import "./css/Filter.css"

//Url
const url = process.env.REACT_APP_API_URL
const token = sessionStorage.getItem('x-t')

const Filter = ({ setClients, setOrderBy }) => {

    const HandleFilter = () => {

        var endpoint = '/api/clients/all?'

        var name = document.getElementById('name').value
        var date = document.getElementById('date_of_birth').value
        var active = document.getElementById('active').checked
        var order = document.getElementById('order_by').checked

        var firstFlter = true

        if(name !== null && name !== '' && name !== ' '){
          if(firstFlter){
            endpoint += "name=" + name
            firstFlter = false
          } else {
            endpoint += "&name=" + name
          }
        }
        if(date !== null && date !== '' && date !== ' '){
          if(firstFlter){
            endpoint += "date_of_birth=" + date
            firstFlter = false
          } else {
            endpoint += "&date_of_birth=" + date
          }
        }
        if(active !== null && active){
          if(firstFlter){
            endpoint += "activate=true"
            firstFlter = false
          } else {
            endpoint += "&activate=true"
          }
        }
        if(order !== null && order){
          setOrderBy(true)
          if(firstFlter){
            endpoint += "order_by=desc"
            firstFlter = false
          } else {
            endpoint += "&order_by=desc"
          }
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
              console.log(data, endpoint)

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
            <p> Nome: </p> <input id="name" type="text" />
        </div>

        <div className='filter-input-container'>
           <p> Data de Nascimento: </p> <input id="date_of_birth" type="text" />
        </div>

        <div className='filter-input-container'>
            <p> Ativo: </p> <input id="active" type="checkbox" />
            <p> Decrescente: </p> <input id='order_by' type="checkbox"/>
        </div> 

        <div className='filter-button-container'>
            <button onClick={HandleFilter}> Filtrar </button>
        </div>

    </div>
  )
}

export default Filter