import { Link } from "react-router-dom"
import "./Navbar.css" 

const Navbar = () => {

  const name = "Matheus Gregorin"

  return (
    <div className="nav">

      <div className="picture"></div>

      <div className="name-user"> { name } </div>

      <div className="list-master-ul">
          <ul className="lists-ul">
              <Link to="/"> Home </Link>
              <Link to="/List"> Lista de pedidos </Link>
              <Link to="/"> Gráficos </Link>
              <Link to="/"> Produtos </Link>
              <Link to="/"> Configurações </Link>
          </ul>
        </div>

      <button className="picture-out"> Sair </button>

    </div>
  )
}

export default Navbar