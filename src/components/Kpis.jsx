
// Css
import "./css/Kpis.css"

// Tools
import { useState } from "react"

const Kpis = ({ lists }) => {

    const months = [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ]
    const datas = { 'janeiro': 0, 'fevereiro': 0, 'março': 0, 'abril': 0, 'maio': 0, 'junho': 0, 'julho': 0, 'agosto': 0, 'setembro': 0, 'outubro': 0, 'novembro': 0, 'dezembro': 0 }

    lists.map((list) => {
        const date = new Date(list.created_at);
        const monthName = date.toLocaleString("pt-BR", { month: "long" });
        datas[monthName] += 1
      });

    return (
        <div className="kpis">
            <div className="kpis-container">

                <label htmlFor="orders"> Pedidos por Mês: </label>

                <div className="orders" id="orders">
                    {
                        months.map((month) => ( 
                            <div className="kpis-card" id="month"> { month.toUpperCase() } <p> { datas[month] } </p> </div> 
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default Kpis