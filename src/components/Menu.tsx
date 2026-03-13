import { Link, useLocation } from "react-router-dom";
import './Menu.css';

export const Menu = () => {
    const location = useLocation();

    return(
        <aside className="sidebar">
            <div className="brand">
                <div className="logo"></div>
                <h1>Aircraft Manufacturing Enterprise</h1>
            </div>
            <nav className="nav">
                <ul>
                    <li className={location.pathname === "/" ? "active" : ""}>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li className={location.pathname === "/suppliers" ? "active" : ""}>
                        <Link to="/suppliers">Suppliers</Link>
                    </li>
                    <li className={location.pathname === "/clients" ? "active" : ""}>
                        <Link to="/clients">Clients</Link>
                    </li>
                    <li className={location.pathname === "/planes" ? "active" : ""}>
                        <Link to="/planes">Aircraft models</Link>
                    </li>
                    <li className={location.pathname === "/employees" ? "active" : ""}>
                        <Link to="/employees">Employees</Link>
                    </li>
                    <li className={location.pathname === "/orders" ? "active" : ""}>
                        <Link to="/orders">Orders</Link>
                    </li>
                    <li className={location.pathname === "/sections" ? "active" : ""}>
                        <Link to="/sections">Sections</Link>
                    </li>
                    <li className={location.pathname === "/products" ? "active" : ""}>
                        <Link to="/products">Products</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};


