import {Link} from "react-router-dom";
import Logout from "@/components/logout";
import AuthContext from "@/components/authContext";
import {useContext} from "react";

export default function NavBar() {
    const { isAuthenticated } = useContext(AuthContext)

    return (
        isAuthenticated ?
        <nav className="nav navbar navbar-expand navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="navbar-nav mr-auto">
                    <Link to="/" className="navbar-brand px-3">
                        <span className="navbar-text">React CRUD</span>
                    </Link>
                    <li className="nav-item">
                        <Link to={"/registrar"} className="nav-link">
                            Registrar
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/listar"} className="nav-link">
                            Listar
                        </Link>
                    </li>
                </div>
                <div className="navbar-nav ml-auto px-3">
                    <li className="nav-item">
                        <Logout/>
                    </li>
                </div>
            </div>
        </nav> : null
    )
}