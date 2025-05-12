import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const CriptoPage = () => {

    const API_URL = import.meta.env.VITE_API_URL
    const params = useParams()

    const [cripto, setCripto] = useState({})
    const [history, setHistory] = useState({})

    // Obtener los detalles de la cripto
    useEffect(() => {
    axios.get(`${API_URL}coins/${params.id}`)
    .then(data => {
        setCripto(data.data)
    })
    .catch(e => console.error("Error cargando cripto:", e))
    }, [API_URL, params.id])

    // Obtener el historial de precios de los últimos 30 días
    useEffect(() => {
    axios.get(`${API_URL}coins/${params.id}/market_chart?vs_currency=usd&days=30&interval=daily`)
    .then(data => {
        console.log("History data:", data.data)
        setHistory(data.data)
    })
    .catch(e => console.error("Error cargando historial:", e))
    }, [API_URL, params.id])

    return (
        <>
            <h1>Soy la criptomoneda {params.id}</h1>
            {/* <p>{JSON.stringify(cripto)}</p>  */}
            <div className="info">
                <ul>
                    <li><span className="label">Nombre: </span>{cripto.name}</li>
                    <li><span className="label">Símbolo: </span>{cripto.symbol}</li>
                </ul>
            </div>
            <h2>HISTORIAL</h2>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Precio(USD)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.prices && history.prices.map(([timestamp, price], index) => {
                            const date = new Date(timestamp).toLocaleDateString()
                            return (
                                <tr key={index}>
                                    <td>{date}</td>
                                    <td>{price.toFixed(2)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default CriptoPage
