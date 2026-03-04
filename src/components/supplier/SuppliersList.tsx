import { useEffect, useState } from "react";
import { Supplier } from "./Supplier";
import axios from "axios";

export const SuppliersList = () => {
   const [suppliers, setSuppliers] = useState([]);

   const fetchSupplier = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/suppliers`);
          setSuppliers(response.data);
          
        } catch (err) {
          
          console.error(err);
        }
      };
      fetchSupplier();

    return (
        <main className="main">
        <header className="header">
            <div className="search">
                <input type="text" id="searchInput"  className="input" placeholder="Пошук користувача..."/>
                <button className="btn">Пошук</button>
            </div>
            <span className="badge">UA</span>
        </header>

        <section className="content">
            <div style= {{display:"flex",justifyContent: "space-between", alignItems:"center"}} >
                <h2>Список користувачів</h2>
                <a className="btn" href="@{/users/create}"
                   style= {{padding:"8px 16px", background:"#4CAF50", color:"white", textDecoration: "none", borderRadius:"5px"}} >
                    ➕ Додати користувача
                </a>
            </div>

            <table id="usersTable" className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Ім’я </th>
                    <th>Номер телефону</th>
                    <th>Email</th>
                    <th>Деталі</th>
                </tr>
                </thead>
                <tbody>
                
                {suppliers.map(i => (<Supplier id={i.id} name={i.name} phone_number={i.phone_number} email={i.email} details={i.details}/>))}


                </tbody>
            </table>
        </section>
    </main>
    )
}; 