import { useEffect, useState } from "react";

function App() {

  const API_URL = import.meta.env.VITE_API_URL

  const [criptos, setCriptos] = useState();

  useEffect(() => {
    fetch(`${API_URL}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`)
      .then((resp) => resp.json())
      .then((data) => {
        setCriptos(data);
      })
      .catch(() => {
        console.error("La petición falló");
      });
  }, []);

  if (!criptos) return <span>Cargando...</span>

  return (
    <>
      <h1>Lista de criptomonedas</h1>
      <ol>
        {criptos.map(({ id, name, current_price }) => (
          <li key={id}>
            Nombre: {name} - Precio: ${current_price}
          </li>
        ))}
      </ol>
    </>
  );
}

export default App;
