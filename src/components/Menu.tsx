import { Link } from "react-router-dom";

export const Menu = () => {
    return(
        <aside className="sidebar">
            <div className="brand">
                <div className="logo"></div>
                <h1>Літакобудівне підприємство</h1>
            </div>
            <nav className="nav">
                <ul>
                    <li className="active"><Link to="/">Дашборд</Link></li>
                    <li><Link to="/suppliers">Постачальники</Link></li>
                    <li><Link to="/clients">Клієнти</Link></li>
                    <li><Link to="/planes">Моделі літаків</Link></li>
                    <li><Link to="/employees">Співробітники</Link></li>
                    <li><Link to="/orders">Замовлення</Link></li>
                    <li><Link to="/sections">Цехи</Link></li>
                </ul>
                

            </nav>
        </aside>
    );
};