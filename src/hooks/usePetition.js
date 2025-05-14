import { useEffect, useState } from "react"
import axios from "axios"

const usePetition = (endpoint) => {
    const API_URL = import.meta.env.VITE_API_URL

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await axios.get(`${API_URL}${endpoint}`)
                console.log("Cripto:", response.data)
                setData(response.data)
            } catch (error) {
                console.error("Error cargando cripto:", error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [API_URL, endpoint])

    return { data, loading, error }
}

export default usePetition
