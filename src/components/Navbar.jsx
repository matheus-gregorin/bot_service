import { Link } from "react-router-dom"
import "./Navbar.css" 

const Navbar = () => {
  return (
    <div className="nav">
        <ul className="lists-ul">
            <Link to="/"> Home </Link>
            <Link to="/List"> Lista de pedidos </Link>
            <Link to="/"> Gráficos </Link>
            <Link to="/"> Produtos </Link>
            <Link to="/"> Configurações </Link>
        </ul>
    </div>
  )
}

export default Navbar