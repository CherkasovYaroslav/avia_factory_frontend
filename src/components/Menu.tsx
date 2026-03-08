import { Link } from "react-router-dom";
import "./Menu.css";

export const Menu = () => {
    return(
        <aside className="sidebar">
            <div className="brand">
                <div className="logo"></div>
                <h1>Aircraft Manufacturing Enterprise</h1>
            </div>
            <nav className="nav">
                <ul>
                    <li className="active"><Link to="/">Dashboard</Link></li>
                    <li><Link to="/suppliers">Suppliers</Link></li>
                    <li><Link to="/clients">Clients</Link></li>
                    <li><Link to="/planes">Aircraft models</Link></li>
                    <li><Link to="/employees">Employees</Link></li>
                    <li><Link to="/orders">Orders</Link></li>
                    <li><Link to="/sections">Sections</Link></li>
                </ul>
                

            </nav>
        </aside>
    );
};