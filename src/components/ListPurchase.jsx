import { useState } from "react";
import "./ListPurchase.css"

const ListPurchase = () => {

    const [items] = useState([
        {
          id: 1,
          nome: "Produto 1",
          preco: 10.99,
          detalhes: [{
            item: "Detalhe A",
            item2: "Detalhe B",
            item3: "Detalhe C",
          }],
          endereco: "Rua A, 123",
        },
        {
          id: 1,
          nome: "Produto 1",
          preco: 10.99,
          detalhes: [{
            item: "Detalhe A",
            item2: "Detalhe B",
            item3: "Detalhe C",
          }],
          endereco: "Rua A, 123",
        }
      ]);

  return (
    <div className="container-list">
        {items.map((item, i) => (
            <div className="list">
                <div> Nome: {item.nome} </div>
                <div> Preço: {item.preco} </div>
                <div> Detalhes: {
                    item.detalhes.map((detalhe, j) => (
                       <>
                            <br />
                            {detalhe.item} <br />
                            {detalhe.item2} <br />
                            {detalhe.item3} <br />
                       </>
                    ))
                }
                </div>
                <div> Endereço: {item.endereco} </div>
            </div>
        ))}
    </div>
  )
}

export default ListPurchase