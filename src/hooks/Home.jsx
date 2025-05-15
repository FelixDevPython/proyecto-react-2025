import { Link } from "react-router-dom"
import "./Home.css"

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="title">Bienvenido a Market Coins</h1>
      <p className="subtitle">Cónoce las 100 criptos más usadas en la actualidad</p>
      <Link to="/criptomonedas" className="link">Ver listado de criptomonedas</Link>
    </div>
  )
}

export default Home