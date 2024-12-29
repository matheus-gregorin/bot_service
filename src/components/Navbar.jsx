// Css
import "./css/Navbar.css"

// Tools
import Swal from 'sweetalert2';
import { useRef } from "react";
import ApiService from "../useCases/fetchUseCase";
import { AiOutlineFundProjectionScreen, AiOutlineHome, AiOutlineLogout, AiOutlineOrderedList, AiOutlineProfile, AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

//Url
const url = process.env.REACT_APP_API_URL

const Navbar = ({ setPageHome, setPageClients, setPageLists, setPageGraph, setPageOptions, operatorName }) => {

  const photo = useRef(null);

  const navigate = useNavigate();

  const Nav = ( page ) => {

    Swal.fire({
      title: 'Carregando...',
      text: '',
      html: '<img src="/loading.gif" alt="Loading" style="width: 50px; height: 50px;">',
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

    // Uuid
    const uuid = sessionStorage.getItem('uuid')

    const api = new ApiService(url)
    api.post('/api/auth/logout/' + uuid)
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

      Swal.fire({
        title: 'Carregando...',
        html: '<img src="/loading.gif" alt="Loading" style="width: 50px; height: 50px;">',
        text: '',
        timer: 2000,
        width: 250,
        timerProgressBar: true,
        showConfirmButton: false
      });
      
      setTimeout(() => {
        
        navigate('/')

      }, 200);

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
      {operatorName ? operatorName : ""}
    </p>

    <p> 
      ONLINE
    </p>

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