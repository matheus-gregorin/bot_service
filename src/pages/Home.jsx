import "../pages/css/Home.css"

import Navbar from "../components/Navbar"

import { useEffect, useState } from "react";
import CardClients from "../components/CardClients";
import Banner from "../components/Banner";

//Url
const url = process.env.REACT_APP_API_URL || 'https://bottdevapi.sytes.net'
const token = sessionStorage.getItem('x-t')

const Home = () => {

  const [clients, setClients] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = await fetch(url + '/api/clients/all?order_by=desc&paginator=10', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });

        const data = await response.json();

        setClients(data.clients)

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
  
    fetchData();

  }, []);

  return (
    <div className="home-container">
      <Navbar />

      <div className="home">

        <div className="section-header">
            <Banner />
        </div>

        <div className="label-container"> Últimos 10 clientes adicionados: </div>
        <div className="section-body">

          {clients.map((client) => (
          <CardClients key={client.uuid} client={client} />
          ))}

        </div>

        <div className="section-footer">

            <p>Footer</p>

        </div>

      </div>
    </div>
  )
}

export default Home