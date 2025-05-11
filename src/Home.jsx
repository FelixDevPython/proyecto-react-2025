import { Link } from "react-router-dom"

const Home = () => {
    return (
        <>
            <h1>Hola, bienvenido a CriptoMarket</h1>
            <p>Debes conocer las 100 criptos mas usadas en el mercado</p>
            <Link to="/criptomonedas">Ver criptomonedas</Link>
        </>
    )
}

export default Home