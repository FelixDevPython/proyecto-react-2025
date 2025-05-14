const parseFloatNumber = (number, decimals) => {
    const parsed = parseFloat(number);
    if (isNaN(parsed)) return "-";
    return parsed.toFixed(decimals);
};

const CriptoHistory = ({ history, loadingHistory, errorHistory }) => {
    return (
        <div className="cripto-history">
            <h2>Historial de Precios (30 días)</h2>

            {loadingHistory && <p>Cargando historial...</p>}
            {errorHistory && <p>Error al cargar el historial de precios.</p>}

            {!loadingHistory && Array.isArray(history) && history.length > 0 && (
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
                                <td className="cripto-label">{new Date(timestamp).toLocaleDateString()}</td>
                                <td className="cripto-price">{parseFloatNumber(price, 3)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CriptoHistory;

