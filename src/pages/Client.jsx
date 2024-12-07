import "../pages/css/Home.css"
import "../pages/css/Client.css"

import React, { useEffect, useState } from 'react'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import TableClients from "../components/TableClients";
import Swal from "sweetalert2";
import InfoClient from "../components/InfoClient";

//Url
const url = process.env.REACT_APP_API_URL
const token = sessionStorage.getItem('x-t')

const Client = () => {

  const [clients, setClients] = useState([]);
  const [client, setClient] = useState([]);
  const [paginator] = useState(10);
  const [total, setTotal] = useState(10);
  const [isOpen, setIsOpen] = useState(true);
  const [isPopUp, setPopUp] = useState(false);
  const [orderBy, setOrderBy] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = await fetch(url + '/api/clients/all?paginator=' + paginator, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });

        const data = await response.json();

        setClients(data.clients)
        setTotal(data.total)

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
  
    fetchData();

  }, [paginator]);

  const paginate = async (indexPaginator) => {
    try {

      Swal.fire({
        title: 'Carregando...',
        text: '',
        timer: 1000,
        width: 250,
        timerProgressBar: true,
        showConfirmButton: false
      });

      var endpoint = '/api/clients/all?paginator=' + indexPaginator

      if(orderBy !== null && orderBy){
          endpoint += "&order_by=desc"
      }

      const response = await fetch(url + endpoint, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });

      const data = await response.json();

      setClients(data.clients)
      setTotal(data.total)

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

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
              <Filter setClients={setClients} setOrderBy={setOrderBy}/>
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
                  <TableClients key={client.uuid} client={client} isPopUp={isPopUp} setPopUp={setPopUp} setClient={setClient}/>
              ))}

              <tfoot>
                <tr>
                    <td colspan="5" className="footer-table">
                        <div class="pagination">

                        {
                          Array.from({ length: Math.ceil(total / 10) }).map((_, index) => (
                            <button key={index} onClick={() => paginate((index + 1) * 10) }> {index + 1} </button>
                          ))
                        }

                        </div>
                    </td>
                </tr>
              </tfoot>

            </table>

          </div>

        </div>

        { isPopUp ? <div className="pop-up"> <InfoClient client={client} /> </div> : '' }

      </div>
    </div>
  )
}

export default Client