import React from 'react'
import "./css/Footer.css"
import { AiOutlineDollar } from 'react-icons/ai'

const Footer = ({ item }) => {
  return (
    <div className='card-items'>

        <div className='prom'> <div className='flag-prom'> <AiOutlineDollar size={20} /> </div> <div className='name'> { item.name_item } </div> </div>

        <hr />

        <div className='quantidade'> Quantidade: { item.qtd_item } </div>
        <div className='valor'> Valor: R$ { item.value.toFixed(2) } </div>
        <div className='updated'> Útima alteração: { item.updated_at } </div>


    </div>
  )
}

export default Footer