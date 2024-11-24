import "../pages/css/Home.css"
import "../pages/css/Client.css"

import React, { useEffect, useState } from 'react'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import TableClients from "../components/TableClients";

//Url
const url = process.env.REACT_APP_API_URL || 'https://bottdevapi.sytes.net'
const token = sessionStorage.getItem('x-t')

const Client = () => {

  const [clients, setClients] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = await fetch(url + '/api/clients/all?paginator=10', {
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

  // Função para alternar o estado da navbar
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };


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

        <div className="Clients">

          <div className="FilterBars">
              <Filter setClients={setClients} />
          </div>

          <div className="table">

          <table>
              <thead>
                  <tr>
                      <th>Nome</th>
                      <th>Número de Celular</th>
                      <th>Data de Nascimento</th>
                      <th>E-mail</th>
                      <th>Status</th>
                  </tr>
              </thead>

              {clients.map((client) => (
                  <TableClients key={client.uuid} client={client} />
              ))}

              <tfoot>
                <tr>
                    <td colspan="5" className="footer-table">
                        <div class="pagination">
                            <button disabled>«</button>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                            <button>4</button>
                            <button>»</button>
                        </div>
                    </td>
                </tr>
              </tfoot>

            </table>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Client