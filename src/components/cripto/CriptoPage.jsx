import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const CriptoPage = () => {

    const API_URL = import.meta.env.VITE_API_URL
    const params = useParams()

    const [cripto, setCripto] = useState({})

    useEffect(() => {
    axios.get(`${API_URL}coins/${params.id}`)
    .then(data => {
        setCripto(data.data)
    })
    .catch(e => console.error(e))
    }, [API_URL, params.id])

    return (
        <>
            <h1>Soy la criptomoneda {params.id}</h1>
            {/* <p>{JSON.stringify(cripto)}</p>  */}
            <div className="info">
                <ul>
                    <li><span className="label">Nombre: </span>{cripto.name}</li>
                </ul>
            </div>
        </>
    )
}

export default CriptoPage
