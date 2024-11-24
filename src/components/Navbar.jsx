import "./css/Navbar.css"

// Tools
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import ApiService from "../useCases/fetchUseCase";
import { AiOutlineFundProjectionScreen, AiOutlineHome, AiOutlineLogout, AiOutlineOrderedList, AiOutlineProfile, AiOutlineSetting } from "react-icons/ai";

//Url
const url = process.env.REACT_APP_API_URL || 'https://bottdevapi.sytes.net'
const uuid = sessionStorage.getItem('uuid')
const token = sessionStorage.getItem('x-t')

const Navbar = () => {

  const divRef = useRef(null);
  const navContainer = useRef(null);

  const [operator, setOperator] = useState([{ name: "..." }])

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

  }, []);

  const navigate = useNavigate();
  const Nav = ( page ) => {

    Swal.fire({
      title: 'Carregando...',
      text: '',
      timer: 1000,
      width: 250,
      timerProgressBar: true,
      showConfirmButton: false
    });

    setTimeout(() => {
      navigate(page)
    }, 1300);

  }

  const HandleLogout = () => {

    const api = new ApiService(url)
    api.post('/api/auth/logout')
    .then(response => {

    // Failed
    if(!response.success){
      Swal.fire({
        title: 'Erro!',
        text: response.message,
        icon: 'error',
        confirmButtonText: 'Fechar'
      });
      return
    }

    // Success
    sessionStorage.setItem('x-t', '');
    sessionStorage.setItem('x-t-e', '');
    sessionStorage.setItem('uuid', '');
    
    // Indo para pagina Home
    setTimeout(() => {
      Nav('/')
    }, 100);

    })

  }

  // Função que será chamada quando o mouse passar sobre a primeira div
  const mostrarOutraDiv = () => {
    if (divRef.current) {
      divRef.current.style.display = 'flex';
    }
  };

  // Função que será chamada quando o mouse sair da primeira div
  const esconderOutraDiv = () => {
    if (divRef.current) {
      divRef.current.style.display = 'none';
    }
  }

  return (
    <div ref={navContainer} className='nav-container'>

    <div className="img"
        onMouseEnter={mostrarOutraDiv}
        onMouseLeave={esconderOutraDiv}
    >
      <div ref={divRef} className="foto"> Alterar foto </div>
    </div>

    <p> 
      { 
        operator === null ? '' : operator.name
      } 
    </p>

    <p> Status: { operator.status } </p>

    <hr />

      <nav>
        <ul>
          <li onClick={() => Nav("/home") }> <AiOutlineHome size={20} style={{ margin: '0 4px 4px 0' }} /> Home </li>
          <li onClick={() => Nav("/clients") }> <AiOutlineProfile size={20} style={{ margin: '0 4px 4px 0' }} /> Clientes </li>
          <li onClick={() => Nav("/home") }> <AiOutlineOrderedList size={20} style={{ margin: '0 4px 4px 0' }} /> Listas </li>
          <li onClick={() => Nav("/home") }> <AiOutlineFundProjectionScreen size={20} style={{ margin: '0 4px 4px 0' }} /> Graficos </li>
          <li onClick={() => Nav("/home") }> <AiOutlineSetting size={20} style={{ margin: '0 4px 4px 0' }} /> Ajustes </li>
          <li onClick={() => HandleLogout() }>  <AiOutlineLogout size={20} style={{ margin: '0 4px 4px 0' }} /> Sair </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar