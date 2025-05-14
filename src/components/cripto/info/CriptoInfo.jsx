import { useParams } from "react-router-dom";
import "../CriptoPage.css";
import { parseFloatNumber } from "../../../helpers/number";
import usePetition from "../../../hooks/usePetition";

const CriptoInfo = () => {
    const { id } = useParams();

    const {
        data: cripto,
        loading: loadingCripto,
        error: errorCripto,
    } = usePetition(`coins/${id}`);

    const {
        data: historial,
        loading: loadingHistorial,
        error: errorHistorial,
    } = usePetition(`coins/${id}/market_chart?vs_currency=usd&days=30`);

    return (
        <div className="cripto-page-container">
            {loadingCripto && <p>Cargando información de la criptomoneda...</p>}
            {errorCripto && <p>Error al cargar los datos de la criptomoneda.</p>}

            {!loadingCripto && cripto && (
                <div className="cripto-info">
                    <div className="cripto-main-info">
                        <span>Ranking: {cripto.market_cap_rank}</span>
                        <h1>{cripto.name}</h1>
                        <span className="cripto-symbol">{cripto.symbol?.toUpperCase()}</span>
                    </div>
                    <div className="cripto-details">
                        <ul>
                            <li className="cripto-detail">
                                <span className="cripto-label">Precio:</span> ${parseFloatNumber(cripto.market_data?.current_price?.usd, 3)}
                            </li>
                            <li className="cripto-detail">
                                <span className="cripto-label">MaxSupply:</span> {parseFloatNumber(cripto.market_data?.max_supply, 3)}
                            </li>
                            <li className="cripto-detail">
                                <span className="cripto-label">Market Cap:</span> ${parseFloatNumber(cripto.market_data?.market_cap?.usd, 3)}
                            </li>
                            <li className="cripto-detail">
                                <span className="cripto-label">Volumen 24h:</span> ${parseFloatNumber(cripto.market_data?.total_volume?.usd, 3)}
                            </li>
                            <li className="cripto-detail">
                                <span className="cripto-label">Cambio 24h:</span> {parseFloatNumber(cripto.market_data?.price_change_percentage_24h, 2)}%
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            <div className="cripto-history">
                <h2>Historial de precios (últimos 30 días)</h2>
                {loadingHistorial && <p>Cargando historial...</p>}
                {errorHistorial && <p>Error al cargar el historial.</p>}

                {!loadingHistorial && historial?.prices && (
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Precio (USD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historial.prices.map(([timestamp, price], index) => {
                                const fecha = new Date(timestamp).toLocaleDateString();
                                return (
                                    <tr key={index}>
                                        <td>{fecha}</td>
                                        <td className="price">${parseFloatNumber(price, 2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default CriptoInfo;
