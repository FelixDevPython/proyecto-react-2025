import { useEffect, useState } from "react";
import axios from "axios"
import "./App.css"
import Crypto from "./cripto/Cripto.jsx"

function App() {

  const API_URL = import.meta.env.VITE_API_URL

  const [criptos, setCriptos] = useState();

  useEffect(() => {
    axios.get(`${API_URL}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`)
      .then((data) => {
        setCriptos(data.data);
        // console.log(data)
      })
      .catch(() => {
        console.error("La petición falló");
      });
  }, []);

  if (!criptos) return <span>Cargando...</span>

  return (
    <div className="app-container">
      <h1>Lista de criptomonedas</h1>
      <div className="cripto-container">
        {criptos.map(({ id, name: cryptoName, current_price: current_price, symbol: symbol, price_change_percentage_24h: price_change_percentage_24h }) => (
          <Crypto key={id} 
          name={cryptoName} 
          current_price={current_price} 
          symbol={symbol} 
          price_change_percentage_24h={price_change_percentage_24h} />
        ))}
      </div>
    </div>
  );
}

export default App;
