import { useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import axios from "axios"
import "./Login.css"

const Login = () => {

    const navigation = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const submit = (e) => {
        e.preventDefault();

        console.log("https://reqres.in/api/login", user);

        console.log("user data:", JSON.stringify(user));

        axios
        .post(`https://reqres.in/api/login`, user,
            {
                headers: {
                    "x-api-key": "reqres-free-v1"
                }
            }
        )
        
        .then((response) => {
            console.log("Login success:", response.data);
            localStorage.setItem("tokenMarket", response.data.token);
            navigation("/")
        })

        .catch((error) => {
            console.error("Login failed:", error.response?.data || error.message)
        });
    }

    if (localStorage.getItem("tokenMarket")) return <Navigate to="/" />

    return (
        <div className="login-container">
            <h1>Iniciar sesión</h1>
            <form onSubmit={submit}>
                <div className="field">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input required
                    type="email"
                    name="email"
                    value={user.email} 
                    onChange={(e) => {
                        setUser({
                            ...user,
                            email: e.target.value
                        })
                    }}
                />
                </div>
                <div className="field">
                    <label htmlFor="password">Contraseña</label>
                    <input required 
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={(e) => {
                        setUser({
                            ...user,
                            password: e.target.value
                        })
                    }}
                />
                </div>
                <div className="submit">
                    <input type="submit" value="Ingresar" />
                </div>
            </form>
        </div>
            
    )
}

export default Login
