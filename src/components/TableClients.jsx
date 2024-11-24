import React from 'react'

import "./css/TableClients.css"

const TableClients = ({ client }) => {
  return (
    <tbody>
        <tr>
            <td>{client.name}</td>
            <td>{client.number}</td>
            <td>{client.date_of_birth}</td>
            <td>{client.email}</td>
            <td> <span className={ client.activate ? 'active' : 'inactive' } > {client.activate ? 'Ativo' : 'Desativado'} </span> </td>
        </tr>
    </tbody>
  )
}

export default TableClients