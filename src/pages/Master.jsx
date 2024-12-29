
// Css
import "../pages/css/Master.css"

// Components
import Navbar from "../components/Navbar"

// Hooks
import { useEffect, useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Home from "./Home";
import Lists from "./Lists";

//Url
const url = process.env.REACT_APP_API_URL

const Master = () => {

  //Token
  const token = sessionStorage.getItem('x-t')

  // Uuid
  const uuid = sessionStorage.getItem('uuid')

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true)
  const [operator, setOperator] = useState([])

  const [pageHome, setPageHome] = useState(true)
  const [pageClients, setPageClients] = useState(false)
  const [pageLists, setPageLists] = useState(false)
  const [pageGraph, setPageGraph] = useState(false)
  const [pageOptions, setPageOptions] = useState(false)

  // Validando token
  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = await fetch(url + '/api/auth/valid', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });

        const data = await response.json();

        // Token expirado
        if(!data.success){
          Swal.fire({
            title: 'Token expirado!',
            text: 'Necessário fazer login novamente',
            timer: 2000,
            width: 400,
            timerProgressBar: true,
            showConfirmButton: false
          });
          navigate("/")
          return
        }

      } catch (error) {
        console.error('Erro ao validar token:', error);
      }
    };
  
    fetchData();

  }, [token, navigate]);

  // Puxando informações do operador
  useEffect(() => {
  
    const fetchData = async () => {
      try {
  
        const response = await fetch(url + '/api/operators/get/' + uuid, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });
  
        const data = await response.json();
        setOperator(data.operator)
  
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    
    fetchData();
  
  }, [token, uuid]);

  // Função para alternar o estado da navbar
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="master">
        
        <div className="open" onClick={toggleNavbar}>

          {isOpen ? <AiOutlineMenuFold className="icon" size={35} /> : <AiOutlineMenuUnfold className="icon" size={35}/>} 
          
          {isOpen ? 'Fechar Menu' : 'Abrir Menu'}

        </div>

        <div className="master-container">

          {isOpen ? <Navbar setPageHome={setPageHome} setPageClients={setPageClients} setPageLists={setPageLists} setPageGraph={setPageGraph} setPageOptions={setPageOptions} operatorName={operator.name} /> : ''}

            <div className="home">

                { pageHome ? <Home /> : "" }

                { pageClients ? "CLIENTS" : "" }

                { pageLists ? <Lists /> : "" }

                { pageGraph ? "GRAPH" : "" }

                { pageOptions ? "OPTIONS" : "" }

            </div>
        </div>
    </div>
  )
}

export default Master