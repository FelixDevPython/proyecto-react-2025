import { useParams } from "react-router-dom"
import "./CriptoPage.css"
import usePetition from "../../hooks/usePetition"
import CriptoHistory from "./info/CriptoHistory";
import CriptoInfo from "./info/CriptoInfo";

const CriptoPage = () => {
    const { id } = useParams()

    const {
        data: cripto,
    } = usePetition(`coins/${id}`)

    usePetition(`coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`)

    return (
        <div className="cripto-page-container">
            {
                cripto && <CriptoInfo cripto={cripto} />
            }
            {
                history && <CriptoHistory history={history} /> 
            }
            
        </div>
    )
}

export default CriptoPage

