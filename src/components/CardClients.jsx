import React from 'react'

import "./css/CardClients.css"

const CardClients = ({ client }) => {
  return (
    <div className='card-client'>

        <div className='name'> Nome: { client.name } </div>
        <div className='email'> Email: { client.email } </div>
        <div className='number'> Numero: { client.number } </div>

        <br />

        <hr />

        <div className='label-address'> Endereço: </div>
        <div className='address'> Rua: { client.address.street }, { client.address.number }, { client.address.neighborhood } -  { client.address.neighborhood } </div>


    </div>
  )
}

export default CardClients