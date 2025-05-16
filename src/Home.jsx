import { Link } from "react-router-dom"
import "./Home.css"

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="title">Hola, bienvenido a CriptoMarket</h1>
            <p className="subtitle">Debes conocer las 100 criptos mas usadas en el mercado</p>
            <Link to="/criptomonedas" className="link">Ver criptomonedas</Link>
        </div>
    )
}

export default Home