import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx'
import "./main.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Pagina404 from './components/404.jsx'
import Home from './Home.jsx'
import Cuadricula from './components/Cuadricula.jsx'
import CriptoPage from './components/cripto/CriptoPage.jsx'
import Perfil from './Perfil.jsx'
import { UserContextProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
    <UserContextProvider>
            <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Home />} />
                    <Route path='perfil' element={<Perfil />} />
                </Route>
                <Route path='/criptomonedas' element={<App />}>
                    <Route index element={<Cuadricula />} />
                    <Route path=':id' element={<CriptoPage />}/>
                </Route>
                <Route path='*' element={<Pagina404 />} />
            </Routes>
        </BrowserRouter>
    </UserContextProvider>
)
