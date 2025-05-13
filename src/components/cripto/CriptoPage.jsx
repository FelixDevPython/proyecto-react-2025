import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { parseFloatNumber } from "../helpers/number"
import "./CriptoPage.css"

const CriptoPage = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const params = useParams()

    const [cripto, setCripto] = useState(null)
    const [history, setHistory] = useState([])
    const [loadingCripto, setLoadingCripto] = useState(true)
    const [loadingHistory, setLoadingHistory] = useState(true)

    // Obtener detalles de la cripto
    useEffect(() => {
        setLoadingCripto(true)
        axios.get(`${API_URL}coins/${params.id}`)
            .then(data => {
                console.log("Cripto:", data.data)
                setCripto(data.data)
            })
            .catch(e => console.error("Error cargando cripto:", e))
            .finally(() => setLoadingCripto(false))
    }, [API_URL, params.id])

    // Obtener historial de precios
    useEffect(() => {
        setLoadingHistory(true)
        axios
            .get(`${API_URL}coins/${params.id}/market_chart?vs_currency=usd&days=30&interval=daily`)
            .then(data => {
                setHistory(data.data.prices)
            })
            .catch(e => console.error("Error cargando historial:", e))
            .finally(() => setLoadingHistory(false))
    }, [API_URL, params.id])

    if (loadingCripto) {
        return <div className="cripto-page-container">Cargando información de la criptomoneda...</div>
    }

    return (
        <div className="cripto-page-container">
            <div className="info">
                <div className="main-info">
                    <span>Ranking: {cripto.market_cap_rank}</span>
                    <h1>{cripto.name}</h1>
                    <span className="symbol">{cripto.symbol.toUpperCase()}</span>
                </div>
                <div className="details">
                    <ul>
                        <li className="detail">
                            <span className="label">Precio: </span>
                            <span>{parseFloatNumber(cripto.market_data?.current_price?.usd, 3)}</span>
                        </li>
                        <li className="detail">
                            <span className="label">MaxSupply: </span>
                            <span>{parseFloatNumber(cripto.market_data?.max_supply, 3)}</span>
                        </li>
                        <li className="detail">
                            <span className="label">Market Cap (USD): </span>
                            <span>{parseFloatNumber(cripto.market_data?.market_cap?.usd, 3)}</span>
                        </li>
                        <li className="detail">
                            <span className="label">Volumen (USD - 24 Hrs.): </span>
                            <span>{parseFloatNumber(cripto.market_data?.total_volume?.usd, 3)}</span>
                        </li>
                        <li className="detail">
                            <span className="label">Cambio 24H (%): </span>
                            <span>{parseFloatNumber(cripto.market_data?.price_change_percentage_24h, 2)}%</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="history">
                <h2>Historial de Precios (30 días)</h2>
                {loadingHistory ? (
                    <p>Cargando historial...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...history].reverse().map(([timestamp, price]) => (
                                <tr key={timestamp}>
                                    <td className="label">{new Date(timestamp).toLocaleDateString()}</td>
                                    <td className="price">{parseFloatNumber(price, 3)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default CriptoPage

