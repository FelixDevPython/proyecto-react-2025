import { Navigate, Outlet } from "react-router-dom"
import Menu from "./menu/Menu"
import "./App.css"

const App = () => {

    if (!localStorage.getItem("tokenMarket")) return <Navigate to="/login" />

    return (
        <div className="app-container">
            <Menu />
            <Outlet />
        </div>
    )
}

export default App