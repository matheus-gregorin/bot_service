import "./css/Navbar.css"

// Tools
import Swal from 'sweetalert2';
import { useEffect, useRef, useState } from "react";
import ApiService from "../useCases/fetchUseCase";
import { AiOutlineFundProjectionScreen, AiOutlineHome, AiOutlineLogout, AiOutlineOrderedList, AiOutlineProfile, AiOutlineSetting } from "react-icons/ai";

//Url
const url = process.env.REACT_APP_API_URL
const uuid = sessionStorage.getItem('uuid')
const token = sessionStorage.getItem('x-t')

const Navbar = ({                       
  setPageHome,
  setPageClients,
  setPageLists,
  setPageGraph,
  setPageOptions
}) => {

  const photo = useRef(null);
  const [operator, setOperator] = useState([])

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

  console.log("OPERATOR", operator)

  const Nav = ( page ) => {

    Swal.fire({
      title: 'Carregando...',
      text: '',
      timer: 2200,
      width: 250,
      timerProgressBar: true,
      showConfirmButton: false
    });

    switch (page) {
      case 'home':
        setPageHome(true);
        setPageClients(false);
        setPageLists(false);
        setPageGraph(false);
        setPageOptions(false);
        break;
      case 'clients':
        setPageHome(false);
        setPageClients(true);
        setPageLists(false);
        setPageGraph(false);
        setPageOptions(false);
        break;
      case 'lists':
        setPageHome(false);
        setPageClients(false);
        setPageLists(true);
        setPageGraph(false);
        setPageOptions(false);
        break;
      case 'graph':
        setPageHome(false);
        setPageClients(false);
        setPageLists(false);
        setPageGraph(true);
        setPageOptions(false);
        break;
      case 'options':
        setPageHome(false);
        setPageClients(false);
        setPageLists(false);
        setPageGraph(false);
        setPageOptions(true);
        break;
      default:
        setPageHome(true);
        setPageClients(false);
        setPageLists(false);
        setPageGraph(false);
        setPageOptions(false);;
    }

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
  const on = () => {
    if (photo.current) {
      photo.current.style.display = 'flex';
    }
  };

  // Função que será chamada quando o mouse sair da primeira div
  const off = () => {
    if (photo.current) {
      photo.current.style.display = 'none';
    }
  }

  return (
    <div className='nav-container'>

    <div className="img" onMouseEnter={on} onMouseLeave={off}>
      <div ref={photo} className="foto"> Alterar foto </div>
    </div>

    <p> 
      Bem - Vindo 
    </p>

    <p> Status: ONLINE </p>

    <hr />

      <nav>
        <ul>
          <li onClick={() => Nav("home") }> <AiOutlineHome size={20} style={{ margin: '0 4px 4px 0' }} /> Home </li>
          <li onClick={() => Nav("clients") }> <AiOutlineProfile size={20} style={{ margin: '0 4px 4px 0' }} /> Clientes </li>
          <li onClick={() => Nav("lists") }> <AiOutlineOrderedList size={20} style={{ margin: '0 4px 4px 0' }} /> Listas </li>
          <li onClick={() => Nav("graph") }> <AiOutlineFundProjectionScreen size={20} style={{ margin: '0 4px 4px 0' }} /> Graficos </li>
          <li onClick={() => Nav("options") }> <AiOutlineSetting size={20} style={{ margin: '0 4px 4px 0' }} /> Ajustes </li>
          <li onClick={() => HandleLogout() }>  <AiOutlineLogout size={20} style={{ margin: '0 4px 4px 0' }} /> Sair </li>
        </ul>
      </nav>

    </div>
  )
}

export default Navbar