import "../pages/css/Home.css"

import Navbar from "../components/Navbar"

import { useEffect, useState } from "react";
import CardClients from "../components/CardClients";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

//Url
const url = process.env.REACT_APP_API_URL
const token = sessionStorage.getItem('x-t')

const Home = () => {

  const [isOpen, setIsOpen] = useState(true);

  // Função para alternar o estado da navbar
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const [clients, setClients] = useState([])
  const [items, setItems] = useState([])

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

  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = await fetch(url + '/api/items/all?paginator=10&order_by=desc', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });

        const data = await response.json();

        setItems(data.items)

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
  
    fetchData();

  }, []);

  return (
    <div className="master">
      
      <div className="open" onClick={toggleNavbar}>

        {
          isOpen ? <AiOutlineMenuFold className="icon" size={35} /> : <AiOutlineMenuUnfold className="icon" size={35}/>
        } 
        
        {isOpen ? 'Fechar Menu' : 'Abrir Menu'} </div>

      <div className="home-container">

        {
          isOpen ? <Navbar /> : ''
        }

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

          <div className="label-container-footer"> Últimos 10 itens adicionados: </div>
          <div className="section-footer">

            {items.map((item) => (
              <Footer key={item.uuid} item={item} />
            ))}

          </div>

        </div>
      </div>
    </div>
  )
}

export default Home