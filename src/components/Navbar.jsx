// Tools
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const Nav = ( page ) => {

    console.log(page)

    Swal.fire({
      title: 'Carregando',
      text: '...',
      timer: 1000,
      width: 300,
      timerProgressBar: true,
      showConfirmButton: false
    });

    setTimeout(() => {
      navigate(page)
    }, 1300);
  }

  return (
    <nav>
      <ul>
        <li onClick={() => Nav("/home") }> Home </li>
        <li onClick={() => Nav("/home") }> Clientes </li>
        <li onClick={() => Nav("/home") }> Listas </li>
        <li onClick={() => Nav("/home") }> Graficos </li>
        <li onClick={() => Nav("/home") }> Configurações </li>
        <li onClick={() => Nav("/") }> Sair </li>
      </ul>
    </nav>
  )
}

export default Navbar