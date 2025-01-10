
// Css
import { useEffect, useState } from "react"
import "./css/Kpis.css"

// Tools

//Url
const url = process.env.REACT_APP_API_URL

const Kpis = () => {

    //Token
    const token = sessionStorage.getItem('x-t')

    const [lists, setLists] = useState([])
    
    // Função que puxa todos as listas
    useEffect(() => {
    
        const fetchData = async () => {
            try {
    
                const response = await fetch(url + '/api/list/all?order_by=desc', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
                });
    
                const data = await response.json();
                setLists(data.lists)
    
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
            
        fetchData();
    
    }, [token, setLists]);

    const months = [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ]
    const datas = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]

    lists.map((list) => {

        const currentYear = new Date().getFullYear().toString();

        const date = new Date(list.created_at);
        const year = date.toLocaleString("pt-BR", { year: "numeric" });
        const month = date.getMonth();

        if(year === currentYear){
            datas[month] += 1
        }
        return true
    });

    const HandleColor = ( value ) => {
        if(value >= 5){
            return "blues"
        } else if ( value < 5 && value >= 2){
            return "yellow"
        } else {
            return "red"
        }
    }

    return (
        <div className="kpis">
            <label htmlFor="orders"> Pedidos por Mês: </label>
            <div className="kpis-container">
                <div className="orders" id="orders">
                    {
                        months.map((month, i) => ( 
                            <div className={"kpis-card-" + HandleColor(datas[i])} id="month" key={i}>  
                                <div className="options"> 
                                    { month.toUpperCase() }
                                    <select className="option"> 
                                        <option value=""> ... </option>
                                        <option value=""> ABC </option>
                                    </select>
                                </div> 
                                <p> { datas[i] } </p> 
                            </div> 
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default Kpis