
// Css
import "../components/css/LineChart.css"

// Tools
import React, { useEffect, useState } from "react";

//Url
const url = process.env.REACT_APP_API_URL

const LineChart = () => {

    //Token
    const token = sessionStorage.getItem('x-t')

    const [data, setData] = useState([])

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
                setData(data.graph)

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
        
        fetchData();

    }, [token]);

    return (
        <div>
            {data}
        </div>
    );
};

export default LineChart;