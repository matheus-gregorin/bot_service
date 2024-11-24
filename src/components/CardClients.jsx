import React from 'react'

import "./css/CardClients.css"
import { AiOutlineUser } from 'react-icons/ai'

const CardClients = ({ client }) => {
  return (
    <div className='card-client'>

        <div className='name-client'> <AiOutlineUser size={20}/> { client.name } </div>

        <hr />

        <div className='email'> Email: { client.email } </div>
        <div className='number'> Numero: { client.number } </div>
        <div className='created'> Data de criação: { client.created_at } </div>
        <div className='address'> Rua: { client.address.street }, { client.address.number }, { client.address.neighborhood } -  { client.address.neighborhood } </div>



    </div>
  )
}

export default CardClients