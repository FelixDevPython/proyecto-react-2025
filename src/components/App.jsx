import { Navigate, Outlet } from "react-router-dom"
import Menu from "./menu/Menu"
import "./App.css"

const App = () => {

    if (!localStorage.getItem("tokenMarket")) return <Navigate to="/login" />

    return (
        <>
            <Menu />
            <Outlet />
        </>
    )
}

export default App