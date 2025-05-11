import { Link } from "react-router-dom"
import "./Cripto.css"

const Cripto = ({ id: id, name: cryptoName, current_price: current_price, symbol:symbol, price_change_percentage_24h: price_change_percentage_24h }) => {
return (
        <div className="cripto">
            <h3>{cryptoName}</h3>
            <div className="info">
                <p><span className="label">Precio: </span>${parseFloat(current_price).toFixed(4)}</p>
                <p><span className="label">Código: </span>{ symbol }</p>
                <p>
                    <span className="label">Variación 24hrs: </span>
                    <span className={parseFloat(price_change_percentage_24h) > 0 ? "positivo" : "negativo"}>
                        { parseFloat(price_change_percentage_24h).toFixed(3) }%
                    </span>
                </p>
                <Link to={`/criptomonedas/${id}`}>Ver detalles</Link>
            </div>
        </div>
    )
}

export default Cripto