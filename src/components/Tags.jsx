// Css
import "./css/Tags.css"

// Tools
import { useEffect, useState } from "react"

//Url
const url = process.env.REACT_APP_API_URL

const Tags = () => {

        const months = [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ]

        //Token
        const token = sessionStorage.getItem('x-t')

        const [listPerMonth, setListPerMonth] = useState([])
        const [valuesPerMonth, setValuesPerMonth] = useState([])
    
        // Função que puxa todos as ultimas 10 listas
        useEffect(() => {
    
            const fetchData = async () => {
                try {
    
                    const response = await fetch(url + '/api/list/graph/all?order_by=desc', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                    });
    
                    const data = await response.json();
                    setListPerMonth(data.graph.list_per_months)
                    setValuesPerMonth(data.graph.values_per_month)
    
                } catch (error) {
                    console.error('Erro ao buscar dados:', error);
                }
            };
            
            fetchData();
    
        }, [token]);

  return (
    <div>
        {
            months.map((month, i) => (
                <div>
                    {month}
                    <br />
                    {valuesPerMonth[i]}
                </div>
            ))
        }
    </div>
  )
}

export default Tags